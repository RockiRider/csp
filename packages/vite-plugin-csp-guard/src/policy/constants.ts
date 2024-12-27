import { CSPPolicy } from "csp-toolkit";

export const DEFAULT_DEV_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'", "data:"],
  "script-src-elem": ["'self'"],
  "style-src-elem": ["'self'"],
};

export const DEFAULT_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'"],
  "script-src-elem": ["'self'"],
  "style-src-elem": ["'self'"],
};
