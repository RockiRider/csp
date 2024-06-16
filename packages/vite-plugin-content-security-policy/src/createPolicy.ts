import { CSPPolicy } from "./types";

export const createPolicy = (policy: CSPPolicy): string => {
  return Object.keys(policy).reduce((acc, key) => {
    const policyValue = policy[key as keyof CSPPolicy];
    if (!policyValue?.length) return acc;
    const policyValueStr = policyValue
      .map((v) => {
        // Check if the value starts with "sha" and enclose it in single quotes if it does.
        // Also enclose in single quotes if it matches other specified conditions.
        if (v.startsWith("sha") || v === "*" || v === "data:" || v === "blob:")
          return `'${v}'`;
        else return v;
      })
      .join(" ");
    return `${acc} ${key} ${policyValueStr};`;
  }, "");
};
