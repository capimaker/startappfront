// src/utils/color.js
export const stringToColor = (str = '') => {
  // hash simple
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // HSL para colores agradables
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 50%)`;
};

// Para texto legible sobre el fondo
export const getContrastColor = (bg) => {
  // extrae l% de hsl
  const match = /hsl\(\d+,\s*\d+%,\s*(\d+)%\)/.exec(bg);
  const lightness = match ? parseInt(match[1], 10) : 50;
  return lightness > 55 ? '#000' : '#fff';
};
