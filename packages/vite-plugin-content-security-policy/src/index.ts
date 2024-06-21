import { HtmlTagDescriptor, Plugin, createFilter } from "vite";
import { CSPPolicy, MyPluginOptions } from "./types";
import { handleHashing } from "./handleHashing";
import { createPolicy } from "./createPolicy";
import {
  DEFAULT_DEV_POLICY,
  DEFAULT_POLICY,
  getDefaultDevPolicy,
} from "./constants";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined
): Plugin {
  const isRunningOnDev = options?.runOnDev ?? false;
  let devMode = false;
  const cssFilter = createFilter("**.css");

  return {
    name: "vite-plugin-content-security-policy",
    // apply: "build",
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
    transform(code, id, options) {
      const isCss = cssFilter(id);
      if (isCss) {
        console.log("CSS file detected", code);
      }
    },
    async transformIndexHtml(html, { chunk, server }) {
      //Might have to switch from chunk to bundle, if we start code splitting
      const { hashes, html: tranformedHtml } = handleHashing(
        html,
        chunk?.code ?? ""
      );
      const finalPolicy = options?.policy ? options.policy : DEFAULT_POLICY;

      if (isRunningOnDev && devMode && server) {
        const devPort = server.config.server.port; //Get the port of the dev server

        const defaultDevPolicy = devPort
          ? getDefaultDevPolicy(devPort)
          : DEFAULT_DEV_POLICY;

        for (const [key, defaultValues] of Object.entries(defaultDevPolicy)) {
          const currentPolicy = finalPolicy[key as keyof CSPPolicy] ?? [];
          finalPolicy[key as keyof CSPPolicy] = Array.from(
            new Set([...currentPolicy, ...defaultValues])
          );
        }
      }

      for (const [key, value] of Object.entries(hashes)) {
        const currentMap = value;
        const currentPolicy = finalPolicy[key as keyof CSPPolicy] ?? [];
        if (currentMap.size > 0) {
          finalPolicy[key as keyof CSPPolicy] = [
            ...currentPolicy,
            ...Array.from(currentMap.keys()),
          ];
        }
      }
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
        html: tranformedHtml,
        tags: InjectedHtmlTags,
      };
    },
  };
}
