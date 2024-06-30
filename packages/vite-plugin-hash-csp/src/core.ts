import {
  HashAlgorithms,
  HashCollection,
  HashCollectionKey,
  HashDataCollection,
  WarnMissingPolicyProps,
} from "./types";
import crypto from "crypto";
import { isExternalSource, isSourceInPolicy } from "./utils";

/**
 * Used for hash data storage
 * @returns A new HashDataCollection where we can store our data
 */
export const createNewCollection = (): HashCollection => {
  return {
    "script-src": new Map<string, HashDataCollection>(), //External scripts
    "script-src-attr": new Map<string, HashDataCollection>(), //In line scripts
    "script-src-elem": new Map<string, HashDataCollection>(), //External scripts
    "style-src": new Map<string, HashDataCollection>(), //External styles
    "style-src-attr": new Map<string, HashDataCollection>(), //In line styles
    "style-src-elem": new Map<string, HashDataCollection>(), //External styles
  };
};

/**
 * Take a string and generate a hash
 * @param str - The string to hash
 * @param algorithm - The algorithm to use
 * @returns
 */
export const generateHash = (str: string, algorithm: HashAlgorithms) => {
  const hash = crypto.createHash(algorithm);
  hash.update(str);
  return hash.digest("base64");
};

type AddHashProps = {
  hash: string;
  key: HashCollectionKey;
  data: HashDataCollection;
  collection: HashCollection;
};

/**
 * Adds the hash to the collection provided
 * @param
 */
export const addHash = ({ hash, key, data, collection }: AddHashProps) => {
  if (hash.length) {
    const currentCollection = collection[key];
    const createdHash = `${data.algorithm}-${hash}`;
    //Check if we have already stored the hash
    if (!currentCollection.has(createdHash)) {
      currentCollection.set(createdHash, { ...data });
    }
  }
};

export const warnMissingPolicy = ({
  currentPolicy,
  source,
  sourceType = "script-src",
  context,
}: WarnMissingPolicyProps) => {
  if (
    isExternalSource(source) &&
    !isSourceInPolicy({ source, currentPolicy })
  ) {
    context
      ? context.warn({
          message: `${source} is not in the current CSP policy`,
          pluginCode: "SPECIAL_CODE",
        })
      : console.warn(`${source} is not in the current CSP policy`);
  }
};
