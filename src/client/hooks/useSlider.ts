import { useState, ChangeEvent } from "react";

interface UseSliderHookReturn {
  value: number | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: number | string) => void;
}

const useSlider = (initialState: number | string): UseSliderHookReturn => {
  const [value, setValue] = useState<number | string>(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newVal = parseInt(event.target.value, 10);
    setValue(isNaN(newVal) ? "" : newVal);
  };

  return {
    value,
    onChange,
    setValue
  };
};

export default useSlider;
