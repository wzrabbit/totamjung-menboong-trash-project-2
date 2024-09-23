import { STORAGE_KEY } from '@/constants/commands';
import { isTotamjungThemeResponse } from '@/domains/dataHandlers/validators/totamjungThemeValidator';
import { sanitizeTotamjungTheme } from './sanitizers/totamjungThemeSanitizer';
import type { TotamjungThemeResponse } from '@/types/totamjungTheme';

export const fetchTotamjungTheme =
  async (): Promise<TotamjungThemeResponse> => {
    const data = await chrome.storage.local.get(totamjungTheme);
    const totamjungTheme = datatotamjungTheme;

    const sanitizedTotamjungTheme = sanitizeTotamjungTheme(totamjungTheme);

    return {
      totamjungTheme: sanitizedTotamjungTheme,
    };
  };

export const saveTotamjungTheme = (totamjungTheme: unknown) => {
  if (!isTotamjungThemeResponse({ totamjungTheme })) {
    return;
  }

  chrome.storage.local.set({
    totamjungTheme: totamjungTheme,
  });
};
