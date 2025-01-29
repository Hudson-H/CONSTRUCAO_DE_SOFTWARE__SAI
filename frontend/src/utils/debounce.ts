export default function debounce<T extends Function>(callback: T, wait: number) {
  let timeoutId: number | undefined = undefined;
  return (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}
