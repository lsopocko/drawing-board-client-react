export function hexToRgb(hex: string): string {
  const [r, g, b] = (hex.match(/\w\w/g) as string[]).map((x: string) => parseInt(x, 16));
  return `${r},${g},${b}`;
}