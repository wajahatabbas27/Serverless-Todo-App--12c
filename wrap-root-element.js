const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { dark } = require("@theme-ui/presets");
const { Provider } = require("./identity-context");

const myTheme = {
  ...dark,
  sizes: { container: 1024 },
};

module.exports = ({ element }) => {
  return (
    <Provider>
      <ThemeProvider theme={myTheme}>{element}</ThemeProvider>;
    </Provider>
  );
};
