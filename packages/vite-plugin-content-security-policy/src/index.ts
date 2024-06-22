import { HtmlTagDescriptor, Plugin, IndexHtmlTransformHook } from "vite";
import { CSPPolicy, MyPluginOptions } from "./types";
import { handleHTMLHashing } from "./handleHashing";
import { createPolicy } from "./createPolicy";
import { DEFAULT_DEV_POLICY, DEFAULT_POLICY } from "./constants";
import { collectionToPolicy, createNewCollection } from "./core";
import { transformHandler } from "./transform";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined = {}
): Plugin {
  const { algorithm = "sha256", policy = DEFAULT_POLICY } = options;

  const CORE_COLLECTION = createNewCollection();

  const isRunningOnDev = options?.runOnDev ?? false;
  let devMode = false;

  const transformIndexHtmlHandler: IndexHtmlTransformHook = async (
    html,
    { chunk, server, path, bundle, filename, originalUrl }
  ) => {
    //TODO: Possibly could use the server object to do some transformations?

    //Might have to switch from chunk to bundle, if we start code splitting
    const collection = collectionToPolicy(
      handleHTMLHashing({
        html,
        algorithm,
        collection: CORE_COLLECTION,
      })
    );

    const finalPolicy = { ...policy };

    if (isRunningOnDev && devMode && server) {
      // Needed for the dev server
      // const devPort = server.config.server.port; //Get the port of the dev server TODO: We don't need this??

      const defaultDevPolicy = DEFAULT_DEV_POLICY;

      for (const [key, defaultValues] of Object.entries(defaultDevPolicy)) {
        const currentPolicy = finalPolicy[key as keyof CSPPolicy] ?? [];
        finalPolicy[key as keyof CSPPolicy] = Array.from(
          new Set([...currentPolicy, ...defaultValues])
        );
      }
    }
    // Generate the final policy
    for (const [key, value] of Object.entries(collection)) {
      const currentMap = value;
      const currentPolicy = finalPolicy[key as keyof CSPPolicy] ?? [];
      if (currentMap.size > 0) {
        finalPolicy[key as keyof CSPPolicy] = [
          ...currentPolicy,
          ...Array.from(currentMap.keys()),
        ];
      }
    }
    // Create the policy string
    const policyString = createPolicy(finalPolicy);

    const InjectedHtmlTags: HtmlTagDescriptor[] = [
      {
        tag: "meta",
        attrs: {
          "http-equiv": "Content-Security-Policy",
          content: policyString,
        },
        injectTo: "head-prepend",
      },
    ];

    return {
      html,
      tags: InjectedHtmlTags,
    };
  };

  return {
    name: "vite-plugin-content-security-policy",
    enforce: "post",

    apply(config, { command }) {
      // If we are in dev mode return true
      if (
        command === "serve" &&
        config.mode === "development" &&
        isRunningOnDev
      )
        return true;
      // apply only on build but not for SSR
      return command === "build" && !config.build?.ssr;
    },
    configResolved(config) {
      const devCommand =
        config.command === "serve" && config.mode === "development";

      if (devCommand && !isRunningOnDev) {
        console.warn(
          "You are running in development mode but runOnDev is set to false. This will not inject the default policy for development mode"
        );
      }

      if (devCommand) {
        devMode = true;
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
      handler: (code, id, options) =>
        transformHandler(code, id, algorithm, CORE_COLLECTION),
    },
    transformIndexHtml: { order: "post", handler: transformIndexHtmlHandler },
  };
}
