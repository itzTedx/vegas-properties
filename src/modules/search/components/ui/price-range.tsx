"use client";

import { useEffect } from "react";

import { Currency } from "@/components/ui/currency";
import { FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function PriceRange({ className, value, onChange }: Props) {
  const minValue = 0;
  const maxValue = 200;
  const initialValue = [50, 150];

  // Parse the value from the form (format: "min-max" or empty string)
  const parseValue = (val?: string): number[] => {
    if (!val) return initialValue;
    const [min, max] = val.split("-").map(Number);
    if (isNaN(min) || isNaN(max)) return initialValue;
    return [min, max];
  };

  const { sliderValue, inputValues, validateAndUpdateValue, handleInputChange, handleSliderChange } =
    useSliderWithInput({
      minValue,
      maxValue,
      initialValue: parseValue(value),
    });

  // Update form when slider values change
  useEffect(() => {
    if (onChange) {
      const formattedValue = `${sliderValue[0]}-${sliderValue[1]}`;
      onChange(formattedValue);
    }
  }, [sliderValue, onChange]);

  const formatPrice = (price: number) => {
    return price === maxValue ? `${price.toLocaleString()}+` : `${price.toLocaleString()}`;
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className={cn("flex items-center gap-2")}>
        <Input
          aria-label="Enter minimum value"
          className="h-8 w-16 px-2 py-1"
          inputMode="decimal"
          onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
          onChange={(e) => handleInputChange(e, 0)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              validateAndUpdateValue(inputValues[0], 0);
            }
          }}
          type="text"
          value={inputValues[0]}
        />
        <Slider
          aria-label="Dual range slider with input"
          className="grow"
          max={maxValue}
          min={minValue}
          onValueChange={handleSliderChange}
          value={sliderValue}
        />
        <Input
          aria-label="Enter maximum value"
          className="h-8 w-16 px-2 py-1"
          inputMode="decimal"
          onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
          onChange={(e) => handleInputChange(e, 1)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              validateAndUpdateValue(inputValues[1], 1);
            }
          }}
          type="text"
          value={inputValues[1]}
        />
      </div>
      <FormDescription>
        From <Currency />
        {formatPrice(Number(inputValues[0]))} to <Currency />
        {formatPrice(Number(inputValues[1]))}
      </FormDescription>
    </div>
  );
}
