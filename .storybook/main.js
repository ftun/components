module.exports = {
  stories: [
    "../packages/**/*.stories.[tj]s",
  ],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
  ],
};
