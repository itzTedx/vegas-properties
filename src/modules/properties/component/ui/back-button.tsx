import { Button } from "@/components/ui/button";

import { IconArrowRight } from "@/assets/icons/arrows";

export const BackButton = () => {
  return (
    <Button variant="ghost">
      <IconArrowRight className="rotate-180" />
      Properties
    </Button>
  );
};
