import { Plugin, ViteDevServer } from "vite";
import { PluginContext } from "rollup";
import { MyPluginOptions, TransformationStatus } from "./types";
import { DEFAULT_POLICY } from "./policy/constants";
import { createNewCollection } from "./policy/core";
import { transformHandler, transformIndexHtmlHandler } from "./transform";
import {
  cssFilter,
  jsFilter,
  mergePolicies,
  parseOutliers,
  preCssFilter,
  tsFilter,
} from "./utils";
import { unstable_handleModuleParsed } from "./css";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined = {}
): Plugin {
  const {
    algorithm = "sha256",
    policy = DEFAULT_POLICY,
    dev = {},
    mode = "prod",
  } = options;

  const { outlierSupport = [], run = false } = dev;

  const CORE_COLLECTION = createNewCollection();

  const effectivePolicy = mergePolicies(DEFAULT_POLICY, policy);

  let isDevMode = false; // This is a flag to check if we are in dev mode
  const isUserDevOpt = run; // This is a flag to check if the user wants to run in dev mode
  const canRunInDevMode = () => isDevMode && isUserDevOpt; // This is a function to check if we can run in dev mode
  let pluginContext: PluginContext | undefined = undefined; //Needed for logging

  let server: ViteDevServer | undefined = undefined;

  const transformationStatus: TransformationStatus = new Map<string, boolean>();
  const isTransformationStatusEmpty = () => transformationStatus.size === 0;

  const requirements = parseOutliers(outlierSupport);

  return {
    name: "vite-plugin-hash-csp",
    enforce: "post",
    buildStart() {
      pluginContext = this;
    },
    apply(config, { command }) {
      // If we are in dev mode return true
      if (command === "serve" && config.mode === "development" && isUserDevOpt)
        return true;
      // apply only on build but not for SSR
      return command === "build" && !config.build?.ssr;
    },
    configResolved(config) {
      const devCommand =
        config.command === "serve" && config.mode === "development";

      if (devCommand && !isUserDevOpt) {
        console.warn(
          "You are running in development mode but runOnDev is set to false. This will not inject the default policy for development mode"
        );
      }

      if (devCommand) {
        isDevMode = true;
      }

      if (config.appType !== "spa") {
        throw new Error("Vite CSP Plugin only works with SPA apps for now");
      }
      const ssrCheck = config.build.ssr;
      if (ssrCheck) {
        throw new Error("Vite CSP Plugin does not work with SSR apps");
      }
    },
    load(id) {
      if (!canRunInDevMode()) return null; // Exit early if we are not in dev mode or if we are in dev mode but the user does not want to run in dev mode

      // Entry points to files that need to be transformed
      const isCss = cssFilter(id);
      const isPreCss = preCssFilter(id);
      const isJs = jsFilter(id);
      const isTs = tsFilter(id);
      if (isCss || isJs || isTs || isPreCss)
        transformationStatus.set(id, false);

      return null;
    },
    transform: {
      order: requirements.postTransform ? "post" : "pre",
      handler: async (code, id) => {
        if (!canRunInDevMode()) return null; // Exit early if we are not in dev mode or if we are in dev mode but the user does not want to run in dev mode

        await transformHandler({
          code,
          id,
          algorithm,
          CORE_COLLECTION,
          transformationStatus,
          server,
          transformMode: requirements.postTransform ? "post" : "pre",
        });
        return null;
      },
    },
    transformIndexHtml: {
      order: "post",
      handler: async (html, context) => {
        return transformIndexHtmlHandler({
          html,
          context,
          algorithm,
          policy: effectivePolicy,
          collection: CORE_COLLECTION,
          pluginContext,
          canRunInDevMode: canRunInDevMode(),
          isTransformationStatusEmpty: isTransformationStatusEmpty(),
        });
      },
    },
    onLog(_level, log) {
      if (
        log.plugin === "vite-plugin-hash-csp" &&
        log.pluginCode === "WARNING_CODE"
      ) {
        this.warn(log);
      }
    },
    moduleParsed: (info) =>
      // This handleModuleParsed function is not ready for production
      mode === "prod" ? undefined : unstable_handleModuleParsed({ info }),
    configureServer(thisServer) {
      server = thisServer;
    },
  };
}
