import { CSPPolicy } from "../types";

export const mergePolicies = (
    basePolicy: CSPPolicy,
    newPolicy: CSPPolicy | undefined,
    shouldOverride: boolean
  ): CSPPolicy => {
    const newPolicyExists = newPolicy && Object.keys(newPolicy).length > 0;
  
    if (shouldOverride) {
      return newPolicy as CSPPolicy;
    }
    if (!newPolicyExists) return basePolicy;
  
    const mergedPolicy: CSPPolicy = { ...basePolicy };
  
    for (const key in newPolicy as CSPPolicy) {
      const _key = key as keyof CSPPolicy;
      if (newPolicy.hasOwnProperty(key)) {
        const defaultValues = basePolicy[_key] || [];
        const userValues = newPolicy[_key] || [];
  
        if (Array.isArray(userValues)) {
          mergedPolicy[_key] = Array.from(
            new Set([...defaultValues, ...userValues])
          );
        } else {
          mergedPolicy[_key] = userValues;
        }
      }
    }
  
    return mergedPolicy;
  };

export const policyToString = (policy: CSPPolicy): string => {
    return Object.keys(policy).reduce((acc, key) => {
        const policyValue = policy[key as keyof CSPPolicy];
        if (!policyValue?.length) return acc;
        const policyValueStr = policyValue
        .map((v) => {
            // Check if the value starts with "sha" and enclose it in single quotes if it does.
            if (v.startsWith("sha")) return `'${v}'`;
            if(v.startsWith("nonce")) return `'${v}'`;
            else return v;
        })
        .join(" ");
        return `${acc} ${key} ${policyValueStr};`;
    }, "");
};