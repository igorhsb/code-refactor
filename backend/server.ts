import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid JSON");
  }
}

async function askGemini(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

app.post("/agent-stream", async (req: Request, res: Response) => {
  const { code, language } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  function send(data: any) {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  let lastResult = "";

  const promptText = `
    Act as a Senior Tech Lead performing a professional code review and refactor.

    Analyze and refactor the code in ${language} below focusing on high-quality software engineering practices.

    Mandatory criteria:
    - Clean Code and readability
    - Consistency and style standardization
    - Separation of concerns
    - Low coupling and high cohesion
    - Clarity of intent (naming and abstractions)
    - Maintainability and scalability
    - Testability
    - Avoid unnecessary complexity
    - Performance (when applicable)

    Rules:
    - DO NOT change the original behavior
    - Keep the solution simple and pragmatic
    - Avoid overengineering
    - Use modern best practices of the language/framework

    Output format (STRICT JSON):
    {
      "diagnosis": [
        {
          "issue": "string",
          "impact": "low | medium | high",
          "explanation": "string"
        }
      ],
      "refactored_code": "string",
      "improvements": [
        {
          "title": "string",
          "description": "string",
          "related_criteria": ["string"]
        }
      ],
      "future_suggestions": [
        {
          "title": "string",
          "description": "string"
        }
      ]
    }

    Guidelines:
    - "diagnosis" should be objective and concise
    - "refactored_code" must be complete and ready to use
    - "improvements" must clearly map to the criteria
    - "future_suggestions" should be optional but valuable
    - Always return valid JSON (no comments, no extra text)

    Code: ${code}
    `;

  // const decision = await askGemini(promptText);
  const example = {
    diagnosis: [
      {
        issue: "Lack of proper formatting and spacing",
        impact: "low",
        explanation:
          "The code is not properly formatted, making it harder to read and inconsistent with common style guides.",
      },
      {
        issue: "Non-descriptive function and parameter naming",
        impact: "medium",
        explanation:
          "The function name 'sum' and parameters 'a' and 'b' are too generic and do not clearly express intent.",
      },
      {
        issue: "Missing type safety",
        impact: "medium",
        explanation:
          "The function does not enforce types, which may lead to unexpected behavior in a TypeScript environment.",
      },
    ],
    refactored_code:
      "function sumNumbers(a: number, b: number): number {\n  return a + b;\n}",
    improvements: [
      {
        title: "Improved readability and formatting",
        description:
          "Applied proper indentation and spacing to make the code easier to read.",
        related_criteria: ["Clean Code", "Consistency"],
      },
      {
        title: "Clearer naming",
        description:
          "Renamed function and parameters to better reflect their purpose.",
        related_criteria: ["Clarity of intent", "Maintainability"],
      },
      {
        title: "Added type safety",
        description:
          "Introduced TypeScript types to prevent incorrect usage and improve reliability.",
        related_criteria: ["Testability", "Maintainability"],
      },
    ],
    future_suggestions: [
      {
        title: "Add unit tests",
        description:
          "Create tests to validate behavior with different inputs, including edge cases.",
      },
      {
        title: "Handle invalid inputs",
        description:
          "Consider validating inputs if this function is exposed to external data.",
      },
    ],
  };

  send(example);
  res.end();

  //   let parsed: any;

  //   try {
  //     parsed = safeParse(decision);
  //   } catch {
  //     send({ type: "error", value: decision });
  //     return res.end();
  //   }

  //   // 🧠 CONTINUE
  //   if (parsed.action === "continue") {
  //     send({ type: "thought", value: parsed.thought });

  //     context += `\nThought: ${parsed.thought}`;
  //     continue;
  //   }

  //   // 🧰 TOOL EXECUTION
  //   if (tools[parsed.action]) {
  //     const result = tools[parsed.action].execute(parsed.input);

  //     send({
  //       type: "tool",
  //       value: `${parsed.action} → ${result}`
  //     });

  //     lastResult = String(result);
  //     context += `\nUsed ${parsed.action} → ${result}`;

  //     continue;
  //   }

  //   // ✅ FINAL
  //   if (parsed.action === "final") {
  //     send({ type: "final", value: parsed.output });

  //     memory.push({ role: "user", content: task });
  //     memory.push({ role: "agent", content: parsed.output });

  //     if (memory.length > 20) {
  //       memory = memory.slice(-20);
  //     }

  //     return res.end();
  //   }
  // }

  // send({ type: "final", value: "Max iterations reached" });
});

// =====================
// 🚀 START
// =====================
app.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
