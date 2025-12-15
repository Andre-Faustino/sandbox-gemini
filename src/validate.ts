import { ModuleOutputZod, type ModuleOutput } from "./schema.js";

export function validateModuleOutput(raw: unknown): ModuleOutput {
    const parsed = ModuleOutputZod.parse(raw);

    // Checagem extra: todo file do tree precisa existir em files[]
    const treeFiles = new Set(
        parsed.tree.filter((n) => n.kind === "file").map((n) => n.path)
    );
    const files = new Set(parsed.files.map((f) => f.path));

    const missing = [...treeFiles].filter((p) => !files.has(p));
    if (missing.length) {
        throw new Error(
            `Validation failed: missing files[] entries for tree file(s): ${missing.join(
                ", "
            )}`
        );
    }

    return parsed;
}
