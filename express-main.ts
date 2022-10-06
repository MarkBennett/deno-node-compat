// express-main.ts
import express from "npm:express";
import type { Request, Response } from "npm:@types/express";

const app = express();

app.get("/", function (_req: Request, res: Response<string>) {
  res.send("Hello World");
});

app.listen(3000);
console.log("listening on http://localhost:3000/");
