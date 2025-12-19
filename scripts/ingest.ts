import dotenv from "dotenv";
import fs from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import { createClient } from "@sanity/client";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
// 1. Using Local HuggingFace Embeddings (Free & Fast)
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

dotenv.config();

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-05-03",
});

async function downloadPdf(url: string, outputPath: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch PDF`);
  await pipeline(
    Readable.fromWeb(response.body as any),
    fs.createWriteStream(outputPath)
  );
}

async function run() {
  console.log("🚀 Starting Sanity ingestion...");

  const query = `*[_type == "profile"][0] {
    name,
    bio,
    "resumeUrl": resume.asset->url
  }`;

  const data = await sanity.fetch(query);
  if (!data) throw new Error("No profile found");

  const docs: Document[] = [];

  if (data.bio) {
    docs.push(new Document({
      pageContent: data.bio,
      metadata: { source: "sanity-bio" },
    }));
  }

  if (data.resumeUrl) {
    const pdfPath = "./resume.pdf";
    await downloadPdf(data.resumeUrl, pdfPath);
    const loader = new PDFLoader(pdfPath);
    const pdfDocs = await loader.load();
    // Add metadata so we can track source later
    pdfDocs.forEach(d => d.metadata.source = "sanity-resume");
    docs.push(...pdfDocs);
    fs.unlinkSync(pdfPath);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const chunks = await splitter.splitDocuments(docs);
  console.log(`🧩 Created ${chunks.length} chunks`);

  // 2. Initialize Embeddings
  // CRITICAL: This model outputs 384 Dimensions. Ensure Pinecone Index matches.
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
  });

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  // 3. Upload to Pinecone
  await PineconeStore.fromDocuments(chunks, embeddings, {
    pineconeIndex: index,
  });

  console.log("✅ Sanity data indexed successfully!");
}

run().catch(console.error);