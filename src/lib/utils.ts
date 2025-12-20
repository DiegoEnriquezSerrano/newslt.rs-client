export function classList(classes: string[]): string {
  return classes
    .map((string) => string.trim())
    .filter(Boolean)
    .join(' ');
}

export function dateStringFromISO(dateString: string): string {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function timeStringFromISO(dateString: string): string {
  return new Date(dateString).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  });
}
