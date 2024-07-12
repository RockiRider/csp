const cssParser = (unparsed: string) => {
  // Step 1: Remove the enclosing double quotes
  let convertedCss = unparsed.slice(1, -1);

  // Step 2: Replace \n with actual newlines
  convertedCss = convertedCss.replace(/\\n/g, "\n");

  // Step 3: Unescape double quotes (if any)
  convertedCss = convertedCss.replace(/\\"/g, '"');

  return convertedCss;
};

const extractCSSFromVariable = (code: string) => {
  // Step 2: Use regex to find and extract the CSS content
  const regex =
    /const __vite__css = ([\s\S]*?)(?=__vite__updateStyle\(__vite__id, __vite__css\))/;
  const match = code.match(regex);
  if (match && match[1]) {
    let cssContent = match[1];
    // Return the captured group, which is the CSS content

    if (cssContent.trimEnd().endsWith('"')) {
      //We want to trim the end and remove double quotes
      cssContent = cssContent.slice(0, -1);
      return cssContent;
    }

    return cssContent;
  } else {
    // Return an empty string if the variable or its content is not found
    return "";
  }
};

export const getCSS = (code: string): string => {
  // Step 1: Extract the CSS content from the code
  const cssContent = extractCSSFromVariable(code);

  // Step 2: Parse the CSS content
  return cssParser(cssContent);
};
