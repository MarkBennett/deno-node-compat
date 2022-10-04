// node-stdlib.ts
import { readFileSync } from "https://deno.land/std@0.158.0/node/fs.ts";
import { stdout } from "https://deno.land/std@0.158.0/node/process.ts";

const data = readFileSync("hello.txt", "utf8");

stdout.write(data);
