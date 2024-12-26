import { genericTests, viteLogoTest } from '@repo/tests';

const TITLE = "Vite + Less";
const HEADER_COLOUR = "rgb(33, 53, 71)"
const BTN_COLOUR = "rgb(0, 123, 255)"

genericTests(TITLE, {headerColour: HEADER_COLOUR, buttonColour: BTN_COLOUR})
viteLogoTest();
