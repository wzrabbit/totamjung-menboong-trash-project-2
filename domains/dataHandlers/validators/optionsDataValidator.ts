import { isValidCheckedAlgorithmIds } from './checkedAlgorithmIdsValidator';
import { isQuickSlotsResponse } from './quickSlotsValidator';
import { isTotamjungTheme } from './totamjungThemeValidator';
import { isHiderOptionsResponse } from './hiderOptionsValidator';
import { isRandomDefenseHistoryInfos } from './randomDefenseHistoryValidator';
import { isFontNo } from './fontNoValidator';
import { isTimers } from './isTimersValidator';
import { STORAGE_KEY } from '@/constants/commands';
import { isObject } from '@/types/typeGuards';
import type { OptionsDataResponse } from '@/types/options';

export const isOptionsDataResponse = (
  data: unknown,
): data is OptionsDataResponse => {
  if (
    !(
      isObject(data) &&
      dataVersion in data &&
      checkedAlgorithmIds in data &&
      quickSlots in data &&
      totamjungTheme in data &&
      hiderOptions in data &&
      randomDefenseHistory in data &&
      isTierHidden in data &&
      fontNo in data &&
      timers in data
    )
  ) {
    return false;
  }

  return (
    datadataVersion === 'v1.2' &&
    isValidCheckedAlgorithmIds(datacheckedAlgorithmIds) &&
    isQuickSlotsResponse(dataquickSlots) &&
    isTotamjungTheme(datatotamjungTheme) &&
    isHiderOptionsResponse(datahiderOptions) &&
    isRandomDefenseHistoryInfos(datarandomDefenseHistory) &&
    typeof dataisTierHidden === 'boolean' &&
    isFontNo(datafontNo) &&
    isTimers(data[timers])
  );
};
