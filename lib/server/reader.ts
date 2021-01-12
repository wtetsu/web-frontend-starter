import fs from "fs";

const readUser = async (id: number) => {
  if (!Number.isFinite(id)) {
    throw new Error(`Invalid id: ${id}`);
  }

  const fileName = `data/user/${id}.json`;
  const content = await fs.promises.readFile(fileName);

  return JSON.parse(content.toString());
};

const readItem = async (id: number) => {
  if (!Number.isFinite(id)) {
    throw new Error(`Invalid id: ${id}`);
  }

  const fileName = `data/item/${id}.json`;
  const content = await fs.promises.readFile(fileName);

  return JSON.parse(content.toString());
};

export { readUser, readItem };
