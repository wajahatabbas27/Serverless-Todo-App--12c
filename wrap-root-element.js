const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { dark } = require("@theme-ui/presets");

const myTheme = {
  ...dark,
  sizes: { container: 1024 },
};

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={myTheme}>{element}</ThemeProvider>;
};
