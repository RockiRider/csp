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
    scriptSrcHashes: new Map<string, HashDataCollection>(), //External scripts
    scriptAttrHashes: new Map<string, HashDataCollection>(), //In line scripts
    styleSrcHashes: new Map<string, HashDataCollection>(), //External styles
    styleAttrHashes: new Map<string, HashDataCollection>(), //In line styles
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

/**
 * Convert a HashCollection to a CSP policy friendly object
 * @param collection
 * @returns
 */
export const collectionToPolicy = (collection: HashCollection) => {
  return {
    "script-src-attr": collection.scriptAttrHashes,
    "style-src-attr": collection.styleAttrHashes,
    "script-src": collection.scriptSrcHashes,
    "style-src": collection.styleSrcHashes,
  };
};

export const warnMissingPolicy = ({
  currentPolicy,
  source,
  sourceType = "script-src",
}: WarnMissingPolicyProps) => {
  if (
    isExternalSource(source) &&
    !isSourceInPolicy({ source, currentPolicy })
  ) {
    console.warn(`${source} is not in the current CSP policy`);
  }
};
