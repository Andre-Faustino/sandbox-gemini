import dotenv from "dotenv";
import {readFile, mkdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {GoogleGenAI} from "@google/genai";

import {moduleOutputSchema} from "./schema.js";
import {buildUserPrompt, buildSystemInstruction} from "./prompts.js";
import {validateModuleOutput} from "./validate.js";
import {unityOptions, unitySemanticInstruction} from "./sampleOptions"

dotenv.config({path: ".env.local"});

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error("Missing GEMINI_API_KEY in env");

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

async function main() {
    const moduleDescription = await readFile(
        path.join("src", "sampleModule.txt"),
        "utf-8"
    );

    const client = new GoogleGenAI({apiKey: API_KEY});
    const userPrompt = buildUserPrompt(moduleDescription);
    const systemInstruction = buildSystemInstruction(unityOptions, unitySemanticInstruction);

    const resp = await client.models.generateContent({
        model: MODEL,
        contents: [{role: "user", parts: [{text: userPrompt}]}],
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: moduleOutputSchema
        }
    });

    // A resposta geralmente vem como texto JSON num part
    const text = resp.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        console.error("No text content returned.");
        console.error("model:", MODEL);
        console.error("candidates:", resp?.candidates?.length ?? 0);

        const part0 = resp?.candidates?.[0]?.content?.parts?.[0];
        console.error("firstPart keys:", part0 ? Object.keys(part0) : "none");
        console.error("raw text (if any):", part0 && "text" in part0 ? (part0 as any).text : "none");

        process.exit(1);
    }


    let json: unknown;
    try {
        json = JSON.parse(text);
    } catch (e) {
        console.error("Failed to parse JSON text:\n", text);
        throw e;
    }

    const validated = validateModuleOutput(json);

    // imprime tree de forma bonita
    console.log("\n=== Module ===");
    console.log(validated.moduleName);
    console.log(validated.oneLineSummary);

    console.log("\n=== Tree ===");
    for (const node of validated.tree) {
        console.log(`${node.kind.padEnd(4)}  ${node.path}  — ${node.purpose}`);
    }

    // salva output completo
    await mkdir("out", {recursive: true});
    await writeFile("out/result.json", JSON.stringify(validated, null, 2), "utf-8");
    console.log("\nSaved: out/result.json");

    // (opcional) materializa os arquivos gerados em out/generated
    await materializeFiles(validated);
    console.log("Saved files under: out/generated/");
}

async function materializeFiles(validated: ReturnType<typeof validateModuleOutput>) {
    const base = path.join("out", "generated");
    await mkdir(base, {recursive: true});

    for (const f of validated.files) {
        const fullPath = path.join(base, f.path);
        await mkdir(path.dirname(fullPath), {recursive: true});
        await writeFile(fullPath, f.content, "utf-8");
    }
}

main().catch((err: any) => {
    const msg = err?.message ? String(err.message) : String(err);
    const stack = err?.stack ? String(err.stack) : "";

    // NÃO passe "err" como objeto pro console.error
    console.error(msg);
    if (stack) console.error(stack);

    // tenta extrair payload do SDK sem imprimir objeto cru
    try {
        const raw = (err && typeof err === "object")
            ? {
                name: err.name,
                message: err.message,
                status: err.status,
                code: err.code,
                // alguns SDKs colocam detalhes aqui:
                details: err.details,
                error: err.error
            }
            : null;

        if (raw) console.error(JSON.stringify(raw, null, 2));
    } catch {
    }

    process.exit(1);
});
