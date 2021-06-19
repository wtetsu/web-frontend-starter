import type { NextApiRequest, NextApiResponse } from "next";
import { readCompanies } from "../../lib/server/reader";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sourceContent = await readCompanies();
  if (!sourceContent) {
    res.statusCode = 404;
    res.end();
    return;
  }

  let resultContent: any[];
  const q = req.query.q;
  if (q) {
    resultContent = sourceContent.filter((r) => r.name?.includes(q) || r.city?.includes(q) || r.slogan?.includes(q));
  } else {
    resultContent = sourceContent;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(resultContent));
};
