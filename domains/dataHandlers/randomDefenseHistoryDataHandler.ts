import { STORAGE_KEY } from '@/constants/commands';
import { sanitizeRandomDefenseHistory } from './sanitizers/randomDefenseHistorySanitizer';
import { sanitizeIsTierHidden } from './sanitizers/isTierHiddenSanitizer';
import type {
  RandomDefenseHistoryInfo,
  RandomDefenseHistoryResponse,
} from '@/types/randomDefense';

const getSortedRandomDefenseHistory = (
  randomDefenseHistory: RandomDefenseHistoryInfo[],
) => {
  return [...randomDefenseHistory].sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1,
  );
};

export const fetchRandomDefenseHistory =
  async (): Promise<RandomDefenseHistoryResponse> => {
    const data = await chrome.storage.local.get([
      randomDefenseHistory,
      isTierHidden,
    ]);
    const randomDefenseHistory = datarandomDefenseHistory;
    const isTierHidden = dataisTierHidden;
    const sanitizedRandomDefenseHistory =
      sanitizeRandomDefenseHistory(randomDefenseHistory);
    const sortedRandomDefenseHistory = getSortedRandomDefenseHistory(
      sanitizedRandomDefenseHistory,
    );
    const sanitizedIsTierHidden = sanitizeIsTierHidden(isTierHidden);

    return {
      randomDefenseHistory: sortedRandomDefenseHistory,
      isHidden: sanitizedIsTierHidden,
    };
  };

export const saveRandomDefenseHistory = (
  randomDefenseHistory: unknown,
  isHidden: unknown,
) => {
  if (!Array.isArray(randomDefenseHistory) || typeof isHidden !== 'boolean') {
    return;
  }

  const sanitizedRandomDefenseHistory =
    sanitizeRandomDefenseHistory(randomDefenseHistory);
  const sortedRandomDefenseHistory = getSortedRandomDefenseHistory(
    sanitizedRandomDefenseHistory,
  );

  chrome.storage.local.set({
    randomDefenseHistory: sortedRandomDefenseHistory,
    isTierHidden: isHidden,
  });
};

export const appendRandomDefenseInfoToHistory = async (
  randomDefenseHistoryInfo: unknown,
) => {
  const { randomDefenseHistory, isHidden } = await fetchRandomDefenseHistory();

  saveRandomDefenseHistory(
    [...randomDefenseHistory, randomDefenseHistoryInfo],
    isHidden,
  );
};
