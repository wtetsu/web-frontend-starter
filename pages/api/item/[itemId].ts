import type { NextApiRequest, NextApiResponse } from "next";
import { readItem } from "../../../lib/server/reader";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const itemId = parseInt(req.query.itemId as string);

  const content = await readItem(itemId);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(content));
};
