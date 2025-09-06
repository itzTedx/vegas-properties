import { LogoMono } from "@/assets/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center ">
          <h2 className="font-medium text-4xl lg:text-5xl tracking-tight font-sans">Trusted by thousands of Vegas property owners</h2>
          <p>
            Vegas Properties has revolutionized the way people buy, sell, and invest in Las Vegas real estate. 
            Our comprehensive platform connects property owners with the right opportunities in the entertainment capital of the world.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardHeader>
             <LogoMono className="h-5 w-auto" />
            </CardHeader>
            <CardContent>
              <blockquote  className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className=" text-lg">
                  Vegas Properties made my dream of owning a luxury condo on the Strip a reality. Their team's 
                  expertise in the Vegas market is unmatched. From finding the perfect property to closing the deal, 
                  everything was seamless. I couldn't be happier with my investment in this vibrant city.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      alt="Sarah Mitchell"
                      height="400"
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
                      width="400"
                    />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium text-sm">Sarah Mitchell</p>
                    <span className="block text-muted-foreground text-xs">Luxury Condo Owner</span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="p-4 h-full">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-lg">
                  As a real estate investor, Vegas Properties has been my go-to platform. The market insights 
                  and property analytics they provide are incredibly valuable for making smart investment decisions.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      alt="Michael Rodriguez"
                      height="400"
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                      width="400"
                    />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Michael Rodriguez</p>
                    <span className="block text-muted-foreground text-xs">Real Estate Investor</span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 h-full">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-sm">
                  Found my perfect home in Summerlin through Vegas Properties. The process was smooth and 
                  the team was incredibly helpful throughout the entire journey.
                </p>

                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      alt="Jennifer Chen"
                      height="400"
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
                      width="400"
                    />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Jennifer Chen</p>
                    <span className="block text-muted-foreground text-xs">Homeowner, Summerlin</span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card >
            <CardContent className="p-4 h-full">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-sm">
                  Vegas Properties helped me sell my Henderson property for above asking price. Their 
                  marketing strategy and local expertise made all the difference.
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      alt="David Thompson"
                      height="400"
                      loading="lazy"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      width="400"
                    />
                    <AvatarFallback>DT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">David Thompson</p>
                    <span className="block text-muted-foreground text-xs">Property Seller, Henderson</span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
