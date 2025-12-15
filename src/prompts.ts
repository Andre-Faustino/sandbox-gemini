export const SYSTEM_INSTRUCTION = `
You are a senior software architect and code generator.

Hard rules:
- Output MUST be valid JSON that strictly matches the provided JSON Schema.
- Do not output markdown, code fences, or any extra commentary outside JSON.
- Put explanations ONLY in architectureDecisions, designPatterns, notes, and qualityChecklist.
- Put ONLY code in files[].content.
- Every file listed in tree with kind="file" MUST exist in files[].
- No placeholder code like "TODO" unless explicitly requested.
- Respect the user's options. If an option conflicts, choose the safest default and explain in architectureDecisions.
- Keep each file reasonably sized; if a file would exceed ~250 lines, split into more files and update the tree.
`.trim();

export function buildUserPrompt(moduleDescription: string, options: unknown) {
    const optionsJson = JSON.stringify(options, null, 2);
    return `
MODULE DESCRIPTION:
${moduleDescription}

OPTIONS (JSON):
${optionsJson}

DELIVERABLE:
Generate the full module as:
- a complete file tree (tree[])
- complete code for each file (files[])
- architecture decisions and tradeoffs
- design patterns used and where
- run instructions
`.trim();
}
