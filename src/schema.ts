import { z } from "zod";
import { Type, type Schema } from "@google/genai";

/** JSON Schema (Structured Outputs) */
export const moduleOutputSchema: Schema = {
    type: Type.OBJECT,
    required: [
        "moduleName",
        "oneLineSummary",
        "stack",
        "inputsEcho",
        "tree",
        "files",
        "architectureDecisions",
        "designPatterns",
        "runbook",
        "qualityChecklist"
    ],
    properties: {
        moduleName: { type: Type.STRING },
        oneLineSummary: { type: Type.STRING },

        stack: {
            type: Type.OBJECT,
            required: ["language", "runtimeOrPlatform", "frameworks"],
            properties: {
                language: { type: Type.STRING },
                runtimeOrPlatform: { type: Type.STRING },
                frameworks: { type: Type.ARRAY, items: { type: Type.STRING } },
                testingFramework: { type: Type.STRING },
                lintFormat: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },

        inputsEcho: {
            type: Type.OBJECT,
            required: ["moduleDescription", "options"],
            properties: {
                moduleDescription: { type: Type.STRING },
                options: { type: Type.STRING  }
            }
        },

        architectureDecisions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["decision", "why"],
                properties: {
                    decision: { type: Type.STRING },
                    why: { type: Type.STRING },
                    tradeoffs: { type: Type.ARRAY, items: { type: Type.STRING } },
                    alternativesConsidered: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        },

        designPatterns: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["pattern", "intent", "whereUsed", "whyChosen"],
                properties: {
                    pattern: { type: Type.STRING },
                    intent: { type: Type.STRING },
                    whereUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
                    whyChosen: { type: Type.STRING }
                }
            }
        },

        tree: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["path", "kind", "purpose"],
                properties: {
                    path: { type: Type.STRING },
                    kind: { type: Type.STRING, enum: ["dir", "file"] },
                    purpose: { type: Type.STRING }
                }
            }
        },

        files: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["path", "content", "language", "role"],
                properties: {
                    path: { type: Type.STRING },
                    language: { type: Type.STRING },
                    role: { type: Type.STRING },
                    content: { type: Type.STRING }
                }
            }
        },

        runbook: {
            type: Type.OBJECT,
            required: ["howToRun", "commands"],
            properties: {
                howToRun: { type: Type.ARRAY, items: { type: Type.STRING } },
                commands: { type: Type.ARRAY, items: { type: Type.STRING } },
                envVars: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        required: ["name", "description"],
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            example: { type: Type.STRING }
                        }
                    }
                }
            }
        },

        qualityChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
        notes: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
};

/** Zod schema (validação local) */
export const ModuleOutputZod = z.object({
    moduleName: z.string(),
    oneLineSummary: z.string(),
    stack: z.object({
        language: z.string(),
        runtimeOrPlatform: z.string(),
        frameworks: z.array(z.string()),
        testingFramework: z.string().optional(),
        lintFormat: z.array(z.string()).optional()
    }),
    inputsEcho: z.object({
        moduleDescription: z.string(),
        options: z.union([z.string(), z.record(z.any())])
    }),
    architectureDecisions: z.array(
        z.object({
            decision: z.string(),
            why: z.string(),
            tradeoffs: z.array(z.string()).optional(),
            alternativesConsidered: z.array(z.string()).optional()
        })
    ),
    designPatterns: z.array(
        z.object({
            pattern: z.string(),
            intent: z.string(),
            whereUsed: z.array(z.string()),
            whyChosen: z.string()
        })
    ),
    tree: z.array(
        z.object({
            path: z.string(),
            kind: z.enum(["dir", "file"]),
            purpose: z.string()
        })
    ),
    files: z.array(
        z.object({
            path: z.string(),
            language: z.string(),
            role: z.string(),
            content: z.string()
        })
    ),
    runbook: z.object({
        howToRun: z.array(z.string()),
        commands: z.array(z.string()),
        envVars: z
            .array(
                z.object({
                    name: z.string(),
                    description: z.string(),
                    example: z.string().optional()
                })
            )
            .optional()
    }),
    qualityChecklist: z.array(z.string()),
    notes: z.array(z.string()).optional()
});

export type ModuleOutput = z.infer<typeof ModuleOutputZod>;
