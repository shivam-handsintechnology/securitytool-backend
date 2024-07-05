import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/protect/**",
      // Add more folders to ignore here
      // Specific files to ignore
      "*.config.js",
      "*.spec.js",
      "*test.js",
      ".eslintrc.js",

      // Specific files in specific locations
      "src/legacy/**/*.js",
      "scripts/generated/*.js",

      // Add more folders or files to ignore here
    ]
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];