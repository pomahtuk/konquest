import { useState } from "react";

interface UseSliderHookReturn {
  value: number;
  onChange: (value: number) => void;
}

const useSlider = (initialState: number): UseSliderHookReturn => {
  const [value, setValue] = useState<number>(initialState);

  const onChange = (value: number): void => setValue(value);

  return {
    value,
    onChange
  };
};

export default useSlider;
