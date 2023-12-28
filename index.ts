import { ChatOllama } from "langchain/chat_models/ollama";
import { StringOutputParser } from "langchain/schema/output_parser";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { FaissStore } from "langchain/vectorstores/faiss";

const loader = new PDFLoader("memo.pdf", {
  splitPages: true,
});

const docs = await loader.load();

const embedder = new OllamaEmbeddings({
  model: "mistral",
  baseUrl: "http://localhost:11434",
});

const embeddings = await embedder.embedDocuments(
  docs.map((d) => d.pageContent)
);


