import { CSPPolicy } from "../types";

export const DEFAULT_DEV_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'"],
  "script-src": ["'self'"],
  "style-src": ["'self'"],
  "style-src-attr": ["'self'"],
};

export const DEFAULT_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'", "data:"],
  "script-src-elem": ["'self'"],
  "style-src-elem": ["'self'"],
};
