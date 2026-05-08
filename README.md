# VegaUI

A collection of ready-to-use UI components built with plain HTML, CSS, and JavaScript.

**[Browse components](https://themohit1.github.io/VegaUI/pages/)**

---

## Setup

### 1) Add VegaUI files to your project

Copy the `components/` folder into your project.

You mainly need:

- `components/index.css`
- `components/index.js`

`index.css` imports all component styles, and `index.js` loads component behavior modules.

### 2) Include VegaUI in your HTML

```html
<link rel="stylesheet" href="./components/index.css">
<script type="module" src="./components/index.js"></script>
```

### 3) Use component markup

Use any component markup from the docs pages inside `pages/docs/`.

Example:

```html
<button class="btn">Button</button>
```

### 4) Run with a local server (recommended)

Because VegaUI uses ES modules, run your project through a local server instead of opening HTML directly with `file://`.

```bash
python -m http.server 5500
```

Then open:

`http://localhost:5500`

---

## Setup with Bundlers (optional)

If you use Vite/Webpack/Parcel, import VegaUI in your entry file:

```js
import "./components/index.css";
import "./components/index.js";
```

---

## Features

- ✅ **No external dependencies** — entirely self-contained
- ✅ **Framework-agnostic** — works with React, Vue, or plain HTML
- ✅ **Design-token driven** — easy customization via CSS variables
