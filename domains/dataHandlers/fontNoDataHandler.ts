import { STORAGE_KEY } from '@/constants/commands';
import { sanitizeFontNo } from './sanitizers/fontNoSanitizer';
import { isFontNo } from './validators/fontNoValidator';
import { FontNoResponse } from '@/types/font';

export const fetchFontNo = async (): Promise<FontNoResponse> => {
  const fontNo = await storage.getItem(STORAGE_KEY.FONT_NO);

  return {
    fontNo: sanitizeFontNo(fontNo),
  };
};

export const saveFontNo = (fontNo: unknown) => {
  if (!isFontNo(fontNo)) {
    return;
  }

  chrome.storage.local.set({
    fontNo: fontNo,
  });
};
