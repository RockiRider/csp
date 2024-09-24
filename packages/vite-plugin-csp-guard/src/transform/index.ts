import { IndexHtmlTransformContext, ViteDevServer } from "vite";
import { addHash, generateHash } from "../policy/core";
import {
  BundleContext,
  CSPPolicy,
  HashAlgorithms,
  HashCollection,
  ShouldSkip,
  TransformationStatus,
} from "../types";
import { handleIndexHtml } from "./handleIndexHtml";
import { PluginContext } from "rollup";
import { generatePolicyString, policyToTag } from "../policy/createPolicy";
import { cssFilter, jsFilter, preCssFilter, tsFilter } from "../utils";
import { getCSS } from "../css/extraction";

export interface TransformHandlerProps {
  code: string;
  id: string;
  algorithm: HashAlgorithms;
  CORE_COLLECTION: HashCollection;
  transformationStatus: TransformationStatus;
  transformMode: "pre" | "post"; // Lets us know if we are in the pre or post transform
  server?: ViteDevServer; // This is the ViteDevServer, if this exists it means we are in dev mode
}

export const transformHandler = async ({
  code,
  id,
  algorithm,
  CORE_COLLECTION,
  transformationStatus,
  transformMode,
  server,
}: TransformHandlerProps) => {
  if (!server) return null; // Exit early if we are not in dev mode
  const isCss = cssFilter(id);
  const isPreCss = preCssFilter(id);
  const isJs = jsFilter(id);
  const isTs = tsFilter(id);

  const isAllTransformed = () =>
    Array.from(transformationStatus.values()).every((value) => value === true);

  const handleCSS = () => {
    const currentCode = transformMode === "pre" ? code : getCSS(code);

    const hash = generateHash(currentCode, algorithm);

    addHash({
      hash,
      key: "style-src-elem",
      data: {
        algorithm,
        content: code,
      },
      collection: CORE_COLLECTION,
    });
    transformationStatus.set(id, true);
  };

  const handleJS = () => {
    const hash = generateHash(code, algorithm);
    addHash({
      hash,
      key: "script-src-elem",
      data: {
        algorithm,
        content: code,
      },
      collection: CORE_COLLECTION,
    });
    transformationStatus.set(id, true);
  };

  if (transformationStatus.has(id)) {
    if (isJs || isTs) {
      handleJS();
    } else if (isCss || isPreCss) {
      handleCSS();
    } else {
      // Do nothing
    }
  } else {
    //Files that are deps of the entry points that are loaded in the load() hook

    if (isJs) {
      handleJS();
    } else if (isCss || isPreCss) {
      handleCSS();
    } else {
      // Do nothing
    }
  }

  if (isAllTransformed() && (isCss || isJs)) {
    await server.transformIndexHtml("/index.html", "", "/");
    server.ws.send({
      type: "full-reload",
    });
  }

  return null;
};

export interface TransformIndexHtmlHandlerProps {
  html: string;
  context: IndexHtmlTransformContext;
  algorithm: HashAlgorithms;
  collection: HashCollection;
  policy: CSPPolicy;
  pluginContext: PluginContext | undefined;
  isTransformationStatusEmpty: boolean;
  isHashing: boolean;
  shouldSkip: ShouldSkip;
}

export const transformIndexHtmlHandler = async ({
  html,
  context: { server, bundle, chunk, path, filename },
  algorithm,
  policy,
  collection,
  pluginContext,
  isTransformationStatusEmpty,
  isHashing,
  shouldSkip,
}: TransformIndexHtmlHandlerProps) => {
  if (isTransformationStatusEmpty && server) {
    //Return early if there are no transformations and we are in dev mode
    return;
  }

  const bundleContext = {} as BundleContext;

  if (bundle && isHashing) {
    for (const fileName of Object.keys(bundle)) {
      const currentFile = bundle[fileName];
      const isCss = cssFilter(fileName);

      if (currentFile) {
        if (currentFile.type === "chunk" && !shouldSkip["script-src-elem"]) {
          let code = currentFile.code;
          const hash = generateHash(code, algorithm);
          if (code.includes("__VITE_PRELOAD__")) {
            // For now lets just set a warning that they should turn build.hash to false, this means that they are using lazy loading.
            // We can add a feature to handle this in the future
            pluginContext?.warn(
              "Please set build.hash to false if you are using lazy loading"
            );
          }
          if (!collection["script-src-elem"].has(hash)) {
            addHash({
              hash,
              key: "script-src-elem",
              data: {
                algorithm,
                content: code,
              },
              collection: collection,
            });
            if (fileName.includes("index")) {
              bundleContext[fileName] = {
                type: "chunk",
                hash,
              };
            }
          }
        }

        if (
          currentFile.type === "asset" &&
          isCss &&
          !shouldSkip["style-src-elem"]
        ) {
          const code = currentFile.source as string; // We know this is a string because of the cssFilter
          const hash = generateHash(code, algorithm);
          addHash({
            hash,
            key: "style-src-elem",
            data: {
              algorithm,
              content: code,
            },
            collection: collection,
          });
          bundleContext[fileName] = { type: "asset", hash };
        }
      }
    }
  }

  const { html: newHtml, HASH_COLLECTION: updatedCollection } = handleIndexHtml(
    {
      html,
      algorithm,
      collection,
      policy,
      context: pluginContext,
      bundleContext: bundle ? bundleContext : undefined,
    }
  );

  const policyString = generatePolicyString({
    collection: updatedCollection,
    policy: policy,
  });

  const InjectedHtmlTags = policyToTag(policyString);

  return {
    html: newHtml,
    tags: InjectedHtmlTags,
  };
};
