// express-main.ts
import express from "npm:express";
import type {
  Request,
  Response,
} from "https://esm.sh/@types/express/index.d.ts";

const app = express();

app.get("/", function (_req: Request, res: Response<string>) {
  res.send("Hello World");
});

app.listen(3000);
console.log("listening on http://localhost:3000/");
