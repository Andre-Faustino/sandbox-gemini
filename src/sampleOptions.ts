export const options = {
    language: "TypeScript",
    runtimeOrPlatform: "Node.js 20",
    architectureStyle: "hexagonal",
    allowedPatterns: ["Strategy", "Factory", "Dependency Injection", "Repository"],
    includeTests: true,
    testingFramework: "Jest",
    includeLintFormat: true,
    lintFormat: ["eslint", "prettier"],
    errorHandling: "typed-errors",
    asyncStyle: "async-await",
    constraints: [
        "no external database (in-memory ok)",
        "no web framework unless explicitly needed",
        "no placeholder code"
    ],
    outputDetailLevel: "high",
    namingConvention: "camelCase",
    moduleBoundary: "single-module"
} as const;
