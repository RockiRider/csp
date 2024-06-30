import { Plugin, ViteDevServer } from "vite";
import { PluginContext } from "rollup";
import { MyPluginOptions, TransformationStatus } from "./types";
import { DEFAULT_POLICY } from "./constants";
import { createNewCollection } from "./core";
import { transformHandler, transformIndexHtmlHandler } from "./transform";
import { cssFilter, jsTsFilter, mergePolicies } from "./utils";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined = {}
): Plugin {
  const {
    algorithm = "sha256",
    policy = DEFAULT_POLICY,
    runOnDev = false,
  } = options;

  const CORE_COLLECTION = createNewCollection();

  const effectivePolicy = mergePolicies(DEFAULT_POLICY, policy);

  let isDevMode = false; // This is a flag to check if we are in dev mode
  const isUserDevOpt = runOnDev; // This is a flag to check if the user wants to run in dev mode
  const canRunInDevMode = () => isDevMode && isUserDevOpt; // This is a function to check if we can run in dev mode
  let pluginContext: PluginContext | undefined = undefined; //Needed for logging

  let server: ViteDevServer | undefined = undefined;

  const transformationStatus: TransformationStatus = new Map<string, boolean>();
  const isTransformationStatusEmpty = () => transformationStatus.size === 0;

  return {
    name: "vite-plugin-hash-csp",
    enforce: "post", // Not sure yet what to do here
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
      const isCss = cssFilter(id);
      const isJs = jsTsFilter(id);
      if (isCss || isJs) transformationStatus.set(id, false);

      return null;
    },
    transform: {
      order: "pre",
      handler: async (code, id) => {
        await transformHandler({
          code,
          id,
          algorithm,
          CORE_COLLECTION,
          transformationStatus,
          server,
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
    buildEnd() {
      console.log("Build End");
    },
    closeBundle() {
      console.log("Close Bundle");
    },
    configureServer(thisServer) {
      server = thisServer;
    },
  };
}
