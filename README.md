<h2 align="center"> 📝 sjt 📝</h2>

<p align="center">
<b>📝 Scan JSX Text 📝</b>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/sjt">
    <img src="https://img.shields.io/npm/v/sjt.svg?style=flat-square" alt="npm"/>
  </a>
  <a href="https://github.com/janczizikow/sjt/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/sjt.svg?style=flat-square" alt="license" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier" />
  </a>
</p>

<p>Copy text from JSXText nodes into a separate file:</p>

```sh
# example.js
# import React from 'react';

# export default function Example() {
#   return (
#     <div>
#       <span>Hello world!</span>
#     </div>
#   );
# }

sjt ./example.js

# output:
# example.json
# {
#   "example.helloWorld": "Hello world!"
# }
```

## 🚀 Installation

You don't really need to install anything to use `sjt`. You can use it with npx:

```sh
npx sjt
```

In case you want to install it:

```
# might need to run it with sudo on Linux
npm i -g sjt
```

## 👨‍⚖️ License

[MIT](LICENSE)
