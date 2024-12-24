import { genericTests } from '@repo/tests';

const TITLE = "Vite + Svelte";

const BTN_COLOUR = "rgb(255, 62, 0)"
const HEADER_COLOR = "rgb(33, 53, 71)"

genericTests(TITLE, {headerColour: HEADER_COLOR, buttonColour: BTN_COLOUR})
