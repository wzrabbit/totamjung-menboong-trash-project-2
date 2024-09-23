import { STORAGE_KEY } from '@/constants/commands';
import { DEFAULT_HIDER_OPTIONS } from '@/constants/defaultValues';
import { isHiderOptionsResponse } from './validators/hiderOptionsValidator';
import type { HiderOptionsResponse } from '@/types/algorithm';

export const fetchHiderOptions = async (): Promise<HiderOptionsResponse> => {
  const data = await chrome.storage.local.get(hiderOptions);
  const hiderOptions = datahiderOptions;

  return isHiderOptionsResponse(hiderOptions)
    ? hiderOptions
    : DEFAULT_HIDER_OPTIONS;
};

export const saveHiderOptions = (hiderOptions: unknown) => {
  if (!isHiderOptionsResponse(hiderOptions)) {
    return;
  }

  chrome.storage.local.set({
    hiderOptions: hiderOptions,
  });
};
