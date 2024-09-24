import { describe, expect, test } from "vitest";
import { CSPPolicy } from "../src/types";
import { DEFAULT_POLICY } from "../src/policy/constants";
import { mergePolicies } from "../src/policy/core";

describe("Policy Tests", () => {
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
