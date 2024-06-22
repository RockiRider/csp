export const getCSS = (code: string): string => {
  // Split the code on `const __vite__css =`
  const parts = code.split("const __vite__css =");
  if (parts.length < 2) return ""; // Return an empty string if the split part isn't found
  console.log("PARTS", parts);
  // Ensure parts[1] exists before attempting to split it
  if (parts[1]) {
    return parts[1];
  }

  // Return an empty string if the CSS content isn't properly enclosed in backticks or parts[1] is undefined
  return "";
};

export const extractCSSFromVariable = (code: string) => {
  // Step 2: Use regex to find and extract the CSS content
  const regex =
    /const __vite__css = ([\s\S]*?)(?=__vite__updateStyle\(__vite__id, __vite__css\))/;
  const match = code.match(regex);
  if (match && match[1]) {
    // Return the captured group, which is the CSS content
    return match[1];
  } else {
    // Return an empty string if the variable or its content is not found
    return "";
  }
};
