import { ModuleInfo, ProgramNode } from "rollup";
import { walk } from "estree-walker";

/**
 * There are 3 approaches to getting this CSS in JS detection to work:
 * 1. Use the AST during the moduleParsed hook to look for CSS in JS syntax and then store the result in a map. - This is the most accurate, and the most lightweight/scalable approach however its also the most complex.
 * 2. Look for the CSS at build time inside each chunk and then store the result in a map. This could be easy to do, but probably not that accurate due to us being forced to use regex, there will be some edge cases that we miss.
 * 3. Use LinkeDOM a JSOM alternative, to actually load the JS and CSS and then look for the CSS syntax in the DOM. This will be more accurate, however more heavy - especially when we have to account for lazy loading
 */

interface HandleModuleParsedProps {
  info: ModuleInfo;
}
export const handleModuleParsed = ({ info }: HandleModuleParsedProps) => {
  if (info.id.includes("StyledExample")) {
    const hasFoundStyles = findStyles(info.ast);
    console.log("Has found styles: ", hasFoundStyles);
  }
};

// TODO: 1 Look for VariableDeclerations. Look at their names and their values. If the names include anything like "styles or css" and the values include any css like syntax, we have found our styles.
//TODO: 2 Look at imports from elsewhere (other files, so we can catch out things like emotion, styled-components, etc)
const findStyles = (ast: ProgramNode | null): boolean => {
  if (!ast) return false;
  let foundStyles = false;

  walk(ast, {
    enter(node) {
      // Check for VariableDeclaration nodes
      if (node.type === "VariableDeclaration") {
        // Iterate through each declaration in the VariableDeclaration
        node.declarations.forEach((declaration) => {
          // Check if the variable name includes "styles" or "css"
          if (declaration.id.type === "Identifier") {
            const name = declaration.id.name;
            const isStyleVariable =
              declaration.id.name.includes("style") ||
              declaration.id.name.includes("css") ||
              name.includes("className");

            //TODO: Continue from here
            console.log(declaration.init);

            // if (declaration.init?.type === "") {
            //   console.log(declaration);

            //   const hasCssSyntax =
            //     declaration.init &&
            //     typeof declaration.init.value === "string" &&
            //     (declaration.init.value.includes(":") ||
            //       declaration.init.value.includes(";"));
            // }

            if (isStyleVariable) {
              foundStyles = true;
            }
          }
          //   Basic check for CSS-like syntax in the initializer value
        });
      }
    },
  });

  return foundStyles;
};
