import fs from "fs/promises";
import path from "path";

const loadMock = async () => {
  const directoryPath = path.resolve(
    __dirname,
    "../../../apps/react/dist/assets"
  );

  try {
    const files = await fs.readdir(directoryPath);

    // Filter files that start with 'index-' and end with '.js'
    const targetFiles = files.filter((file) => /^index-.*\.js$/.test(file));

    if (targetFiles.length === 0) {
      throw new Error("No target file found");
    }

    const targetFile = targetFiles[0];
    if (!targetFile) {
      throw new Error("No target file found in index 0");
    }
    const filePath = path.join(directoryPath, targetFile);
    return await fs.readFile(filePath, "utf8");
  } catch (err) {
    console.error("Error reading the directory or file", err);
    throw err; // Rethrow the error to handle it further up the call stack
  }
};

export const JS_MOCK = loadMock();
