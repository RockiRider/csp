import { useEffect } from "react";

const Injector = () => {
  const injectScript = (scriptContent: string) => {
    const script = document.createElement("script");
    script.textContent = scriptContent;
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    const scriptContent = `
      // Your inline script code here
      console.log('Inline script executed');
    `;
    injectScript(scriptContent);
  }, []);

  return <></>;
};

export default Injector;
