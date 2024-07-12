import { DevOptions, Outlier } from "../types";

export const REQUIRE_POST_TRANSFORM: Array<Outlier> = [
  "tailwind",
  "sass",
  "less",
  "stylus",
];

export const DEFAULT_DEV_OPTIONS: DevOptions = {
  run: false,
  outlierSupport: [],
};
