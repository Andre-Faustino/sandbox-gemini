export const typescriptOptions = {
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

export const unityOptions = {
    language: "C#",
    version: "9.0",
    runtimeOrPlatform: "Unity 6.2 LTS",
    dotNetVersion: ".NET Standard 2.1",
    architectureStyle: "component-based",
    allowedPatterns: ["Observer", "State Machine", "Object Pooling", "Service Locator", "Command", "Factory", "Singleton"],
    includeTests: true,
    testingFramework: "Unity Test Framework",
    includeLintFormat: true,
    lintFormat: ["EditorConfig", "Roslyn Analyzers"],
    errorHandling: "try-catch-log",
    asyncStyle: "async-await",
    unitySpecific: {
        useScriptableObjects: true,
        useNewInputSystem: true,
        useAddressables: false,
        useURP: true,
        useDOTS: false,
        serializationStrategy: "Unity Serialization"
    },
    constraints: [
        "must work in Unity Editor and build",
        "no third-party plugins unless explicitly needed",
        "follow Unity best practices",
        "no placeholder code",
        "optimize for mobile if applicable"
    ],
    outputDetailLevel: "high",
    namingConvention: {
        classes: "PascalCase",
        methods: "PascalCase",
        fields: "camelCase with _ prefix for private",
        properties: "PascalCase",
        monoBehaviours: "PascalCase with descriptive names"
    },
    moduleBoundary: "assembly-definition",
   /* folderStructure: {
        scripts: "Assets/Scripts",
        prefabs: "Assets/Prefabs",
        scenes: "Assets/Scenes",
        resources: "Assets/Resources",
        materials: "Assets/Materials",
        tests: "Assets/Tests"
    }*/
} as const;
