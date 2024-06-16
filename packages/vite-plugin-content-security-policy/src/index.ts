import { HtmlTagDescriptor, Plugin } from "vite";
import { CSPPolicy, MyPluginOptions, defaultPolicy } from "./types";
import { handleHashing } from "./handleHashing";
import { createPolicy } from "./createPolicy";

export default function VitePluginCSP(options?: MyPluginOptions): Plugin {
  return {
    name: "vite-plugin-content-security-policy",
    apply: "build",
    enforce: "post",
    async transformIndexHtml(html, { chunk }) {
      //Might have to switch from chunk to bundle, if we start code splitting
      const { hashes, html: tranformedHtml } = handleHashing(
        html,
        chunk?.code ?? ""
      );
      const finalPolicy = options?.policy ? options.policy : defaultPolicy;
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
