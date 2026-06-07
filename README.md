# Tweet Reply Generator

Generate engaging tweet replies with AI. Paste a tweet, get multiple reply options instantly.

Powered by DeepSeek API with a custom system prompt that supports Indonesian, English, and Japanese replies. Installable as a Progressive Web App (PWA).

## Features

- **Multiple Reply Options** - AI generates unique reply angles for every tweet (configurable 2-10)
- **Best Pick Recommendation** - AI picks the best reply with reasoning
- **Confidence Score** - Shows how confident the AI is about the topic (1-10)
- **One-Click Copy** - Copy any reply to clipboard instantly
- **Mobile Responsive** - Works on desktop, tablet, and mobile
- **Multi-language** - Supports Indonesian, English, and Japanese replies
- **Local Storage** - API key saved locally in your browser
- **PWA Support** - Install the app on your device for offline access
- **Custom Settings** - Adjustable language, temperature, and reply count

## Tech Stack

- **React 19** + **Vite 8**
- **CSS Modules** (vanilla CSS, no frameworks)
- **DeepSeek API** (`deepseek-chat` model)
- **Inter** font from Google Fonts
- **PWA** with Service Worker

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [DeepSeek API Key](https://platform.deepseek.com/api_keys)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Amarudinn/tweet-reply-generator.git
   cd tweet-reply-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   ```
   http://localhost:5173
   ```

5. **Set API Key**

   On first launch, a settings modal will appear. Enter your DeepSeek API key and click **Save**.

## Usage

1. Paste a tweet into the text area (or click the **Paste** button)
2. Click **Generate Reply** (or press `Ctrl + Enter`)
3. Wait for the AI to generate reply options
4. Click the copy icon on any reply to copy it to clipboard
5. Paste it as your reply on X/Twitter

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
reply-tweet/
├── index.html                  # HTML entry point
├── package.json
├── vite.config.js
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service Worker
│   ├── 16x16.png               # Favicon 16x16
│   ├── 32x32.png               # Favicon 32x32
│   ├── 180x180.png             # Apple Touch Icon
│   ├── 192x192.png             # PWA icon
│   └── 512x512.png             # PWA splash icon
└── src/
    ├── main.jsx                # React entry + SW registration
    ├── index.css               # Design system (colors, fonts, variables)
    ├── App.jsx                 # Main app component
    ├── App.module.css          # App styles
    ├── api.js                  # System prompt, API calls, response parser
    └── components/
        ├── ReplyCard.jsx       # Individual reply card
        ├── ReplyCard.module.css
        ├── MetaBar.jsx         # Confidence and angle display
        ├── MetaBar.module.css
        ├── SettingsModal.jsx   # API key settings modal
        ├── SettingsModal.module.css
        ├── Toast.jsx           # Toast notification
        └── Toast.module.css
```

## Configuration

API settings can be modified in `src/api.js`:

```js
export const CONFIG = {
  API_URL: 'https://api.deepseek.com/v1/chat/completions',
  MODEL: 'deepseek-chat',
  TEMPERATURE: 0.7,
  MAX_TOKENS: 2048,
};
```

| Parameter     | Description                                   | Default                                        |
|---------------|-----------------------------------------------|------------------------------------------------|
| `API_URL`     | DeepSeek API endpoint                         | `https://api.deepseek.com/v1/chat/completions` |
| `MODEL`       | Model name                                    | `deepseek-chat`                                |
| `TEMPERATURE` | Creativity level (0 = precise, 1 = creative)  | `0.7`                                          |
| `MAX_TOKENS`  | Maximum response length                       | `2048`                                         |

## License

MIT
