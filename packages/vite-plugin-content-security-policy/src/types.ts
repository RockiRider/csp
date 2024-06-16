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
export const defaultPolicy: CSPPolicy = {
  "default-src": ["self"],
};

export type MyPluginOptions = {
  policy?: CSPPolicy;
};

export type HashCache = {
  fileType: "script" | "style";
  contents: string;
};

export type CryptoSources = `sha256-${string}`;

export const validCrypto = ["sha256", "sha384", "sha512"];

export type HashDataCollection = {
  type: string;
  content: string;
};

export type HashResults = Record<string, Map<string, HashDataCollection>>;
