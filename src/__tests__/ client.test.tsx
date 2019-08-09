import REACT_DOM from "react-dom";

import main from "../client";

jest.mock("react-dom");

const wait = (timeout: number): Promise<void> =>
  new Promise((resolve): void => {
    setTimeout((): void => resolve(), timeout);
  });

describe("client", (): void => {
  it("hydrates app on client", async (done): Promise<void> => {
    const el = document.createElement("div");
    // ReactDOM.hydrate is a constant, so its not assignable here. We are mocking with jest and ts will complain about it without an ignore
    // @ts-ignore
    REACT_DOM.hydrate = jest.fn();
    main({ node: el });
    await wait(1000);
    expect(REACT_DOM.hydrate).toHaveBeenCalled();
    done();
  });
});
