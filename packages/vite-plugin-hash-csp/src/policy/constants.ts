import { CSPPolicy } from "../types";

export const DEFAULT_DEV_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'"],
  "script-src-elem": ["'self'"],
  "style-src-elem": ["'self'"],
};

export const DEFAULT_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'", "data:"],
  "style-src-elem": ["'self'"],
};
