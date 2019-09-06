import Cookies from "js-cookie";

import { saveToCookies, readFromCookies, COOKIE_NAME, clearCookie } from "./cookies.persister";

const testData = "i am test data";

describe("cookies persister", (): void => {
  it("could store data in cookies", (): void => {
    saveToCookies(testData);
    const saved = Cookies.get(COOKIE_NAME);
    expect(saved).toBe(testData);
  });

  it("could retrieve data from cookies ", (): void => {
    const savedData = readFromCookies();
    expect(savedData).toBe(testData);
  });

  it("could delete data from cookies", (): void => {
    saveToCookies(testData);
    clearCookie();
    const savedData = readFromCookies();
    expect(savedData).toBeUndefined();
  });
});
