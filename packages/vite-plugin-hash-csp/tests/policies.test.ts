import { describe, expect, test } from "vitest";
import { CSPPolicy } from "../src/types";
import { mergePolicies } from "../src/utils";
import { DEFAULT_POLICY } from "../src/policy/constants";

describe("Policy Tests", () => {
  test("Simple Policy Merge", () => {
    const policy: CSPPolicy = {
      "frame-src": ["example.com"],
    };
    const mergedPolicy = mergePolicies(DEFAULT_POLICY, policy);

    expect(mergedPolicy).toEqual({
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:"],
      "style-src-elem": ["'self'"],
      "frame-src": ["example.com"],
    });
  });

  test("Deep Policy Merge", () => {
    const policy: CSPPolicy = {
      "img-src": ["example.com"],
    };

    const mergedPolicy = mergePolicies(DEFAULT_POLICY, policy);

    expect(mergedPolicy).toEqual({
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:", "example.com"],
      "style-src-elem": ["'self'"],
    });
  });
});
