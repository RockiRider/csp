import { genericTests, jQueryTest, overrideTest, inlineScriptBlockedTest  } from '@repo/tests';

const APP_TITLE = "Vite + React"; 
const HEADER_COLOUR = "rgb(33, 53, 71)"
const BTN_COLOUR = "rgb(255, 0, 0)"

genericTests(APP_TITLE, {headerColour: HEADER_COLOUR, buttonColour: BTN_COLOUR})
jQueryTest()
overrideTest(APP_TITLE)
inlineScriptBlockedTest(APP_TITLE)

