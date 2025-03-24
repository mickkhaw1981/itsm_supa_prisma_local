module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  ignorePatterns: [
    "node_modules",
    ".next",
    "out",
    "dist",
    "build",
    "coverage",
    ".github",
    ".storybook",
    "**/*.stories.*",
    "*.d.ts",
  ],
  rules: {
    // Add any custom rules here
  },
};
