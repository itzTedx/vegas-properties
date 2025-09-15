"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Currency } from "@/components/ui/currency";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IconApartment, IconChevronUpDown, IconPenthouse, IconVilla } from "@/assets/icons";

import { pluralize } from "@/lib/functions/pluralize";
import { cn } from "@/lib/utils";

import { SearchFormType, searchSchema } from "../actions/schema";
import PriceRange from "./ui/price-range";

interface Props {
  width?: string;
  className?: string;
  prices: {
    min: number;
    max: number;
  };
  initialValue?: SearchFormType;
}

export function SearchFilter({ width, className, prices, initialValue }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SearchFormType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: initialValue?.location ?? "",
      type: initialValue?.type ?? "",
      priceRange: initialValue?.priceRange ?? "",
      bedrooms: initialValue?.bedrooms ?? "",
    },
  });

  const formatPriceRange = (value?: string) => {
    if (!value) return "Any";
    const [min, max] = value.split("-").map(Number);
    const formatPrice = (price: number) => {
      return price === 200 ? `${price.toLocaleString()}+` : `${price.toLocaleString()}`;
    };
    return (
      <>
        <Currency className="text-xs leading-0" />
        {formatPrice(min)} - <Currency className="text-xs leading-0" />
        {formatPrice(max)}
      </>
    );
  };

  function onSubmit(data: SearchFormType) {
    startTransition(() => {
      const searchParams = new URLSearchParams();
      if (data.location) {
        searchParams.set("location", data.location?.trim() ?? "");
      }
      if (data.type) {
        searchParams.set("type", data.type?.trim() ?? "");
      }
      if (data.bedrooms) {
        searchParams.set("bedrooms", data.bedrooms?.trim() ?? "");
      }
      if (data.priceRange) {
        searchParams.set("priceRange", data.priceRange?.trim() ?? "");
      }
      router.push(`/search?${searchParams.toString()}`);
    });
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          "relative z-50 flex flex-col gap-3 rounded-xl bg-card px-6 py-5 md:flex-row md:items-end",
          width && "mx-auto",
          width,
          className
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Search by City or Project</FormLabel>
              <FormControl>
                <Input {...field} placeholder="All Locations" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full md:min-w-36">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8"
                  id={field.name}
                  position="item-aligned"
                >
                  <SelectGroup>
                    <SelectLabel className="ps-2">Property Type</SelectLabel>
                    <SelectItem value="apartment">
                      <IconApartment />
                      <span className="truncate">Apartment</span>
                    </SelectItem>
                    <SelectItem value="villa">
                      <IconVilla />
                      <span className="truncate">Villa</span>
                    </SelectItem>
                    <SelectItem value="townhouse">
                      <IconPenthouse />
                      <span className="truncate">Townhouse</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full md:min-w-36">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8"
                  id={field.name}
                >
                  <SelectGroup>
                    <SelectLabel className="ps-2">Bedrooms</SelectLabel>
                    <SelectItem value="1">
                      <span className="truncate">1 {pluralize("bedroom", 1)}</span>
                    </SelectItem>
                    <SelectItem value="2">
                      <span className="truncate">2 {pluralize("bedroom", 2)}</span>
                    </SelectItem>
                    <SelectItem value="3">
                      <span className="truncate">3 {pluralize("bedroom", 3)}</span>
                    </SelectItem>
                    <SelectItem value="4">
                      <span className="truncate">4 {pluralize("bedroom", 4)}</span>
                    </SelectItem>
                    <SelectItem value="5+">
                      <span className="truncate">5+ {pluralize("bedroom", 5)}</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Range</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-full justify-between bg-transparent font-normal text-muted-foreground md:min-w-56"
                      variant="outline"
                    >
                      <span className="flex items-center gap-1">{formatPriceRange(field.value)}</span>
                      <IconChevronUpDown className="opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-80 p-3">
                    <PriceRange
                      className="w-full"
                      max={prices.max}
                      min={prices.min}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="max-sm:w-full" disabled={isPending} size="lg" type="submit">
          <LoadingSwap isLoading={isPending}>Search Property</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
