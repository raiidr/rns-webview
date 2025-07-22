# rns-webview

**Kotlin-powered WebView for React Native + Expo Dev Client**  
Suppresses native `alert`, `confirm`, and `prompt` dialogs in Android WebViews — no manual native setup needed.

---

## ✨ Features

- 🧠 Suppresses intrusive `alert`, `confirm`, and `prompt` dialogs
- ⚙️ Configurable via props from JavaScript
- 🚀 Built for **Expo Dev Client** + **EAS Build**
- 🔌 Integrated via Expo config plugin (no Android edits)
- 🛠 Enables smooth keyboard + navigation handling on Android

---

## 🚀 Getting Started

### 1️⃣ Install the package

```bash
npm install rns-webview
```

---

### 2️⃣ Configure the Expo plugin

Update your `app.json` or `app.config.js`:

```js
// app.config.js
module.exports = {
  expo: {
    plugins: ["rns-webview/plugin"],
  },
};
```

Or if using `app.json`:

```json
{
  "expo": {
    "plugins": ["rns-webview/plugin"]
  }
}
```

> 💡 You don’t need extra options unless you want to customize behavior — `suppressDialog` defaults to `true`.

---

### 3️⃣ Build with EAS

```bash
eas build --profile development --platform android
```

> ✅ No need to run `expo prebuild` manually — EAS does this for you.

---

## 📱 Usage in React Native

```tsx
import RaiidrWebView from "rns-webview";

export default function App() {
  return (
    <RaiidrWebView
      source={{ uri: "https://raiidr.com" }}
      onNavigationStateChange={({ url }) => {
        console.log("Navigated to:", url);
      }}
      suppressNavigationEvents={true}
      descendantFocusability="afterDescendants"
      style={{ flex: 1 }}
    />
  );
}
```

---

## 🔧 Supported Props

| Prop                       | Type                                                              | Description                            |
| -------------------------- | ----------------------------------------------------------------- | -------------------------------------- |
| `source`                   | `{ uri: string }`                                                 | Loads content into the WebView         |
| `onNavigationStateChange`  | `function`                                                        | Fires when navigation occurs           |
| `suppressNavigationEvents` | `boolean`                                                         | Prevents dispatching navigation events |
| `descendantFocusability`   | `"blockDescendants" \| "beforeDescendants" \| "afterDescendants"` | Controls keyboard focus behavior       |

---

## 🔍 How the Plugin Works

- Injects Kotlin files during native project generation
- Registers a custom `WebChromeClient` for dialog suppression
- Hooks into native build via Expo's plugin system
- No manual changes required inside `/android`

---

## 🛡 Compatibility

- ✅ Android only (iOS support planned)
- ✅ Works with Expo SDK 50+ / React Native 0.73+
- ❌ Not compatible with Expo Go (requires Dev Client)

---

## 💬 Feedback & Contributions

Maintained by [@raiidr](https://github.com/raiidr)  
PRs welcome! Create issues or feature requests [here](https://github.com/raiidr/rns-webview/issues)

---

## 📄 License

MIT © Raiidr
