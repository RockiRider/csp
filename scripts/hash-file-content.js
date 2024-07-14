const fs = require("fs");
const crypto = require("crypto");
const process = require("process");

const generateHashFromFile = (filePath, algorithm = "sha256") => {
  try {
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    const hash = crypto.createHash(algorithm);
    hash.update(fileContent);
    return hash.digest("base64");
  } catch (error) {
    console.error(`Error reading or hashing file: ${error.message}`);
    process.exit(1);
  }
};

// Check if a file path is provided
if (process.argv.length < 3) {
  console.log("Usage: node hash-file-content.js <file_path>");
  process.exit(1);
}

const filePath = process.argv[2];
const hashResult = generateHashFromFile(filePath);
console.log(`Hash for '${filePath}': ${hashResult}`);
