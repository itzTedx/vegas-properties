import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { IconSearch } from "@/assets/icons/search";

import { getPropertiesPriceRange } from "@/modules/search/actions/query";
import { SearchFilter } from "@/modules/search/components/search-filter";

export const MobileSearch = async () => {
  const { max, min } = await getPropertiesPriceRange();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <IconSearch />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Search Property</DrawerTitle>
          <DrawerDescription className="sr-only">Advanced Search filter </DrawerDescription>
        </DrawerHeader>
        <SearchFilter
          className=""
          prices={{
            max,
            min,
          }}
        />
        <DrawerFooter className="pt-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
