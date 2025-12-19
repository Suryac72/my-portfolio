import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { PineconeEmbeddings } from "@langchain/pinecone";
import dotenv from "dotenv";

dotenv.config();

console.log("NODE_ENV:", process.env.NODE_ENV);
export function getEmbeddings() {
  // 🔴 PRODUCTION (Vercel / Netlify / Firebase)
  if (process.env.NODE_ENV === "production") {
    console.log("🔗 Using Pinecone hosted embeddings");

    return new PineconeEmbeddings({
      apiKey: process.env.PINECONE_API_KEY!,
      model: "multilingual-e5-large", // or text-embedding-3-small equivalent
    });
  }

  // 🟢 LOCAL DEVELOPMENT
  console.log("🧠 Using local HuggingFace embeddings");

  return new HuggingFaceTransformersEmbeddings({
    model: "Xenova/bge-large-en-v1.5",
  });
}
