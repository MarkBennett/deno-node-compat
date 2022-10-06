```
       _            _            _             _                            _             _            _            _      
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
| Web APIs              | No   | ✅    |
| Sandbox / Permissions | No   | ✅    |
| TypeScript            | No   | ✅    |
| Linter                | No   | ✅    |
| Formatter             | No   | ✅    |
| npm / node_modules    | ✅    | No   |
| Bundler               | No   | No   |

- Partial support with .mjs files

---

# Why Care About Deno?

1. Fast and secure
2. Betting on Web APIs will pay off
3. Single executable with TS, linting, formatting, and testing

Learn more at [deno.land](https://deno.land/)

---

# Hurdles To Adoption

1. Most devs are happy with node
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

## Using packages from npm

Use `npm` packages is easy!

Just import packages using the `npm` schema and you're good to go! Never type
`npm install --save` again!

```ts
import ?? from "npm:<package-name>[@<version-requirement>]";
```

They are downloaded the first time you import them and cached across the system.

---

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

## Using the Node API

Node has a large api which provides access to the file system, network, and
more.

Though Deno uses Web APIs, since v1.15 a large portion of the Node APIS are
available in the Deno standard library.

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

## Creating apps

Use `deno run` with an
`npm:<package-name>[@<version-requirement>][/<binary-name>]` specifier to run a
Node package binary.

```bash
deno run -A --unstable npm:create-vite-extra
deno run -A --unstable npm:cowsay "Hello!"
deno run -A --unstable npm:cowsay@1.5.0/cowthink "What to eat?"
deno run -A --unstable npm:eslint your_file.js
```

This is basically the same as using `npx` in Node since nothing needs to be
downloaded or installed first.

---

## Problems you'll run into

---

## Problems you'll run into

### Missing types

Most packages on npm are missing TypeScript types. You can use the `@types` npm
packages to install third-party type definitions.

```ts
import express from "npm:express";
import type {
  Request,
  Response,
} from "https://esm.sh/@types/express/index.d.ts";
```

These definitions are not always complete, and you may need to add your own.
Pull requests are welcome!

https://github.com/DefinitelyTyped/DefinitelyTyped

---

## Problems you'll run into

### Missing NAPI for loading native modules

Some popular packages like `bcrypt` and `sharp` use native modules.

These aren't currently supported in Deno, but work is underway to add support
and the first version was
[merged into the main branch on OCt 5, 2022](https://github.com/denoland/deno/pull/13633).

I'm guessing this will be a headline feature in Deno v1.27.

---

## Problems you'll run into

### Packages expect `node_modules`

Some packages hard code `node_modules` into their source, and sometimes you want
to vendor packages for deploying to production.

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

Going forward to the team is already working the target and track the next Node
LTS release.

NPM and Node API polyfills are continuing to evolve and improve.

- https://github.com/denoland/deno_std/blob/main/node/README.md

You can report issues and broken packages on GitHub.

- https://github.com/denoland/deno/issues/15960
- https://github.com/denoland/deno/labels/node%20compat

---

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

## Getting started

You can also use `deno task` to run scripts defined in a `deno.json` file.

```bash
deno task slides
```

This works like the scripts defined in `package.json` in Node.

---

## Getting started

If you're using VS Code, it's also a good idea to install the official Deno
extension.

https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno

---

# See Also

- [Deno v1.2.5 Relase Notes](https://deno.com/blog/v1.25#experimental-npm-support)
- [Deno v1.2.6 Release Notes](https://deno.com/blog/v1.26#improvements-to-npm-support)

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
