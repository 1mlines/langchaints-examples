import { TextLoader } from "langchain/document_loaders/fs/text"
import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
} from "langchain/text_splitter"

const loader = new TextLoader("05-vectorstore/data/langchain-intro.txt")
const docs = await loader.load()

// Length-based
// const textSplitter = new CharacterTextSplitter({
//   separator: "\n",
//   chunkSize: 1000,
//   chunkOverlap: 0,
// })

// Text-structured based
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 10,
})

const splits = await textSplitter.splitDocuments(docs)
console.log(splits)
