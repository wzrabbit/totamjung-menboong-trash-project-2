import { STORAGE_KEY } from '@/constants/commands';
import type { CheckedAlgorithmIdsResponse } from '@/types/algorithm';
import type { QuickSlotsResponse } from '@/types/randomDefense';
import type { TotamjungTheme } from '@/types/totamjungTheme';
import type { HiderOptionsResponse } from '@/types/algorithm';
import type { RandomDefenseHistoryResponse } from '@/types/randomDefense';
import type { FontNoResponse } from '@/types/font';
import type { TimersResponse } from '@/types/algorithm';

export interface OptionsDataResponse {
  checkedAlgorithmIds: CheckedAlgorithmIdsResponse['checkedIds'];
  quickSlots: QuickSlotsResponse;
  totamjungTheme: TotamjungTheme;
  hiderOptions: HiderOptionsResponse;
  randomDefenseHistory: RandomDefenseHistoryResponse['randomDefenseHistory'];
  isTierHidden: RandomDefenseHistoryResponse['isHidden'];
  fontNo: FontNoResponse['fontNo'];
  [timers]: TimersResponse['timers'];
  dataVersion: 'v1.2';
}

export interface OptionsSectionProps {
  show: boolean;
}

export type OptionsNavCategory =
  | 'algorithmHider'
  | 'randomDefense'
  | 'appearanceAndDataManage';
