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

# Comparing Nodejs and Deno

- Node is a JavaScript runtime built on Chrome's V8 JavaScript engine. Same for
  Deno!
- Node = Common.js + E5 modules, Deno = ES modules
- Node has npm and node_modules, Deno has imports and imports_map (like the
  browser)
- Node has a custom API, Deno uses browser APIs whenever available
- Node gives your app full system access, Deno gives you a sandbox and only what
  you need

# Running Node code with Deno

## Getting started

Before you begin, make sure you have Deno installed. You can install it on Mac and Linux with the
following command:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Or with PowerShell on Windows:

```powershell
irm https://deno.land/install.ps1 | iex
```

Then initialize a new project:

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

You can also use `deno task` to run scripts defined in a `deno.json` file.

```bash
deno task dev
```

If you're using VS Code, it's also a good idea to install [the official Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).

## Using the Node API

Node has [a large api](https://nodejs.org/dist/latest-v18.x/docs/api/documentation.html), and since Deno v1.15 a large portion of it is
available in Deno.

The Node API is available in Deno by importing from the `node` module in the
Deno standard library.

```ts
// node-stdlib.ts
import { readFileSync } from "https://deno.land/std@0.158.0/node/fs.ts";
import { stdout } from "https://deno.land/std@0.158.0/node/process.ts";

const data = readFileSync("hello.txt", "utf8");

stdout.write(data);
```

## Using packages from npm

```ts
// express-main.ts
import express from "npm:express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
console.log("listening on http://localhost:3000/");
```

## Creating apps

Use the `deno run` with an
`npm:<package-name>[@<version-requirement>][/<binary-name>]` specifier to run a
Node package binary.

```bash
deno run -A --unstable npm:create-vite-extra

deno run -A --unstable npm:eslint your_file.js
```

# How to write code for both Node and Deno

# See Also

- [Deno v1.2.5 Relase Notes](https://deno.com/blog/v1.25#experimental-npm-support)
- [Deno v1.2.6 Release Notes](https://deno.com/blog/v1.26#improvements-to-npm-support)

# Thank-you

- [Deno](https://deno.land/)
- [Deno Blog](https://deno.com/blog)
- [Node](https://nodejs.org/en/)
- [Deno Deploy](https://deno.com/deploy)
- [patorjk.ck - ASCII ART](https://patorjk.com/software/taag/#p=display&f=Impossible&t=Deno%20%2B%20Node)
