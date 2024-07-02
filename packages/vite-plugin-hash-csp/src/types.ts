import { PluginContext } from "rollup";

export type CSPKeys =
  | "default-src"
  | "script-src"
  | "style-src"
  | "connect-src"
  | "object-src"
  | "img-src"
  | "frame-src"
  | "child-src"
  | "font-src"
  | "manifest-src"
  | "media-src"
  | "object-src"
  | "report-to"
  | "sandbox"
  | "script-src-attr"
  | "script-src-elem"
  | "style-src-attr"
  | "style-src-elem"
  | "upgrade-insecure-requests"
  | "worker-src";

export type CSPPolicy = Partial<{
  [n in CSPKeys]: string[];
}>;

export type HashAlgorithms = "sha256" | "sha384" | "sha512";

export type MyPluginOptions = {
  algorithm?: HashAlgorithms;
  policy?: CSPPolicy;
  unstable_runOnDev?: boolean;
};

export type HashCache = {
  fileType: "script" | "style";
  contents: string;
};

export type CryptoSources = `sha256-${string}`;

export const validCrypto = ["sha256", "sha384", "sha512"];

export type HashDataCollection = {
  algorithm: HashAlgorithms;
  content: string;
};

export type HashCollection = {
  "style-src": Map<string, HashDataCollection>; //In line styles
  "style-src-elem": Map<string, HashDataCollection>; //External styles
  "style-src-attr": Map<string, HashDataCollection>; //In line scripts

  "script-src": Map<string, HashDataCollection>; //External styles
  "script-src-attr": Map<string, HashDataCollection>; //External scripts
  "script-src-elem": Map<string, HashDataCollection>;
};

export type HashCollectionKey = keyof HashCollection;

export type WarnMissingPolicyProps = {
  source: string;
  currentPolicy: string[];
  sourceType?: CSPKeys;
  context?: PluginContext;
};

export type TransformationStatus = Map<string, boolean>;
