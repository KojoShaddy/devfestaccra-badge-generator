# DevFest Accra 2026 DP Generator

![Screenshot of DevFest Accra 2026 DP Generator](./static/cover.png)

> Generate your DevFest Accra 2026 profile DP directly in your browser. Select between Dark and Light frame styles, position and zoom your photo freely, and download in full resolution! No extra software required.

## Features

- 🌟 **Official DevFest Accra 2026 Frames**: Toggle between **Dark Frame** and **Light Frame** designs.
- 📏 **Composition Grid**: Toggle gridlines to align and frame your photo.
- 🔍 **Extended Zoom & Unrestricted Pan**: Zoom out to `0.1x` (up to `5.0x` zoom-in) and pan your image in any direction, no matter the photo size.
- 📂 **Drag and Drop**: Simply drag and drop your photo anywhere on the screen to load it.
- 📋 **Paste from Clipboard**: Copy any image and paste it directly onto the page.

## Local Setup

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed:

1. Clone the repository and navigate to the directory.
2. Install the dev dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
## Privacy & Data Security

This application is a **fully client-side** static web tool.

- **Zero Server-Side Storage**: No image files, metadata, or profile information are uploaded to any external server, backend database, or cloud infrastructure.
- **In-Browser Processing**: All image transformations, positioning, cropping, overlays, and canvas renderings are executed locally in your browser memory using JavaScript and the HTML5 Canvas API.
- **No Data Persistence**: The application holds no session persistence. Once the browser tab is closed, all loaded image resources are cleared from browser memory.

## License

This project is published under the [MIT license](/LICENSE.md).

This project is built for the GDG Accra's DevFest 2026 event to enhance our brand and community engagement. 