import { Plugin, IndexHtmlTransformHook, ViteDevServer } from "vite";
import { PluginContext } from "rollup";
import { CSPPolicy, MyPluginOptions } from "./types";
import { handleIndexHtml } from "./handleIndexHtml";
import { generatePolicyString, policyToTag } from "./policy/createPolicy";
import { DEFAULT_DEV_POLICY, DEFAULT_POLICY } from "./constants";
import { createNewCollection } from "./core";
import { transformHandler } from "./transform";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined = {}
): Plugin {
  const {
    algorithm = "sha256",
    policy = DEFAULT_POLICY,
    runOnDev = false,
  } = options;

  const CORE_COLLECTION = createNewCollection();

  let isDevMode = false; // This is a flag to check if we are in dev mode
  const isUserDevOpt = runOnDev; // This is a flag to check if the user wants to run in dev mode
  const canRunInDevMode = () => isDevMode && isUserDevOpt; // This is a function to check if we can run in dev mode
  let pluginContext: PluginContext | undefined = undefined; //Needed for logging

  let server: ViteDevServer | undefined = undefined;

  const transformIndexHtmlHandler: IndexHtmlTransformHook = (
    html,
    { chunk, server, path, bundle, filename, originalUrl }
  ) => {
    //TODO: Possibly could use the server object to do some transformations?
    //Might have to switch from chunk to bundle, if we start code splitting

    const collection = handleIndexHtml({
      html,
      algorithm,
      collection: CORE_COLLECTION,
      policy,
      context: pluginContext,
    });

    // console.log(CORE_COLLECTION);

    const finalPolicy = { ...policy };

    if (canRunInDevMode()) {
      const defaultDevPolicy = DEFAULT_DEV_POLICY;

      for (const [key, defaultValues] of Object.entries(defaultDevPolicy)) {
        const currentPolicy = finalPolicy[key as keyof CSPPolicy] ?? [];
        finalPolicy[key as keyof CSPPolicy] = Array.from(
          new Set([...currentPolicy, ...defaultValues])
        );
      }
    }
    const policyString = generatePolicyString({
      collection,
      policy: finalPolicy,
    });
    console.log(policyString); // This is correct, however the browser isn't picking up the new index.html, because the first transformIndexHtml runs as soon as the browser opens, and thats the html that gets server to the browser first.
    // Maybe we need a HMR update for the IndexHtml
    const InjectedHtmlTags = policyToTag(policyString);

    return {
      html,
      tags: InjectedHtmlTags,
    };
  };

  return {
    name: "vite-plugin-content-security-policy",
    // enforce: "post", // Not sure yet what to do here
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
    transform: {
      order: "pre",
      handler: async (code, id, options) => {
        await transformHandler({
          code,
          id,
          algorithm,
          CORE_COLLECTION,
          server,
        });
      },
    },
    transformIndexHtml: {
      order: "post",
      handler: transformIndexHtmlHandler,
    },
    handleHotUpdate: ({ file, timestamp, modules, read, server }) => {
      if (!canRunInDevMode()) return;
      console.log("Hot Update");
    },
    onLog(_level, log) {
      if (
        log.plugin === "vite-plugin-content-security-policy" &&
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
