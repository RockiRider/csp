import { CSPPolicy } from "./types";

export const createPolicy = (policy: CSPPolicy): string => {
  return Object.keys(policy).reduce((acc, key) => {
    const policyValue = policy[key as keyof CSPPolicy];
    if (!policyValue?.length) return acc;
    policyValue
      .map((v) => {
        if (v.includes("http") || v === "*" || v === "data:" || v === "blob:")
          return `${v}`;
        else return `'${v}'`;
      })
      .join(" ");
    return `${acc} ${key} ${policyValue};`;
  }, "");
};
