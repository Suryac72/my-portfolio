import type { NextApiRequest, NextApiResponse } from "next";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CHATBOT_PROMPT } from "@/utils/constants";
import dotenv from "dotenv";
// 1. Import Groq & Transformers
import { ChatGroq } from "@langchain/groq";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

dotenv.config();
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const userQuery = req.body.message;
        if (!userQuery) {
            return res.status(400).json({ error: "Message is required" });
        }

        const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!,
        });

        const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

        // 2. Initialize Vector Store
        // MUST match 'ingest.ts' (Xenova/all-MiniLM-L6-v2) or search will fail.
        const vectorStore = await PineconeStore.fromExistingIndex(
            new HuggingFaceTransformersEmbeddings({
                model: "Xenova/all-MiniLM-L6-v2",
            }),
            { pineconeIndex }
        );

        // 3. Search
        const relevantDocs = await vectorStore.similaritySearch(userQuery, 3);

        const context = relevantDocs
            .map((doc, i) => `Source ${i + 1}:\n${doc.pageContent}`)
            .join("\n\n");

        // 4. Initialize Groq (Llama 3)
        const model = new ChatGroq({
            model: process.env.GROQ_MODEL_NAME || "llama-3-7b-chat",
            apiKey: process.env.GROQ_API_KEY
        });

        const prompt = PromptTemplate.fromTemplate(CHATBOT_PROMPT);

        const chain = RunnableSequence.from([
            prompt,
            model,
            new StringOutputParser(),
        ]);

        const answer = await chain.invoke({
            context,
            question: userQuery,
        });

        return res.status(200).json({
            text: answer,
            sources: relevantDocs.map((d) => d.pageContent.slice(0, 80) + "..."),
        });
    } catch (err) {
        console.error("❌ RAG Error:", err);
        return res.status(500).json({
            error: err instanceof Error ? err.message : "Internal Server Error",
        });
    }
}
