import { genericTests, viteLogoTest } from '@repo/testing';

const TITLE = "Vite + Stylus";
const BTN_COLOUR = "rgb(0, 123, 255)"
const HEADER_COLOR = "rgb(33, 53, 71)"

genericTests(TITLE, {headerColour: HEADER_COLOR, buttonColour: BTN_COLOUR})
viteLogoTest();