import * as cheerio from "cheerio";
import {
  BundleContext,
  CSPPolicy,
  HashAlgorithms,
  HashCollection,
} from "../types";
import { addHash, generateHash, warnMissingPolicy } from "../policy/core";
import { PluginContext } from "rollup";
import { extractAssetPath } from "../utils";

/**
 * TODO: Support hashing the bundle's JS and CSS in the correct hashing algorithm
 * TODO: Support correct warning logging of truly external scripts and styles.
 */

type handleIndexHtmlProps = {
  html: string;
  algorithm: HashAlgorithms;
  collection: HashCollection;
  policy: CSPPolicy;
  context: PluginContext | undefined;
  bundleContext?: BundleContext;
};

/**
 * Looks at the html and scans it for inline scripts, external scripts, inline styles and external styles, so that we can warn the user if they are missing from the policy
 * @param html
 * @param mainBundleCode
 * @returns
 */
export function handleIndexHtml({
  html,
  algorithm,
  collection: HASH_COLLECTION,
  policy,
  bundleContext,
}: handleIndexHtmlProps) {
  const $ = cheerio.load(html);
  console.log(bundleContext);

  // All script tags
  $("script").each(function (i, el) {
    // Imported Scripts
    if (Object.keys(el.attribs).length && el.attribs?.src?.length) {
      try {
        const scriptSrc = el.attribs.src;

        warnMissingPolicy({
          source: scriptSrc,
          currentPolicy: policy["script-src"] ?? [],
          sourceType: "script-src",
        });

        if (bundleContext) {
          const fileName = extractAssetPath(scriptSrc);
          if (fileName) {
            const found = bundleContext[fileName];
            if (found) {
              //If we have found this, we then ned to amend the script to add an integrity attribute
              $(el).attr("integrity", `sha256-${found.hash}`);
            }
          }
        }
      } catch (e) {
        console.error("Error hashing script src", e);
      }
    }

    // Inline Scripts
    if (el.childNodes?.[0]?.type === "text") {
      const txt = $.text([el.childNodes?.[0]]);
      if (txt.length) {
        const hash = generateHash(txt, algorithm);
        addHash({
          hash,
          key: "script-src",
          data: { algorithm, content: txt },
          collection: HASH_COLLECTION,
        });
      }
    }
  });

  // $("style").each(function (i, el) {
  //   // Inline styles
  //   if (el.childNodes?.[0]?.type === "text") {
  //     const txt = $.text([el.childNodes?.[0]]);
  //     if (txt.length) {
  //       const hash = generateHash(txt);
  //       addHash(
  //         hash,
  //         "styleSrcHashes",
  //         {
  //           type: "sha256",
  //           content: txt,
  //         },
  //         el
  //       );
  //     }
  //   }
  // });

  // $("[style]").each((i, el) => {
  //   const inlineStyle = el.attribs?.style;
  //   if (inlineStyle?.length) {
  //     const hash = generateHash(inlineStyle);
  //     addHash(
  //       hash,
  //       "styleAttrHashes",
  //       {
  //         type: "sha256",
  //         content: inlineStyle,
  //       },
  //       el
  //     );
  //   }
  // });

  //Log out cheerio html

  // All style tags
  //   $("style").each(function (i, el) {
  //     // Inline styles
  //     if (el.childNodes?.[0]?.type === "text") {
  //       const txt = $.text([el.childNodes?.[0]]);
  //       if (txt.length) {
  //         const cssImportUrls = getCssImportUrls(txt);
  //         cssImportUrls.forEach((v) => {
  //           if (v.length) {
  //             const fileId = path.resolve(v);
  //             if (idMap.has(fileId)) {
  //               addHash(idMap.get(fileId)?.[hashingMethod], "styleSrcHashes");
  //             }
  //           }
  //         });
  //         addHash(hash(hashingMethod, txt), "styleSrcHashes");
  //       }
  //     }
  //   });

  // Styles linked in head
  //   $("link").each(function (i, el) {
  //     if (
  //       Object.keys(el.attribs).length &&
  //       el.attribs?.rel === "stylesheet" &&
  //       el.attribs?.href?.length
  //     ) {
  //       const fileId = path.resolve(el.attribs?.href);
  //       if (idMap.has(fileId)) {
  //         addHash(idMap.get(fileId)?.[hashingMethod], "styleSrcHashes");
  //       }
  //     }
  //   });

  // Hash inline styles in `style=""` tags if enabled
  // if (hashEnabled["style-src-attr"]) {
  //   $("[style]").each((i, el) => {
  //     if (el.attribs?.style.length) {
  //       addHash(hash(hashingMethod, el.attribs.style), "styleAttrHashes");
  //     }
  //   });
  // }

  // Hash inline scripts in `onSomething=""` tags if enabled
  //   if (hashEnabled["script-src-attr"]) {
  //     const onFn = (v: string) => v.startsWith("on");
  //     $("*")
  //       .filter((i, el) => Object.keys((<Element>(<unknown>el)).attribs).some(onFn))
  //       .each((i, el) => {
  //         Object.keys((<Element>(<unknown>el)).attribs)
  //           .filter(onFn)
  //           .forEach((v) => {
  //             const content = (<Element>(<unknown>el)).attribs[v];
  //             if (content?.length) {
  //               addHash(hash(hashingMethod, content), "scriptAttrHashes");
  //             }
  //           });
  //       });
  //   }
  console.log($.html());
  return { HASH_COLLECTION, html: $.html() };
}
