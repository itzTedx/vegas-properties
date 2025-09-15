"use client";

import { useCallback, useState } from "react";

type UseSliderWithInputProps = {
  minValue?: number;
  maxValue?: number;
  initialValue?: number[];
  defaultValue?: number[];
};

export function useSliderWithInput({
  minValue = 0,
  maxValue = 100,
  initialValue = [minValue],
  defaultValue = [minValue],
}: UseSliderWithInputProps) {
  const formatNumber = useCallback((value: number) => {
    // Prices are integers; keep it simple and consistent across locales
    const rounded = Math.round(value);
    return rounded.toLocaleString();
  }, []);

  const [sliderValue, setSliderValue] = useState(initialValue);
  const [inputValues, setInputValues] = useState(initialValue.map((v) => formatNumber(v)));

  const showReset =
    sliderValue.length === defaultValue.length && !sliderValue.every((value, index) => value === defaultValue[index]);

  const validateAndUpdateValue = useCallback(
    (rawValue: string, index: number) => {
      // Sanitize any currency formatting (commas, spaces, symbols)
      const sanitized = rawValue.replace(/[^\d.-]/g, "");

      if (sanitized === "" || sanitized === "-") {
        const newInputValues = [...inputValues];
        newInputValues[index] = formatNumber(0);
        setInputValues(newInputValues);

        const newSliderValues = [...sliderValue];
        newSliderValues[index] = 0;
        setSliderValue(newSliderValues);
        return;
      }

      const numValue = Number.parseFloat(sanitized);

      if (isNaN(numValue)) {
        const newInputValues = [...inputValues];
        newInputValues[index] = formatNumber(sliderValue[index]!);
        setInputValues(newInputValues);
        return;
      }

      let clampedValue = Math.min(maxValue, Math.max(minValue, numValue));

      if (sliderValue.length > 1) {
        if (index === 0) {
          clampedValue = Math.min(clampedValue, sliderValue[1]!);
        } else {
          clampedValue = Math.max(clampedValue, sliderValue[0]!);
        }
      }

      const newSliderValues = [...sliderValue];
      newSliderValues[index] = clampedValue;
      setSliderValue(newSliderValues);

      const newInputValues = [...inputValues];
      newInputValues[index] = formatNumber(clampedValue);
      setInputValues(newInputValues);
    },
    [sliderValue, inputValues, minValue, maxValue, formatNumber]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value;
      // Allow digits, commas, periods, spaces, and hyphen while typing
      if (newValue === "" || /^[\d,\.\s-]*$/.test(newValue)) {
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
      }
    },
    [inputValues]
  );

  const handleSliderChange = useCallback(
    (newValue: number[]) => {
      setSliderValue(newValue);
      setInputValues(newValue.map((v) => formatNumber(v)));
    },
    [formatNumber]
  );

  const resetToDefault = useCallback(() => {
    setSliderValue(defaultValue);
    setInputValues(defaultValue.map((v) => formatNumber(v)));
  }, [defaultValue, formatNumber]);

  return {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
    showReset,
  };
}
