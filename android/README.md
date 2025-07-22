## 📖 `README.md`

````md
# rns-webview

Kotlin-powered WebView customization for React Native via Expo Dev Client. Suppresses native `alert`, `confirm`, and `prompt` dialogs inside your Android WebView — with zero manual native setup.

---

## ✨ Features

- 🧠 **Dialog suppression** via custom `WebChromeClient`
- ⚙️ **Configurable** with `suppressDialog: true/false`
- 📦 Built for **Expo Dev Client & EAS Build**
- 🔌 Easy integration using Expo's config plugin system
- 🚫 No need to edit native Android project manually

---

## 🚀 Getting Started

### 1. Install the package

```bash
npm install rns-webview
```
````

### 2. Add to your Expo config

Modify `app.json` or `app.config.js`:

```js
// app.config.js
module.exports = {
  expo: {
    name: "MyApp",
    plugins: [["rns-webview", { suppressDialog: true }]],
  },
};
```

> ✅ `suppressDialog` defaults to `true` if omitted.

### 3. Build your dev client

```bash
eas build --profile development --platform android
```

Test your dialog suppression right inside the Dev Client!

---

## 🧰 Plugin Behavior

This plugin runs during the Expo prebuild phase and will:

- Copy Kotlin files from `/android/` into the native project.
- Register a custom `WebChromeClient` to suppress dialogs.
- Optional: extend behavior with more props (coming soon).

No changes needed to `android/` directly.

---

## 🔍 Example Use Case

If your site triggers `alert("Hello World")`, this will suppress it silently, preserving native UX and avoiding intrusive dialogs in your app.

---

## 🔒 Permissions & Compatibility

- ✅ Android only (iOS support planned)
- ✅ Works with Expo SDK 50+
- ❌ Doesn’t support Expo Go (requires Dev Client)

---

## 🛠 Advanced Configuration

You can pass additional options (coming soon):

```js
plugins: [["rns-webview", { suppressDialog: true }]];
```

Want `prompt` suppression but allow `alert`? Stay tuned 👀

---

## 💬 Feedback & Contributions

This plugin is maintained by [@yourusername](https://github.com/raiidr). PRs welcome!

Open issues or feature requests in the [GitHub repo](https://github.com/raiidr/rns-webview/issues).

---

## 📄 License

MIT © Raiidr

```

---

```
