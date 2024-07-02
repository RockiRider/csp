import { useEffect } from "react";

const useInjectStyles = (styleString: string) => {
  const className = "my-custom-component";
  const styleId = `${className}-styles`;

  useEffect(() => {
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.innerHTML = styleString;
      document.head.appendChild(styleTag);
    }
  }, [styleString, styleId]);

  return className;
};

const StyledExample = () => {
  const className = useInjectStyles(`
    .my-custom-component {
      color: red;
      padding: 10px;
      border: 1px solid black;
      cursor: pointer;
    }
  `);

  return <button className={className}>Click Me</button>;
};

export default StyledExample;
