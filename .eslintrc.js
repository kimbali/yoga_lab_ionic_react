// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   'extends': [
//     'plugin:react/recommended',
//     'eslint:recommended'
//   ],
//   parserOptions: {
//     ecmaVersion: 2020
//   },
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//   }
// }

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,      // Enable browser globals (for Ionic apps)
    es2020: true         // Enable ES2020 features like optional chaining
  },
  parser: '@typescript-eslint/parser',  // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',  // For ES modules (import/export)
    project: './tsconfig.json'  // Path to TypeScript config
  },
  extends: [
    'eslint:recommended',                    // ESLint recommended rules
    'plugin:react/recommended',              // React-specific rules (only if you're using React)
    'plugin:@typescript-eslint/recommended', // TypeScript-specific rules
    'plugin:ionic/recommended'              // Ionic-specific rules (optional)
  ],
  plugins: [
    'react',                              // React plugin (if you're using React)
    '@typescript-eslint',                  // TypeScript plugin
    'ionic'                               // Ionic plugin (if you're using Ionic framework)
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Add or modify rules as needed, for example:
    '@typescript-eslint/no-explicit-any': 'off',  // Allow the use of 'any' type
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types on functions
    'react/prop-types': 'off',                    // Turn off React prop-types if you're using TypeScript (optional)
    'ionic/no-lifecycle-methods': 'warn',         // Example of an Ionic rule
  }
};
