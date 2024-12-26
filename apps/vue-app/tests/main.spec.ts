import { genericTests, viteLogoTest, } from '@repo/tests';

const TITLE = "Vite + Vue";

const BTN_COLOUR = "rgb(66, 184, 131)"
const HEADER_COLOR = "rgb(33, 53, 71)"

genericTests(TITLE, {headerColour: HEADER_COLOR, buttonColour: BTN_COLOUR})
viteLogoTest()