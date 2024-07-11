import { IndexHtmlTransformContext, ViteDevServer } from "vite";
import { addHash, generateHash } from "../policy/core";
import {
  CSPPolicy,
  HashAlgorithms,
  HashCollection,
  TransformationStatus,
} from "../types";
import { handleIndexHtml } from "../handleIndexHtml";
import { PluginContext } from "rollup";
import { DEFAULT_DEV_POLICY } from "../policy/constants";
import { generatePolicyString, policyToTag } from "../policy/createPolicy";
import { cssFilter, jsFilter, tsFilter } from "../utils";

export interface TransformHandlerProps {
  code: string;
  id: string;
  algorithm: HashAlgorithms;
  CORE_COLLECTION: HashCollection;
  transformationStatus: TransformationStatus;
  server?: ViteDevServer; // This is the ViteDevServer, if this exists it means we are in dev mode
}

export const transformHandler = async ({
  code,
  id,
  algorithm,
  CORE_COLLECTION,
  transformationStatus,
  server,
}: TransformHandlerProps) => {
  if (!server) return null; // Exit early if we are not in dev mode
  const isCss = cssFilter(id);
  const isJs = jsFilter(id);
  const isTs = tsFilter(id);

  const isAllTransformed = () =>
    Array.from(transformationStatus.values()).every((value) => value === true);

  if (transformationStatus.has(id)) {
    if (isJs || isTs) {
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
    } else if (isCss) {
      const hash = generateHash(code, algorithm);
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
    } else {
      // Do nothing
    }
  } else {
    //Files that are deps of the entry points that are loaded in the load() hook

    if (isJs) {
      // Generate a hash for the code
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
    } else if (isCss) {
      const hash = generateHash(code, algorithm);
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
  canRunInDevMode: Boolean;
  isTransformationStatusEmpty: Boolean;
}

export const transformIndexHtmlHandler = async ({
  html,
  context: { server, bundle, chunk, path, filename },
  algorithm,
  policy,
  collection,
  pluginContext,
  canRunInDevMode,
  isTransformationStatusEmpty,
}: TransformIndexHtmlHandlerProps) => {
  if (isTransformationStatusEmpty && server) {
    //Return early if there are no transformations and we are in dev mode
    return;
  }

  // if (bundle) {
  //   for (const fileName of Object.keys(bundle)) {
  //     const currentFile = bundle[fileName];
  //     const isCss = cssFilter(fileName);

  //     if (currentFile) {
  //       if (currentFile.type === "chunk") {
  //         const code = currentFile.code;
  //         const hash = generateHash(code, algorithm);
  //         if (!collection["script-src"].has(hash)) {
  //           addHash({
  //             hash,
  //             key: "script-src",
  //             data: {
  //               algorithm,
  //               content: code,
  //             },
  //             collection: collection,
  //           });
  //         }
  //       }

  //       if (currentFile.type === "asset" && isCss) {
  //         const code = currentFile.source as string; // We know this is a string because of the cssFilter
  //         const hash = generateHash(code, algorithm);
  //         addHash({
  //           hash,
  //           key: "style-src",
  //           data: {
  //             algorithm,
  //             content: code,
  //           },
  //           collection: collection,
  //         });
  //       }
  //     }
  //   }
  // }

  const updatedCollection = handleIndexHtml({
    html,
    algorithm,
    collection,
    policy,
    context: pluginContext,
  });

  const finalPolicy = { ...policy };

  if (canRunInDevMode) {
    const defaultDevPolicy = DEFAULT_DEV_POLICY;

    for (const [key, defaultValues] of Object.entries(defaultDevPolicy)) {
      const currentPolicy = finalPolicy[key as keyof CSPPolicy] ?? [];
      finalPolicy[key as keyof CSPPolicy] = Array.from(
        new Set([...currentPolicy, ...defaultValues])
      );
    }
  }

  const policyString = generatePolicyString({
    collection: updatedCollection,
    policy: finalPolicy,
  });

  const InjectedHtmlTags = policyToTag(policyString);

  return {
    html,
    tags: InjectedHtmlTags,
  };
};
