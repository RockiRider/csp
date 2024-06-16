import * as cheerio from "cheerio";
import crypto from "crypto";
import { HashResults, HashDataCollection } from "./types";

export function handleHashing(
  html: string,
  mainBundleCode: string
): { html: string; hashes: HashResults } {
  const $ = cheerio.load(html);

  const HASH_COLLECTION = {
    scriptSrcHashes: new Map<string, HashDataCollection>(),
    scriptAttrHashes: new Map<string, HashDataCollection>(),
    styleSrcHashes: new Map<string, HashDataCollection>(),
    styleAttrHashes: new Map<string, HashDataCollection>(),
  };

  const generateHash = (str: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(str);
    return hash.digest("base64");
  };

  const addHash = (
    hash: string,
    key: keyof typeof HASH_COLLECTION,
    hashData: HashDataCollection,
    element: cheerio.Element
  ) => {
    if (hash.length) {
      const currentCollection = HASH_COLLECTION[key];
      const createdHash = `${hashData.type}-${hash}`;
      $(element).attr("integrity", createdHash);
      currentCollection.set(createdHash, { ...hashData });
    }
  };

  const isMainBundle = (el: cheerio.Element) => {
    const src = el.attribs?.src ?? false;
    const type = el.attribs?.type ?? false;
    if (!src || !type) return false;
    if (src.includes("/assets/index-") && type === "module") return true;
    return false;
  };

  // All script tags
  $("script").each(function (i, el) {
    // Imported Scripts
    if (Object.keys(el.attribs).length && el.attribs?.src?.length) {
      try {
        // const fileId = path.resolve(el.attribs?.src);
        if (isMainBundle(el)) {
          //Main bundle
          const generatedHash = generateHash(mainBundleCode);
          addHash(
            generatedHash,
            "scriptSrcHashes",
            {
              type: "sha256",
              content: mainBundleCode,
            },
            el
          );
        }
      } catch (e) {
        console.error("Error hashing script src", e);
      }
    }

    // Inline Scripts
    if (el.childNodes?.[0]?.type === "text") {
      const txt = $.text([el.childNodes?.[0]]);

      if (txt.length) {
        const hash = generateHash(txt);
        addHash(
          hash,
          "scriptSrcHashes",
          {
            type: "sha256",
            content: txt,
          },
          el
        );
      }
    }
  });

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
  //   if (hashEnabled["style-src-attr"]) {
  //     $("[style]").each((i, el) => {
  //       if (el.attribs?.style.length) {
  //         addHash(hash(hashingMethod, el.attribs.style), "styleAttrHashes");
  //       }
  //     });
  //   }

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
  const transformedHtml = $.html();
  return {
    html: transformedHtml,
    hashes: {
      "script-src-attr": HASH_COLLECTION.scriptAttrHashes,
      "style-src-attr": HASH_COLLECTION.styleAttrHashes,
      "script-src": HASH_COLLECTION.scriptSrcHashes,
      "style-src": HASH_COLLECTION.styleSrcHashes,
    },
  };
}
