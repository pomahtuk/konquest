import Cookies from "js-cookie";

export const COOKIE_NAME = "konquest_game_state";

export const saveToCookies = (serializedGame: string): void => {
  Cookies.set(COOKIE_NAME, serializedGame);
};

export const readFromCookies = (): string | undefined => {
  const data = Cookies.get(COOKIE_NAME);
  Cookies.remove(COOKIE_NAME);
  return data;
};
