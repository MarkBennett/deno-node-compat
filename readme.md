```
      /\ \         /\ \         /\ \     _    /\ \          _              /\ \     _    /\ \         /\ \         /\ \    
     /  \ \____   /  \ \       /  \ \   /\_\ /  \ \        /\ \           /  \ \   /\_\ /  \ \       /  \ \____   /  \ \   
    / /\ \_____\ / /\ \ \     / /\ \ \_/ / // /\ \ \    ___\ \_\         / /\ \ \_/ / // /\ \ \     / /\ \_____\ / /\ \ \  
   / / /\/___  // / /\ \_\   / / /\ \___/ // / /\ \ \  /___/\/_/_       / / /\ \___/ // / /\ \ \   / / /\/___  // / /\ \_\ 
  / / /   / / // /_/_ \/_/  / / /  \/____// / /  \ \_\ \__ \/___/\     / / /  \/____// / /  \ \_\ / / /   / / // /_/_ \/_/ 
 / / /   / / // /____/\    / / /    / / // / /   / / /   /\/____\/    / / /    / / // / /   / / // / /   / / // /____/\    
/ / /   / / // /\____\/   / / /    / / // / /   / / /    \ \_\       / / /    / / // / /   / / // / /   / / // /\____\/    
\ \ \__/ / // / /______  / / /    / / // / /___/ / /      \/_/      / / /    / / // / /___/ / / \ \ \__/ / // / /______    
 \ \___\/ // / /_______\/ / /    / / // / /____\/ /                / / /    / / // / /____\/ /   \ \___\/ // / /_______\   
  \/_____/ \/__________/\/_/     \/_/ \/_________/                 \/_/     \/_/ \/_________/     \/_____/ \/__________/
```

---

# An Gentle Introduction to Using Node Packages in Deno

## By @MarkBennett

- Slides available at https://github.com/MarkBennett/deno-node-compat

---

# Comparing Nodejs and Deno

Deno is a new project from Ryan Dhal, the original author of Node.

|                       | Node | Deno |
| --------------------- | ---- | ---- |
| V8 engine             | ✅    | ✅    |
| ES Modules            | 🟨 *  | ✅    |
| Common.js             | ✅    | No   |
| Web APIs              | 🟨 *  | ✅    |
| Sandbox / Permissions | No   | ✅    |
| TypeScript            | No   | ✅    |
| Linter                | No   | ✅    |
| Formatter             | No   | ✅    |
| REPL                  | ✅    | ✅    |
| npm / node_modules    | ✅    | No   |
| Bundler               | No   | ✅    |

- Partial support with .mjs files
- Fetch, Web Crypto, and a growing list of other APIs

---

# Why Care About Deno?

1. Fast and secure
2. Betting on Web APIs will pay off
3. Single executable with TS, linting, formatting, and testing

Learn more at [deno.land](https://deno.land/)

---

# Hurdles To Adoption

1. Most devs know Node
2. Learning something new is hard
3. The node/npm ecosystem is much bigger than Deno's

Deno is addressing all of these, and really focused on developer experience.

---

# Hurdles To Adoption

Today going to focus on how Deno is overcoming the third of these, by making
Node and npm work seamlessly with Deno.

---

# Running Node code with Deno

---

# Running Node code with Deno

## Using packages from npm

Using `npm` packages is easy!

Just import packages using the `npm:` url schema and you're good to go!

Never type `npm install --save` again!

```ts
import ?? from "npm:<package-name>[@<version-requirement>]";
```

Packages are downloaded the first time you import them and cached across the
system.

---

# Running Node code with Deno

## Using packages from npm

```ts
// express-main.ts
import express from "npm:express";

const app = express();

app.get("/", function (_req: Request, res) {
  res.send("Hello World");
});

app.listen(3000);
console.log("listening on http://localhost:3000/");
```

---

# Running Node code with Deno

## Using the Node Standard Library

Node has a large Standard Library which provides access to the file system,
network, and more.

Though Deno uses Web APIs, since v1.15 a large portion of the Node Standard
Library is available in Deno.

You can access them by importing from the `node` module in the Deno standard
library.

```ts
// node-stdlib.ts
import { readFileSync } from "https://deno.land/std@0.158.0/node/fs.ts";
import { stdout } from "https://deno.land/std@0.158.0/node/process.ts";

const data = readFileSync("hello.txt", "utf8");

stdout.write(data);
```

When you import an `npm` package, Deno automatically polyfills the Node API for
you.

---

# Running Node code with Deno

## Running Node binaries

In Deno you run scripts from a url:

```bash
deno run main.ts
deno run https://deno.land/std/examples/welcome.ts
```

---

# Running Node code with Deno

## Running Node binaries

Use `deno run` with an
`npm:<package-name>[@<version-requirement>][/<binary-name>]` url to run a Node
package binary.

```bash
deno run -A --unstable npm:create-vite-extra
deno run -A --unstable npm:cowsay "Hello!"
deno run -A --unstable npm:cowsay@1.5.0/cowthink "What to eat?"
deno run -A --unstable npm:eslint your_file.js
```

This is basically the same as using `npx` in Node since nothing needs to be
downloaded or installed first.

- NOTE: We need to add permissions `-A` and the `--unstable` flag to run these
  scripts.

---

# Running Node code with Deno

## Replacing Node scripts

You can also use `deno task` to run scripts defined in a `deno.jsonc` file.

```json
// deno.jsonc
{
  "tasks": {
    "fmt": "deno fmt",
    "lint": "deno lint",
    "test": "deno test -A",
    "slides": "slides readme.md"
  }
}
```

Start the slides with:

```bash
deno task slides
```

This works like the scripts defined in `package.json` in Node.

---

# Running Node code with Deno

## Using Import Maps to port Node source code

When using imports with webpack and node, you can import packages using "bare"
specifier (ie "react" or "lodash") and the bundler will resolve the package to
the correct file.

```ts
// my-node-code.js
import React from "react";
import { map } from "lodash";
```

Deno doesn't have this feature, but you can use import maps to get the same
behavior. They're a standard feature of the browser, which Deno now supports
too.

```json
// import-map.json
{
  "imports": {
    "react": "https://cdn.skypack.dev/react",
    "react-dom": "https://cdn.skypack.dev/react-dom"
  }
}
```

Then just tell Deno about your import map when you run your code:

```bash
deno run --import-map ./import_map.json my-node-code.js
```

---

# Problems You May Run Into

---

# Problems You May Run Into

## Missing types

Most packages on npm are missing TypeScript types. This isn't specific to Deno,
and you've likely running into it whenever you've used TypeScript with Node.

You can use the `@types` npm packages to install third-party type definitions.

```ts
// express-main.ts
import express from "npm:express";
import type { Request, Response } from "npm:@types/express";
```

These definitions are not always complete, and you may need to add your own.
Pull requests are welcome!

https://github.com/DefinitelyTyped/DefinitelyTyped

---

# Problems You May Run Into

## Missing NAPI for loading native modules

Some popular packages like `bcrypt` and `sharp` use native Node modules. These
let them access C libraries and perform operations that are not possible or
optimized in JavaScript.

These aren't currently supported in Deno, but work is underway to add support
and the first version was
[merged into the main branch on Oct 5, 2022](https://github.com/denoland/deno/pull/13633).

I'm guessing this will be a headline feature in Deno v1.27.

---

# Problems You May Run Into

## Incomplete Node Standard Library polyfills

Though Deno has a large portion of the Node Standard Library available, it's not
complete and work is on-going to add more.

You can track progress on GitHub:

- https://github.com/denoland/deno/issues/15960
- https://github.com/denoland/deno/labels/node%20compat

And there's a list of missing APIs in the Deno docs:

- https://github.com/denoland/deno_std/blob/main/node/README.md

They're always open to receiving new issues and pull requests!

---

# Problems You May Run Into

## Packages expect `node_modules`

Some packages hard code `node_modules` into their source (bad!) and won't work
without it.

Deno supports this using the `--node-modules-dir` flag.

```ts
// chalk.ts
// this will break without node_modules
import chalk from "npm:chalk@5";

console.log(chalk.green("Hello"));
```

Can be run with:

```bash
deno run --unstable --node-modules-dir chalk.ts
```

---

# What's Next

## Improving Node compatibility

Going forward to the team is already tracking the next Node LTS release. and
working to get it's specs passing in Deno.

This is the tracking issue on GitHub:

- https://github.com/denoland/deno/issues/15960

---

# What's Next

## Ultimate goal: Deno as a Node replacement

To get there the Deno team knows they need to have a graceful on-ramp for
existing Node developers, and have committed to making it as easy as possible.

Even if Deno doesn't become the next Node, simply pushing Node to better support
standards and improve the developer experience is a win for everyone.

---

# What's Next

## Getting started

Before you begin, make sure you have Deno installed. You can install it on Mac
and Linux with the following command:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Or with PowerShell on Windows:

```powershell
irm https://deno.land/install.ps1 | iex
```

See https://deno.land/#installation for more detials.

---

# What's Next

## Getting started

Quickly initialize a new project:

```bash
deno init hello-node
```

This will setup linting, formatting, and testing for your project.

```bash
deno run --watch main.ts
deno lint
deno test
deno fmt
```

---

# What's Next

## Getting started

If you're using VS Code, it's also a good idea to install the official Deno
extension.

https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno

---

# See Also

- [Deno v1.2.5 Relase Notes](https://deno.com/blog/v1.25#experimental-npm-support)
- [Deno v1.2.6 Release Notes](https://deno.com/blog/v1.26#improvements-to-npm-support)
- [Interoperating with Node and NPM in the Deno Manual](https://deno.land/manual@v1.26.0/node)

---

# Thank-you

- [Deno](https://deno.land/)
- [Deno Blog](https://deno.com/blog)
- [Node](https://nodejs.org/en/)
- [Deno Deploy](https://deno.com/deploy)
- [patorjk.ck - ASCII ART](https://patorjk.com/software/taag/#p=display&f=Impossible&t=Deno%20%2B%20Node)

---

```
         _       _                  _           _          _          _          _            _             _            _           
        /\ \    /\_\               /\ \        / /\       /\ \       /\ \       /\ \         /\ \     _    / /\         / /\         
       /  \ \  / / /         _    /  \ \      / /  \      \_\ \      \ \ \     /  \ \       /  \ \   /\_\ / /  \       / /  \        
      / /\ \ \ \ \ \__      /\_\ / /\ \ \    / / /\ \__   /\__ \     /\ \_\   / /\ \ \     / /\ \ \_/ / // / /\ \__   / / /\ \___    
     / / /\ \ \ \ \___\    / / // / /\ \_\  / / /\ \___\ / /_ \ \   / /\/_/  / / /\ \ \   / / /\ \___/ // / /\ \___\ / / /\ \__  /\  
    / / /  \ \_\ \__  /   / / // /_/_ \/_/  \ \ \ \/___// / /\ \ \ / / /    / / /  \ \_\ / / /  \/____/ \ \ \ \/___//_/ /  \__/ / /  
   / / / _ / / / / / /   / / // /____/\      \ \ \     / / /  \/_// / /    / / /   / / // / /    / / /   \ \ \      \ \ \    /_/ /   
  / / / /\ \/ / / / /   / / // /\____\/  _    \ \ \   / / /      / / /    / / /   / / // / /    / / /_    \ \ \      \_\/    \ \ \   
 / / /__\ \ \/ / / /___/ / // / /______ /_/\__/ / /  / / /   ___/ / /__  / / /___/ / // / /    / / //_/\__/ / /               \_\/_  
/ / /____\ \ \/ / /____\/ // / /_______\\ \/___/ /  /_/ /   /\__\/_/___\/ / /____\/ // / /    / / / \ \/___/ /                  /_/\ 
\/________\_\/\/_________/ \/__________/ \_____\/   \_\/    \/_________/\/_________/ \/_/     \/_/   \_____\/                   \_\/
```
