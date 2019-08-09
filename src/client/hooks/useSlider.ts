import { useState } from "react";
import { State, SliderOverrides } from "baseui/slider";

import sliderCircle from "../overrides/sliderCircle.override";

interface UseSliderHookReturn {
  value: number[];
  onChange: (val: State) => void;
  overrides?: SliderOverrides;
}

const useSlider = (initialState: number, useOverrides: boolean): UseSliderHookReturn => {
  const [value, setValue] = useState<number[]>([initialState]);

  const onChange = ({ value }: State): void => setValue(value);

  return {
    value,
    onChange,
    overrides: useOverrides ? sliderCircle : undefined
  };
};

export default useSlider;
