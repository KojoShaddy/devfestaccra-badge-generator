import { settings } from "./state.js";
import { updateRange } from "./listeners.js";

export const drawGrid = (canvas, ctx) => {
  if (settings.isExport) return;

  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 3);
  ctx.lineTo(canvas.width, canvas.height / 3);
  ctx.moveTo(0, (canvas.height / 3) * 2);
  ctx.lineTo(canvas.width, (canvas.height / 3) * 2);
  ctx.moveTo(canvas.width / 3, 0);
  ctx.lineTo(canvas.width / 3, canvas.height);
  ctx.moveTo((canvas.width / 3) * 2, 0);
  ctx.lineTo((canvas.width / 3) * 2, canvas.height);

  // Grey border (outer stroke)
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#757575";
  ctx.stroke();

  // White line (inner stroke)
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  ctx.restore();
};

export const drawCheckPattern = (canvas, ctx) => {
  if (settings.isExport) return;

  const size = canvas.width / 40;
  ctx.fillStyle = "#bdbdbd";

  for (let i = 0; i < 40; ++i) {
    for (let j = 0, col = 40 / 2; j < col; ++j) {
      ctx.rect(2 * j * size + (i % 2 ? 0 : size), i * size, size, size);
    }
  }

  ctx.fill();
};

export const updateSliderStates = () => {
  const eleX = document.querySelector(".form input#image-x");
  const eleY = document.querySelector(".form input#image-y");
  const eleZ = document.querySelector(".form input#image-z");
  const eleDownload = document.querySelector("button#download");
  const eleShare = document.querySelector("button#share-linkedin");
  const img = settings.image.img;

  if (!img) {
    if (eleX) eleX.disabled = true;
    if (eleY) eleY.disabled = true;
    if (eleZ) eleZ.disabled = true;
    if (eleDownload) eleDownload.disabled = true;
    if (eleShare) eleShare.disabled = true;
    return;
  }

  if (eleZ) eleZ.disabled = false;
  if (eleX) eleX.disabled = false;
  if (eleY) eleY.disabled = false;
  if (eleDownload) eleDownload.disabled = false;
  if (eleShare) eleShare.disabled = false;
};

export const draw = () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const { image: imageObj, x, y, z, shape, grid, banner } = settings;
  const image = imageObj.img;

  if (image) {
    if (shape === "original") {
      canvas.width = image.width;
      canvas.height = image.height;
      
      const renderW = image.width;
      const renderH = image.height;
      const maxPanX = Math.max(canvas.width, renderW * z) / 2;
      const maxPanY = Math.max(canvas.height, renderH * z) / 2;
      const panX = maxPanX * (x / 100);
      const panY = maxPanY * (y / 100);

      ctx.save();
      drawCheckPattern(canvas, ctx);
      ctx.translate(canvas.width / 2 + panX, canvas.height / 2 + panY);
      ctx.scale(z, z);
      ctx.drawImage(image, -renderW / 2, -renderH / 2, renderW, renderH);
      ctx.restore();
    } else {
      const size = Math.min(image.width, image.height);
      canvas.width = size;
      canvas.height = size;
      
      const hRatio = canvas.width / image.width;
      const vRatio = canvas.height / image.height;
      const ratio = Math.max(hRatio, vRatio);

      const renderW = image.width * ratio;
      const renderH = image.height * ratio;

      const maxPanX = Math.max(canvas.width, renderW * z) / 2;
      const maxPanY = Math.max(canvas.height, renderH * z) / 2;

      const panX = maxPanX * (x / 100);
      const panY = maxPanY * (y / 100);

      ctx.save();
      drawCheckPattern(canvas, ctx);
      ctx.translate(canvas.width / 2 + panX, canvas.height / 2 + panY);
      ctx.scale(z, z);
      ctx.drawImage(image, -renderW / 2, -renderH / 2, renderW, renderH);
      ctx.restore();
    }
  } else {
    // Set transparent canvas
    ctx.canvas.width = 1920;
    ctx.canvas.height = 1920;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCheckPattern(canvas, ctx);
  }

  // Draw "Banner"
  if (banner) {
    const height = (banner.height / banner.width) * canvas.width;
    const bannerY = canvas.height - height;
    ctx.drawImage(
      banner,
      0,
      0,
      banner.width,
      banner.height,
      0,
      bannerY,
      canvas.width,
      height,
    );
  }

  // Draw grid
  if (grid === "grid") drawGrid(canvas, ctx);

  switch (shape) {
    // Mask image into circle
    case "circle": {
      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 2,
        0,
        Math.PI * 2,
      );
      ctx.closePath();
      ctx.fill();
      document.querySelector(".canvas").dataset.shape = "circle";
      break;
    }
    case "material": {
      ctx.globalCompositeOperation = "destination-in";
      if (settings.material) {
        ctx.drawImage(settings.material, 0, 0, canvas.width, canvas.height);
      }
      document.querySelector(".canvas").dataset.shape = "material";
      break;
    }
    default: {
      delete document.querySelector(".canvas").dataset.shape;
      break;
    }
  }
  updateSliderStates();
};

export const loadBanner = async (category = "dark") => {
  settings.banner = new Image();
  if (category === "light") {
    settings.banner.src = (await import("../images/devfestaccra2026_BadgeW.webp")).default;
  } else {
    settings.banner.src = (await import("../images/devfestaccra2026_Badge.webp")).default;
  }
  settings.banner.onload = async () => {
    await document.fonts.ready;
    draw();
  };
};

export const loadMaterial = async () => {
  const input = document.querySelector("input#shape-material");
  if (input) input.disabled = false;
  settings.material = new Image();
  settings.material.src = (await import("../images/m3.svg")).default;
  settings.material.onload = async () => {
    draw();
  };
};

export const checkMaterialFlag = () => {
  const params = new URLSearchParams(location.search);
  const material = params.get("material");
  if (material === "true") loadMaterial();
};
