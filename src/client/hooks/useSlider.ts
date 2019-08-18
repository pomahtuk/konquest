import { useState, ChangeEvent } from "react";

interface UseSliderHookReturn {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: number) => void;
}

const useSlider = (initialState: number): UseSliderHookReturn => {
  const [value, setValue] = useState<number>(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => setValue(parseInt(event.target.value, 10));

  return {
    value,
    onChange,
    setValue
  };
};

export default useSlider;
