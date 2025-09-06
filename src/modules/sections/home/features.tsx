import Image from "next/image";

import { MapPin, Shield, Smartphone, Users } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="container max-w-7xl py-16 md:py-20">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
        <div className="lg:col-span-2">
          <div className="md:pr-6 lg:pr-0">
            <h2 className="font-sans font-semibold text-4xl">Why Dubai Investors Choose Vegas Properties</h2>
            <p className="mt-6">
              We don't just sell properties, we create long-term value for homeowners and investors alike.
            </p>
          </div>
          <ul className="mt-8 divide-y border-y">
            <li className="flex items-center gap-3 py-1">
              <Shield className="size-5" />
              <div>
                <h3 className="font-medium font-sans text-lg">Transparent Deals</h3>
                <p className="text-muted-foreground text-xs">100% verified listings and clear, honest communication.</p>
              </div>
            </li>
            <li className="flex items-center gap-3 py-1">
              <MapPin className="size-5" />
              <div>
                <h3 className="font-medium font-sans text-lg">Prime Locations</h3>
                <p className="text-muted-foreground text-xs">
                  Access to Dubai's most desirable communities and iconic developments.
                </p>
              </div>
            </li>
            <li className="flex items-center gap-3 py-1">
              <Users className="size-5" />
              <div>
                <h3 className="font-medium font-sans text-lg">Expert Guidance</h3>
                <p className="text-muted-foreground text-xs">
                  Our team brings years of experience to simplify every step of your journey.
                </p>
              </div>
            </li>
            <li className="flex items-center gap-3 py-1">
              <Smartphone className="size-5" />
              <div>
                <h3 className="font-medium font-sans text-lg">Digital Experience</h3>
                <p className="text-muted-foreground text-xs">
                  From virtual tours to online payments, manage everything seamlessly.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative rounded-3xl border border-border/50 p-3 lg:col-span-3">
          <div className="relative aspect-76/59 rounded-2xl bg-linear-to-b from-zinc-300 to-transparent p-px dark:from-zinc-700">
            <Image
              alt="Dubai properties illustration dark"
              className="hidden rounded-[15px] dark:block"
              height={929}
              src="/payments.png"
              width={1207}
            />
            <Image
              alt="Dubai properties illustration light"
              className="rounded-[15px] shadow dark:hidden"
              height={929}
              src="/payments-light.png"
              width={1207}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
