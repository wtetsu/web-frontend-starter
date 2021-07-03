import fs from "fs";
import path from "path";

const readJsonFile = async (fileRelativePath: string): Promise<any> => {
  const filePath = path.resolve("./public", fileRelativePath);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = await fs.promises.readFile(filePath);
  return JSON.parse(content.toString());
};

const fetchById = async (dataName: string, id: number) => {
  if (!Number.isFinite(id)) {
    throw new Error(`Invalid id: ${id}`);
  }
  return readJsonFile(`data/${dataName}/${id}.json`) as Promise<Record<string, any>>;
};

const fetchAll = async (dataName: string) => {
  return readJsonFile(`data/${dataName}/all.json`) as Promise<any[]>;
};

export { readJsonFile, fetchById, fetchAll };
