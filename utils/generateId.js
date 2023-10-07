import { customAlphabet } from "nanoid";
const idf = customAlphabet('0123456789', 13)
const generateId = idf()

export default generateId