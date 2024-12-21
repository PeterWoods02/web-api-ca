// eslint.config.js
module.exports = [
  {
    ignores: ["node_modules"], // Ignore node_modules directory
  },
  {
    files: ["**/*.js", "**/*.jsx"], // Lint .js and .jsx files
    languageOptions: {
      ecmaVersion: "latest",   // Use the latest ECMAScript version
      sourceType: "module",    // Set source type to module (ES6+ imports)
      globals: {
        module: "readonly",    // Define global 'module' variable for Node.js
        require: "readonly",   // Define global 'require' variable for Node.js
        process: "readonly",   // Optional: Define 'process' as a global (for Node.js)
        __dirname: "readonly", // Optional: Define '__dirname' as a global (for Node.js)
      },
      parserOptions: {
        jsx: true,  // Enable JSX parsing for React
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),  // Include the React plugin
    },
    rules: {
      "semi": "warn",               // Warn about missing semicolons
      "no-console": "off",          // Disable no-console rule (allow console statements)
      "react/prop-types": "off",    // Disable PropTypes rule (optional, depending on use)
      "react/react-in-jsx-scope": "off", // React 17+ doesn't require React import in JSX files
    },
  },
];
