import type { NextApiRequest, NextApiResponse } from "next";
import { readUser } from "../../../lib/server/reader";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string);

  const content = await readUser(userId);
  if (!content) {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(content));
};
