import { HtmlTagDescriptor } from "vite";
import { CSPPolicy, HashCollection } from "../types";

const createPolicy = (policy: CSPPolicy): string => {
  return Object.keys(policy).reduce((acc, key) => {
    const policyValue = policy[key as keyof CSPPolicy];
    if (!policyValue?.length) return acc;
    const policyValueStr = policyValue
      .map((v) => {
        // Check if the value starts with "sha" and enclose it in single quotes if it does.
        // Also enclose in single quotes if it matches other specified conditions.
        if (v.startsWith("sha") || v === "*") return `'${v}'`;
        else return v;
      })
      .join(" ");
    return `${acc} ${key} ${policyValueStr};`;
  }, "");
};

type GeneratePolicyProps = {
  policy: CSPPolicy;
  collection: HashCollection;
};
export const generatePolicyString = ({
  collection,
  policy,
}: GeneratePolicyProps) => {
  const finalPolicy = { ...policy };

  // Generate the final policy
  for (const [key, value] of Object.entries(collection)) {
    const currentMap = value;
    const currentPolicy = finalPolicy[key as keyof CSPPolicy] ?? [];

    if (currentPolicy.includes("'unsafe-inline'")) {
      // If we have unsafe-inline, we should not add any hashes because this will override the unsafe-inline
      continue;
    }

    if (currentMap.size > 0) {
      finalPolicy[key as keyof CSPPolicy] = [
        ...currentPolicy,
        ...Array.from(currentMap.keys()),
      ];
    }
  }
  // Create the policy string
  const policyString = createPolicy(finalPolicy);

  return policyString;
};

export const policyToTag = (policy: string): HtmlTagDescriptor[] => {
  return [
    {
      tag: "meta",
      attrs: {
        "http-equiv": "Content-Security-Policy",
        content: policy,
      },
      injectTo: "head-prepend",
    },
  ];
};
