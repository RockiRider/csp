import { IndexHtmlTransformContext, ViteDevServer } from "vite";
import { addHash, generateHash } from "../core";
import {
  CSPPolicy,
  HashAlgorithms,
  HashCollection,
  TransformationStatus,
} from "../types";
import { handleIndexHtml } from "../handleIndexHtml";
import { PluginContext } from "rollup";
import { DEFAULT_DEV_POLICY } from "../constants";
import { generatePolicyString, policyToTag } from "../policy/createPolicy";
import { cssFilter, jsTsFilter, htmlFilter } from "../utils";

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
  const isCss = cssFilter(id);
  const isJs = jsTsFilter(id);
  const isHtml = htmlFilter(id);

  const isAllTransformed = () =>
    Array.from(transformationStatus.values()).every((value) => value === true);

  if (transformationStatus.has(id)) {
    if (isJs) {
      const hash = generateHash(code, algorithm);
      addHash({
        hash,
        key: "script-src",
        data: {
          algorithm,
          content: code,
        },
        collection: CORE_COLLECTION,
      });
      transformationStatus.set(id, true);
    }

    if (isCss) {
      const hash = generateHash(code, algorithm);
      addHash({
        hash,
        key: "style-src",
        data: {
          algorithm,
          content: code,
        },
        collection: CORE_COLLECTION,
      });
      transformationStatus.set(id, true);
    }

    if (server && isAllTransformed() && (isCss || isJs)) {
      await server.transformIndexHtml("/index.html", "", "/");
      server.ws.send({
        type: "full-reload",
      });
    }
  }

  if (isHtml) {
    console.log("HTML file found", id);
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
  context: { server, chunk, path, filename },
  algorithm,
  policy,
  collection,
  pluginContext,
  canRunInDevMode,
  isTransformationStatusEmpty,
}: TransformIndexHtmlHandlerProps) => {
  //TODO: Possibly could use the server object to do some transformations?
  //Might have to switch from chunk to bundle, if we start code splitting
  if (isTransformationStatusEmpty) {
    return;
  }
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
