"use client";

import { useEffect } from "react";

import { Currency } from "@/components/ui/currency";
import { FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  min: number;
  max: number;
}

export default function PriceRange({ className, value, onChange, min, max }: Props) {
  const minValue = min;
  const maxValue = max;
  const initialValue = [min, max];

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

  // const formatPrice = (price: number) => {
  //   return price === maxValue ? `${price.toLocaleString()}+` : `${price.toLocaleString()}`;
  // };

  return (
    <div className={cn("flex flex-col gap-4 pt-3", className)}>
      <Slider
        aria-label="Dual range slider with input"
        className="grow"
        max={maxValue}
        min={minValue}
        onValueChange={handleSliderChange}
        step={100}
        value={sliderValue}
      />
      <div className="flex items-center gap-1">
        <div>
          <Label className="font-light text-xs">Minimum</Label>
          <div className="relative">
            <Input
              aria-label="Enter minimum value"
              className="peer w-full ps-7"
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
            <Currency className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50" />
          </div>
        </div>
        <div>
          <Label className="font-light text-xs">Maximum</Label>
          <div className="relative">
            <Input
              aria-label="Enter maximum value"
              className="peer w-full ps-7"
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
            <Currency className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50" />
          </div>
        </div>
      </div>
      <Separator />
      <FormDescription>
        From <Currency />
        {inputValues[0]} to <Currency />
        {inputValues[1]}
      </FormDescription>
    </div>
  );
}
