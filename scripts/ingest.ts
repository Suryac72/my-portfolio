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
import { getEmbeddings } from '../utils/embeddings';

dotenv.config();

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  useCdn: false,
});

async function downloadPdf(url: string, outputPath: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch PDF");
  await pipeline(
    Readable.fromWeb(response.body as any),
    fs.createWriteStream(outputPath)
  );
}

async function run() {
  console.log("🚀 Starting ingestion");

  const data = await sanity.fetch(`
    *[_type == "profile"][0] {
      bio,
      "resumeUrl": resume.asset->url
    }
  `);

  if (!data) throw new Error("No data found");

  const docs: Document[] = [];

  if (data.bio) {
    docs.push(new Document({
      pageContent: data.bio,
      metadata: { source: "bio" },
    }));
  }

  if (data.resumeUrl) {
    const path = "./resume.pdf";
    await downloadPdf(data.resumeUrl, path);
    const loader = new PDFLoader(path);
    const pdfDocs = await loader.load();
    pdfDocs.forEach(d => d.metadata.source = "resume");
    docs.push(...pdfDocs);
    fs.unlinkSync(path);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const chunks = await splitter.splitDocuments(docs);

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  await PineconeStore.fromDocuments(
    chunks,
    getEmbeddings(),
    { pineconeIndex: index }
  );

  console.log("✅ Ingestion complete");
}

run().catch(console.error);
