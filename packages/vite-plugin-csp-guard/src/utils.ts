import { createFilter } from "vite";
import { Outlier, WarnMissingPolicyProps } from "./types";
import { REQUIRE_POST_TRANSFORM } from "./transform/constants";

export const extractBaseURL = (url: string): string | false => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } catch (e) {
    return false;
  }
};

export const isExternalSource = (source: string): boolean => {
  if (source.includes("http://") || source.includes("https://")) {
    return true;
  }
  return false;
};

export const isSourceInPolicy = ({
  source,
  currentPolicy,
}: WarnMissingPolicyProps) => {
  const baseUrl = extractBaseURL(source);
  if (baseUrl) {
    return currentPolicy.includes(baseUrl);
  } else {
    return false;
  }
};

export const cssFilter = createFilter("**.css");
export const preCssFilter = createFilter(["**.scss", "**.less", "**.styl"]);
export const jsFilter = createFilter(["**/*.js?(*)", "**/*.jsx?(*)"]);
export const tsFilter = createFilter(["**/*.ts", "**/*.tsx"]);
export const htmlFilter = createFilter("**.html");

export const parseOutliers = (outliers: Array<Outlier>) => {
  return {
    postTransform: outliers.some((outlier) =>
      REQUIRE_POST_TRANSFORM.includes(outlier)
    ),
  };
};

export const removeEscapedBacktick = (str: string) => {
  return str.replace(/\\`/g, "`");
};

export const extractAssetPath = (source: string): string | false => {
  if (!source.startsWith("/")) {
    //This is to ensure we are not looking at urls,etc
    return false;
  }
  //Remove the first slash
  return source.slice(1);
};
