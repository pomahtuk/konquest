export enum SharedActionTypes {
  RESTORE_GAME = "RESTORE_GAME"
}

export interface RestoreGameAction {
  type: typeof SharedActionTypes.RESTORE_GAME;
  storedGame?: string;
}

export function restoreGame(storedGame?: string): RestoreGameAction {
  return { type: SharedActionTypes.RESTORE_GAME, storedGame };
}
