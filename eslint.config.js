// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";
import globals from 'globals';

// Совместимость с конфигами ESLint RC-style (для airbnb)
const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

export default [
  js.configs.recommended,
  ...compat.extends("airbnb-base"),
  {
    ignores: ["dist/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      quotes: ["error", "single", { avoidEscape: true }],
      "no-plusplus": "off",
      "import/extensions": ["error", "ignorePackages"],
      "no-alert": "off",
      "class-methods-use-this": "off",
      "no-console": "off",
      "import/prefer-default-export": "off",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js"],
        },
      },
    },
  },
];
