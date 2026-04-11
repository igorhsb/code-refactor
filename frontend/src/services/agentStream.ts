// src/services/agentStream.ts

import type { ResultDataProps } from "../pages/Result/diagnosis";

export async function streamAgent(
  payload: { code: string; language: string, userLanguage: string },
  onChunk: (data: ResultDataProps) => void
) {
  const res = await fetch("http://localhost:3001/agent-stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();

    if (done) break;

    const chunk = decoder.decode(value);
    const json = JSON.parse(
      chunk.replace("data: ", "")
    ) as ResultDataProps;

    onChunk(json);
  }
}