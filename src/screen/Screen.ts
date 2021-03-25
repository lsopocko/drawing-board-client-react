export function getScreenWidth(): number {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export function getScreenHeight(): number {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}