import { ResponseContentType } from '$lib/Enums/ApiEnums';
import FlashMessageService from '$lib/Services/FlashMessageService';
import type { JsonResponseError } from '$lib/Types/ApiTypes';

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

export async function handleHttpResponseError(response: Response): Promise<void> {
  const responseContentType = response.headers.get('Content-Type')?.split(';')?.at(0);

  let message: string;

  switch (responseContentType) {
    case ResponseContentType.Json:
      try {
        message = ((await response.json()) as JsonResponseError).error;
      } catch {
        message = 'Unexpected Error';
      }

      break;
    case ResponseContentType.Text:
      message = await response.text();

      break;
    default:
      message = 'Unexpected Error';
  }

  FlashMessageService.setMessage({ type: 'error', message });
}
