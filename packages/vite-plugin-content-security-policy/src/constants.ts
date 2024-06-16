import { CSPPolicy } from "./types";

export const DEFAULT_DEV_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
  "img-src": ["'self'"],
  "script-src": ["'self'", "http://localhost"],
};

export const getDefaultDevPolicy = (port: number): CSPPolicy => {
  return {
    "default-src": ["'self'"],
    "img-src": ["'self'"],
    "script-src": ["'self'", `http://localhost:${port}`],
  };
};

export const DEFAULT_POLICY: CSPPolicy = {
  "default-src": ["'self'"],
};
