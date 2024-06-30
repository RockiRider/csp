import { createFilter } from "vite";
import { CSPPolicy, WarnMissingPolicyProps } from "./types";

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
export const jsTsFilter = createFilter([
  "**/*.js?(*)",
  "**/*.ts?(*)",
  "**/*.jsx?(*)",
  "**/*.tsx?(*)",
]);
export const htmlFilter = createFilter("**.html");

export const mergePolicies = (
  defaultPolicy: CSPPolicy,
  userPolicy: CSPPolicy | undefined
) => {
  if (!userPolicy) return defaultPolicy;
  // Simple object merge; for deep merge, you might need a more sophisticated approach
  return { ...defaultPolicy, ...userPolicy };
};
