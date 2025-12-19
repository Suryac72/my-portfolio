import type { NextApiRequest, NextApiResponse } from "next";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatGroq } from "@langchain/groq";
import { CHATBOT_PROMPT } from "@/utils/constants";
import { getEmbeddings } from "@/utils/embeddings";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX!);

    const vectorStore = await PineconeStore.fromExistingIndex(
      getEmbeddings(),
      { pineconeIndex: index }
    );

    const docs = await vectorStore.similaritySearch(message, 3);

    const context = docs.map(d => d.pageContent).join("\n\n");

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY!,
      model: process.env.GROQ_MODEL_NAME || "llama-3-8b-instant",
    });

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(CHATBOT_PROMPT),
      model,
      new StringOutputParser(),
    ]);

    const response = await chain.invoke({
      context,
      question: message,
    });

    res.status(200).json({
      text: response,
      sources: docs.map(d => d.metadata.source),
    });

  } catch (err) {
    console.error("❌ RAG Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
