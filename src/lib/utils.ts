export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
) {
    let timer: ReturnType<typeof setTimeout>;

    const debounced = (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };

    debounced.cancel = () => {
        clearTimeout(timer);
    };

    return debounced as T & { cancel: () => void };
}

export function capitalizeWords(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}