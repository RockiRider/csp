import { genericTests, viteLogoTest } from '@repo/testing';

const TITLE = "Vite + Solid";


const HEADER_COLOR = "rgb(33, 53, 71)"
const BTN_COLOUR = "rgb(255, 0, 0)"

genericTests(TITLE, {headerColour: HEADER_COLOR, buttonColour: BTN_COLOUR})
viteLogoTest();
