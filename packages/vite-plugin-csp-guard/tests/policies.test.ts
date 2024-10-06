import { describe, expect, test } from "vitest";
import { CSPPolicy } from "../src/types";
import { DEFAULT_POLICY } from "../src/policy/constants";
import { mergePolicies } from "../src/policy/core";
import { createPolicy } from "../src/policy/createPolicy";

describe("Policy Merging", () => {
  test("Simple Policy Merge", () => {
    const policy: CSPPolicy = {
      "frame-src": ["example.com"],
    };
    const mergedPolicy = mergePolicies(DEFAULT_POLICY, policy, false);

    expect(mergedPolicy).toEqual({
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:"],
      "script-src-elem": ["'self'"],
      "style-src-elem": ["'self'"],
      "frame-src": ["example.com"],
    });
  });

  test("Deep Policy Merge", () => {
    const policy: CSPPolicy = {
      "img-src": ["example.com"],
    };

    const mergedPolicy = mergePolicies(DEFAULT_POLICY, policy, false);

    expect(mergedPolicy).toEqual({
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:", "example.com"],
      "style-src-elem": ["'self'"],
      "script-src-elem": ["'self'"],
    });
  });

  test("Override Policy Merge", () => {
    const policy: CSPPolicy = {
      "img-src": ["example.com"],
    };

    const mergedPolicy = mergePolicies(DEFAULT_POLICY, policy, true);

    expect(mergedPolicy).toEqual({
      "img-src": ["example.com"],
    });
  });
});

describe("Policy Creation", () => {
  test("Empty Policy", () => {
    const policy: CSPPolicy = {};
    const result = createPolicy(policy);
    expect(result).toBe("");
  });

  test("Simple Policy", () => {
    const policy: CSPPolicy = {
      "default-src": ["'self'"],
    };
    const result = createPolicy(policy);
    expect(result).toBe(" default-src 'self';");
  });

  test("Policy with sha values", () => {
    const policy: CSPPolicy = {
      "script-src": ["'self'", "sha256-abc123"],
    };
    const result = createPolicy(policy);
    expect(result).toBe(" script-src 'self' 'sha256-abc123';");
  });

  test("Policy with wildcard", () => {
    const policy: CSPPolicy = {
      "default-src": ["*"],
    };
    const result = createPolicy(policy);
    expect(result).toBe(" default-src *;");
  });

  test("Policy with data URI", () => {
    const policy: CSPPolicy = {
      "img-src": ["data:"],
    };
    const result = createPolicy(policy);
    expect(result).toBe(" img-src data:;");
  });

  test("Policy with multiple directives including wildcard and data URI", () => {
    const policy: CSPPolicy = {
      "default-src": ["'self'", "*"],
      "img-src": ["'self'", "data:"],
    };
    const result = createPolicy(policy);
    expect(result).toBe(" default-src 'self' *; img-src 'self' data:;");
  });
});
