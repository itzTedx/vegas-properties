"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { IconArrowRight } from "@/assets/icons/arrows";

export const BackButton = () => {
  const router = useRouter();

  function handleBack() {
    router.back();
  }
  return (
    <Button onClick={handleBack} variant="ghost">
      <IconArrowRight className="rotate-180" />
      Properties
    </Button>
  );
};
