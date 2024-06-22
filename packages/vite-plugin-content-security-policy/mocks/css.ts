export const APP_CSS = `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
`;

export const INDEX_CSS = `:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`;

export const TR_APP_CSS = `"#root {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.react:hover {\n  filter: drop-shadow(0 0 2em #61dafbaa);\n}\n\n@keyframes logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  a:nth-of-type(2) .logo {\n    animation: logo-spin infinite 20s linear;\n  }\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n"`;

export const TR_INDEX_CSS = `":root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n"`;

export const JSON_INDEX_CSS = {
  code: 'import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/@vite/client"\nconst __vite__id = "X:/PERSONAL/OPENSOURCE/vite-csp/apps/react/src/index.css"\nconst __vite__css = ":root {\\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\\n  line-height: 1.5;\\n  font-weight: 400;\\n\\n  color-scheme: light dark;\\n  color: rgba(255, 255, 255, 0.87);\\n  background-color: #242424;\\n\\n  font-synthesis: none;\\n  text-rendering: optimizeLegibility;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\n\\na {\\n  font-weight: 500;\\n  color: #646cff;\\n  text-decoration: inherit;\\n}\\na:hover {\\n  color: #535bf2;\\n}\\n\\nbody {\\n  margin: 0;\\n  display: flex;\\n  place-items: center;\\n  min-width: 320px;\\n  min-height: 100vh;\\n}\\n\\nh1 {\\n  font-size: 3.2em;\\n  line-height: 1.1;\\n}\\n\\nbutton {\\n  border-radius: 8px;\\n  border: 1px solid transparent;\\n  padding: 0.6em 1.2em;\\n  font-size: 1em;\\n  font-weight: 500;\\n  font-family: inherit;\\n  background-color: #1a1a1a;\\n  cursor: pointer;\\n  transition: border-color 0.25s;\\n}\\nbutton:hover {\\n  border-color: #646cff;\\n}\\nbutton:focus,\\nbutton:focus-visible {\\n  outline: 4px auto -webkit-focus-ring-color;\\n}\\n\\n@media (prefers-color-scheme: light) {\\n  :root {\\n    color: #213547;\\n    background-color: #ffffff;\\n  }\\n  a:hover {\\n    color: #747bff;\\n  }\\n  button {\\n    background-color: #f9f9f9;\\n  }\\n}\\n"\n__vite__updateStyle(__vite__id, __vite__css)\nimport.meta.hot.accept()\nimport.meta.hot.prune(() => __vite__removeStyle(__vite__id))',
};

export const JSON_APP_CSS = {
  code: 'import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/@vite/client"\nconst __vite__id = "X:/PERSONAL/OPENSOURCE/vite-csp/apps/react/src/App.css"\nconst __vite__css = "#root {\\n  max-width: 1280px;\\n  margin: 0 auto;\\n  padding: 2rem;\\n  text-align: center;\\n}\\n\\n.logo {\\n  height: 6em;\\n  padding: 1.5em;\\n  will-change: filter;\\n  transition: filter 300ms;\\n}\\n.logo:hover {\\n  filter: drop-shadow(0 0 2em #646cffaa);\\n}\\n.logo.react:hover {\\n  filter: drop-shadow(0 0 2em #61dafbaa);\\n}\\n\\n@keyframes logo-spin {\\n  from {\\n    transform: rotate(0deg);\\n  }\\n  to {\\n    transform: rotate(360deg);\\n  }\\n}\\n\\n@media (prefers-reduced-motion: no-preference) {\\n  a:nth-of-type(2) .logo {\\n    animation: logo-spin infinite 20s linear;\\n  }\\n}\\n\\n.card {\\n  padding: 2em;\\n}\\n\\n.read-the-docs {\\n  color: #888;\\n}\\n"\n__vite__updateStyle(__vite__id, __vite__css)\nimport.meta.hot.accept()\nimport.meta.hot.prune(() => __vite__removeStyle(__vite__id))',
};
