import type { NextApiRequest, NextApiResponse } from "next";
import { readJsonFile, fetchById } from "../../../lib/server/reader";

let books = null;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (books === null) {
    books = await readJsonFile("data/books/all.json");
  }

  const bookId = req.query.bookId as string;

  if (req.method === "GET") {
    return fetch(bookId, res);
  }
  if (req.method === "PUT") {
    const requestPayload = JSON.parse(req.body);
    return update(bookId, requestPayload, res);
  }
  throw new Error();
};

const fetch = (bookId: string, res: NextApiResponse) => {
  const book = books[bookId];
  if (!book) {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(book));
};

const update = (bookId: string, requestPayload: Record<string, any>, res: NextApiResponse) => {
  const book = books[bookId];
  if (!book) {
    res.statusCode = 404;
    res.end();
    return;
  }

  const fields = ["name", "price", "category"];

  for (const key of fields) {
    const newValue = requestPayload[key];
    book[key] = newValue;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end();
};
