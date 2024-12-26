import { genericTests, jQueryTest, viteLogoTest } from '@repo/tests';

const TITLE = "Vite + Emotion";
const BTN_COLOUR = "rgb(255, 0, 0)"
const HEADER_COLOUR = "rgb(33, 53, 71)"

genericTests(TITLE, {headerColour: HEADER_COLOUR, buttonColour: BTN_COLOUR})
jQueryTest()
viteLogoTest();
