export function debounce<Func extends (...args: any[]) => void>(func: Func, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<Func>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
