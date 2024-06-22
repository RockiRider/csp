import { CSPPolicy } from "./types";

export const DEFAULT_DEV_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'"],
  "script-src": ["'self'"],
  "style-src": [
    "sha256-p5OBltPlKyHqPir3S9YLIBKtZi7Y65BbhvmELl+UvcQ=",
    "sha256-oHFeCgntvQ+95lgWp14PoPyLMUxSYMB2jBm/OqwiYho=",
  ],
  "style-src-attr": ["'self'"],
};

export const DEFAULT_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
};
