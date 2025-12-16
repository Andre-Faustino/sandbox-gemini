export const unityOptions = {
    language: "C#",
    version: "9.0",
    runtimeOrPlatform: "Unity 6.2 LTS",
    dotNetVersion: ".NET Standard 2.1",
    architectureStyle: "component-based",
    allowedPatterns: {
        maxWeight: 10,
        patterns: [
            {name: "Strategy", weight: 8},
            {name: "Observer", weight: 9},
            {name: "State Machine", weight: 7},
            {name: "Object Pooling", weight: 10},
            {name: "Service Locator", weight: 6},
            {name: "Command", weight: 7},
            {name: "Factory", weight: 8},
            {name: "Singleton", weight: 5}
        ]
    },
    includeTests: true,
    testingFramework: "Unity Test Framework",
/*    includeLintFormat: true,
    lintFormat: ["EditorConfig", "Roslyn Analyzers"],*/
    errorHandling: "try-catch-log",
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
    //moduleBoundary: "assembly-definition",
    folderStructure: {
        scripts: "Scripts",
        core: "Scripts/Core",
        events: "Scripts/Events",
        api: "Scripts/Api",
        persistence: "Scripts/Persistence",
        tests: "Tests"
    },
    modules: ["Core", "Events", "Api", "Persistence"],
    interfaces: ["Item", "Inventory", "Event", "Crafting", "Persistence"],
    defaultInterfaceImplementations: true
} as const;

export const unitySemanticInstruction = `
SEMANTIC INSTRUCTIONS:
- Interfaces: Use all described interfaces to define contracts between components
- Interfaces: adding I prefix to interface names,
- Interfaces: lives on api folder.
- Interfaces: If defaultInterfaceImplementations is true, the interfaces will have default implementations.
- Modules: All modules must be created.
- Modules: Modules must be created in the folder structure.
- Use the name of the feature as base folder name.
`
