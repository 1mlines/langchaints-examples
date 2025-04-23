import { OpenAIEmbeddings } from "@langchain/openai"
import "dotenv/config"

const embeddingModel = new OpenAIEmbeddings()
const embeddings = await embeddingModel.embedDocuments([
  "안녕하세요!",
  "안녕!",
  "반갑습니다",
  "잘 지내셨나요? 오랜만에 연락드립니다",
  "잘가",
  "9시부터 수업 시작하니 Zoom에 입장해주세요",
])

// console.log(embeddings)
// console.log(`(${embeddings.length}, ${embeddings[5].length})`)

function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0)
  const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0))
  const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (norm1 * norm2)
}

const similarity = cosineSimilarity(embeddings[3], embeddings[5])
console.log("Cosine Similarity:", similarity)
