import {
  LEGACY_SYNC_STORAGE_KEY,
  LEGACY_LOCAL_STORAGE_KEY,
  STORAGE_KEY,
} from '@/constants/commands';
import { sanitizeCheckedAlgorithmIds } from './sanitizers/checkedAlgorithmIdsSanitizer';
import { sanitizeLegacyQuickSlots } from './sanitizers/quickSlotsSanitizer';
import { sanitizeLegacyRandomDefenseHistory } from './sanitizers/randomDefenseHistorySanitizer';
import { sanitizeIsTierHidden } from './sanitizers/isTierHiddenSanitizer';
import { convertLegacyToLatestQuickSlots } from './converters/legacyToLatestQuickSlotsConverter';
import { convertLegacyToLatestRandomDefenseHistory } from './converters/legacyToLatestRandomDefenseHistory';
import { convertLegacyToLatestHiderOptions } from './converters/legacyToLatestHiderOptionsConverter';
import { convertLegacyToLatestTotamjungTheme } from './converters/legacyToLatestTotamjungThemeConverter';
import { convertLegacyToLatestFontNoBySettings } from './converters/legacyToLatestFontNo';

export const updateAllLegacyData = async () => {
  const dataVersion = await storage.getItem(STORAGE_KEY.DATA_VERSION);

  if (dataVersion === 'v1.2') {
    return;
  }

  const legacyQuickSlots = sanitizeLegacyQuickSlots(
    storage.getItem(LEGACY_SYNC_STORAGE_KEY.QUICK_SLOTS),
  );
  const legacyRandomDefenseHistory = sanitizeLegacyRandomDefenseHistory(
    storage.getItem(LEGACY_LOCAL_STORAGE_KEY.RANDOM_DEFENSE_HISTORY),
  );

  const checkedAlgorithmIds = sanitizeCheckedAlgorithmIds(
    storage.getItem(LEGACY_SYNC_STORAGE_KEY.CHECKED_ALGORITHM_IDS),
  );
  const totamjungTheme = convertLegacyToLatestTotamjungTheme(
    storage.getItem(LEGACY_SYNC_STORAGE_KEY.TOTAMJUNG_THEME),
  );
  const hiderOptions = convertLegacyToLatestHiderOptions(
    storage.getItem(LEGACY_SYNC_STORAGE_KEY.TIMER),
    storage.getItem(LEGACY_SYNC_STORAGE_KEY.SETTINGS),
  );
  const quickSlots = convertLegacyToLatestQuickSlots(legacyQuickSlots);
  const randomDefenseHistory = convertLegacyToLatestRandomDefenseHistory(
    legacyRandomDefenseHistory,
  );
  const isTierHidden = sanitizeIsTierHidden(
    storage.getItem(STORAGE_KEY.IS_TIER_HIDDEN),
  );
  const fontNo = convertLegacyToLatestFontNoBySettings(
    storage.getItem(LEGACY_SYNC_STORAGE_KEY.SETTINGS),
  );

  storage.setItems([
    { key: STORAGE_KEY.CHECKED_ALGORITHM_IDS, value: checkedAlgorithmIds },
    { key: STORAGE_KEY.QUICK_SLOTS, value: quickSlots },
    { key: STORAGE_KEY.TOTAMJUNG_THEME, value: totamjungTheme },
    { key: STORAGE_KEY.HIDER_OPTIONS, value: hiderOptions },
    { key: STORAGE_KEY.RANDOM_DEFENSE_HISTORY, value: randomDefenseHistory },
    { key: STORAGE_KEY.IS_TIER_HIDDEN, value: isTierHidden },
    { key: STORAGE_KEY.FONT_NO, value: fontNo },
    { key: STORAGE_KEY.DATA_VERSION, value: 'v1.2' },
  ]);
};
