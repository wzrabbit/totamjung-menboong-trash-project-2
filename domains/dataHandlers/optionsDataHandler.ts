import { STORAGE_KEY } from '@/constants/commands';
import { fetchCheckedAlgorithmIds } from './checkedAlgorithmsHandler';
import { fetchQuickSlots } from './quickSlotsDataHandler';
import { fetchTotamjungTheme } from './totamjungThemeDataHandler';
import { fetchHiderOptions } from './hiderOptionsDataHandler';
import { fetchRandomDefenseHistory } from './randomDefenseHistoryDataHandler';
import { fetchFontNo } from './fontNoDataHandler';
import { fetchTimers } from './timersDataHandler';
import type { OptionsDataResponse } from '@/types/options';
import { DEFAULT_INITIAL_DATA } from '@/constants/defaultValues';
import { isOptionsDataResponse } from './validators/optionsDataValidator';

export const fetchOptionsData = async (): Promise<OptionsDataResponse> => {
  const [
    checkedAlgorithmIdsResponse,
    quickSlotsResponse,
    totamjungThemeResponse,
    hiderOptionsResponse,
    randomDefenseHistoryResponse,
    timersResponse,
    fontNoResponse,
  ] = await Promise.all([
    fetchCheckedAlgorithmIds(),
    fetchQuickSlots(),
    fetchTotamjungTheme(),
    fetchHiderOptions(),
    fetchRandomDefenseHistory(),
    fetchTimers(),
    fetchFontNo(),
  ]);

  return {
    checkedAlgorithmIds: checkedAlgorithmIdsResponse.checkedIds,
    quickSlots: quickSlotsResponse,
    totamjungTheme: totamjungThemeResponse.totamjungTheme,
    hiderOptions: hiderOptionsResponse,
    randomDefenseHistory: randomDefenseHistoryResponse.randomDefenseHistory,
    isTierHidden: randomDefenseHistoryResponse.isHidden,
    fontNo: fontNoResponse['fontNo'],
    [timers]: timersResponse['timers'],
    dataVersion: 'v1.2',
  };
};

export const saveOptionsData = async (data: unknown) => {
  if (!isOptionsDataResponse(data)) {
    return false;
  }

  await chrome.storage.local.set(data);

  return true;
};

export const deleteOptionsData = async () => {
  await chrome.storage.local.set(DEFAULT_INITIAL_DATA);

  return true;
};
