// src/hooks/useAgentStream.ts

import { useState } from "react";
import { streamAgent } from "../services/agentStream";
import type { ResultDataProps } from "../pages/Result/diagnosis";

export function useAgentStream() {
  const [loading, setLoading] = useState(false);

  async function execute(
    code: string,
    language: string,
    userLanguage: string,
    onChunk: (data: ResultDataProps) => void
  ) {
    setLoading(true);

    try {
      await streamAgent({ code, language, userLanguage }, onChunk);
    } finally {
      setLoading(false);
    }
  }

  return { execute, loading };
}