export enum SharedActionTypes {
  RESTORE_GAME = "RESTORE_GAME"
}

export interface RestoreGameAction {
  type: typeof SharedActionTypes.RESTORE_GAME;
}

export function restoreGame(): RestoreGameAction {
  return { type: SharedActionTypes.RESTORE_GAME };
}
