import { fileURLToPath } from "url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url))

export {
  __dirname
}