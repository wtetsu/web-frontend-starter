import fs from "fs";
import path from "path";

const readJsonFile = async (fileRelativePath: string): Promise<Record<string, any>> => {
  const filePath = path.resolve("./public", fileRelativePath);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = await fs.promises.readFile(filePath);
  return JSON.parse(content.toString());
};

const readUser = async (id: number) => {
  if (!Number.isFinite(id)) {
    throw new Error(`Invalid id: ${id}`);
  }
  return readJsonFile(`data/user/${id}.json`);
};

const readItem = async (id: number) => {
  if (!Number.isFinite(id)) {
    throw new Error(`Invalid id: ${id}`);
  }
  return readJsonFile(`data/item/${id}.json`);
};

export { readUser, readItem };
