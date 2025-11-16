# PekaAI (Advanced template) - Expo + EAS starter
This repository is an **advanced starter** for a mobile AI app (option C).
It includes:
- Expo-managed React Native app
- EAS configuration (eas.json) to build Android APK
- Placeholder integration for OpenAI-like APIs
- Simple plugin architecture and local memory store

**Important:** This is a starter template. You must:
1. Install dependencies on your machine or use EAS Build.
2. Add your OpenAI / API keys in a secure way (do NOT commit keys).
3. Run `eas build -p android --profile production` to build APK via Expo EAS.

Quick commands:
```
npm install
npm start  # or expo start
npm run android  # if using local dev environment
```
For production builds with EAS:
```
npm install -g eas-cli
eas login
eas build -p android --profile production
```

Files of interest:
- app.json
- eas.json
- package.json
- src/App.js
- src/services/openai.js (placeholder)
- src/plugins/examplePlugin.js (plugin system)
- src/memory/store.json (local memory)
