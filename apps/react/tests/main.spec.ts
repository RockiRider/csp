import { genericTests, jQueryTest, overrideTest, inlineScriptBlockedTest  } from '@repo/tests';

const APP_TITLE = "Vite + React"; 
const COLOUR = "rgb(33, 53, 71)"

genericTests(APP_TITLE, COLOUR)
jQueryTest()
overrideTest(APP_TITLE)
inlineScriptBlockedTest(APP_TITLE)

