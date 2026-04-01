import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// 🤖 GEMINI
// =====================
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

// =====================
// 🧰 TOOL REGISTRY
// =====================
type Tool = {
  name: string;
  description: string;
  execute: (input?: any) => any;
};

const tools: Record<string, Tool> = {
  sum: {
    name: "sum",
    description: "Sum two numbers (a + b)",
    execute: ({ a, b }) => a + b
  },
  multiply: {
    name: "multiply",
    description: "Multiply two numbers (a * b)",
    execute: ({ a, b }) => a * b
  },
  getCurrentDate: {
    name: "getCurrentDate",
    description: "Get current ISO date",
    execute: () => new Date().toISOString()
  }
};

// =====================
// 🧠 MEMORY
// =====================
type MemoryItem = {
  role: "user" | "agent";
  content: string;
};

let memory: MemoryItem[] = [];

function buildMemoryContext(memory: MemoryItem[]) {
  return memory
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");
}

// =====================
// 🔐 SAFE PARSE
// =====================
function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid JSON");
  }
}

// =====================
// 🤖 GEMINI CALL
// =====================
async function askGemini(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// =====================
// 🌐 STREAMING AGENT
// =====================
app.post("/agent-stream", async (req: Request, res: Response) => {
  const { task } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  function send(data: any) {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  const toolsDescription = Object.values(tools)
    .map(t => `- ${t.name}: ${t.description}`)
    .join("\n");

  let context = `Task: ${task}`;
  let lastResult = "";

  const memoryContext = buildMemoryContext(memory);

  for (let i = 0; i < 5; i++) {
    const decision = await askGemini(`
You are an autonomous AI agent.

Available tools:
${toolsDescription}

Rules:
- Respond ONLY in JSON
- No text outside JSON

Formats:

Tool:
{
  "action": "tool_name",
  "input": {}
}

Continue:
{
  "action": "continue",
  "thought": "reasoning"
}

Final:
{
  "action": "final",
  "output": "answer"
}

Memory:
${memoryContext}

Context:
${context}

Last result:
${lastResult}
`);

    send({ type: "raw", value: decision });

    let parsed: any;

    try {
      parsed = safeParse(decision);
    } catch {
      send({ type: "error", value: decision });
      return res.end();
    }

    // 🧠 CONTINUE
    if (parsed.action === "continue") {
      send({ type: "thought", value: parsed.thought });

      context += `\nThought: ${parsed.thought}`;
      continue;
    }

    // 🧰 TOOL EXECUTION
    if (tools[parsed.action]) {
      const result = tools[parsed.action].execute(parsed.input);

      send({
        type: "tool",
        value: `${parsed.action} → ${result}`
      });

      lastResult = String(result);
      context += `\nUsed ${parsed.action} → ${result}`;

      continue;
    }

    // ✅ FINAL
    if (parsed.action === "final") {
      send({ type: "final", value: parsed.output });

      memory.push({ role: "user", content: task });
      memory.push({ role: "agent", content: parsed.output });

      if (memory.length > 20) {
        memory = memory.slice(-20);
      }

      return res.end();
    }
  }

  send({ type: "final", value: "Max iterations reached" });
  res.end();
});

// =====================
// 🚀 START
// =====================
app.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});