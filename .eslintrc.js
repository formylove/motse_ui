module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:react/recommended",
    "google",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "no-invalid-this": "off",
    "no-trailing-spaces": "off",
    "max-len": ["error", { code: 200 }],
    "@typescript-eslint/no-explicit-any": "off",
    "valid-jsdoc": [
      "error",
      {
        requireParamType: false,
        requireReturnType: false,
        requireReturn: false
      }
    ],
    "require-jsdoc": "off",
    "valid-jsdoc": "off"
  }
};
