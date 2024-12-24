import { genericTests, viteLogoTest } from '@repo/tests';

const TITLE = "Vite + Preact";
const HEADER_COLOUR = "rgb(33, 53, 71)"
const BTN_COLOUR = "rgb(103, 58, 184)"

genericTests(TITLE, {headerColour: HEADER_COLOUR, buttonColour: BTN_COLOUR})
viteLogoTest();