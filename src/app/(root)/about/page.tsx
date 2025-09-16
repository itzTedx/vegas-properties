import { CheckCircle2 } from "lucide-react";

import { Card, CardContainer, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { TunnelBackground } from "@/assets/tunnel-background";

export default function AboutPage() {
  return (
    <main className="container relative min-h-screen space-y-20 pt-6 pb-12">
      <TunnelBackground className="absolute top-0 left-0 w-full" />

      <header className="relative z-20 mx-auto max-w-prose space-y-4 pt-12 text-lg">
        <span className="block w-full text-center font-serif text-3xl">About Us</span>
        <h1 className="text-center font-medium">Your trusted partner in Dubai real estate</h1>
      </header>

      <section className="relative z-20 mx-auto max-w-prose space-y-10">
        <div className="space-y-6 text-lg md:col-span-7">
          <h1 className="font-medium">At Vegas Properties, we don’t just sell homes we create opportunities.</h1>
          <p>
            We create opportunities for people to live, invest, and thrive in one of the world’s most dynamic real
            estate markets. With years of expertise in Dubai and across the UAE, we specialize in connecting clients
            with premium properties that suit their lifestyle, investment goals, and vision for the future.
          </p>
          <p>
            Our team of dedicated professionals is passionate about delivering more than just transactions. We focus on
            building long-term relationships, ensuring every client receives tailored advice, transparent service, and
            unparalleled support throughout their real estate journey.
          </p>
          <p>
            Whether you are searching for a luxury residence, an off-plan investment, or a high-yield commercial space,
            Vegas Properties stands by your side with market insights, exclusive listings, and a commitment to
            excellence.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent>
              <CardHeader className="pt-3">
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContainer className="pb-2">
                <p>
                  To redefine real estate experiences by combining trust, innovation, and personalized solutions—helping
                  individuals and investors unlock the true potential of Dubai’s property market.
                </p>
              </CardContainer>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader className="pt-3">
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContainer className="pb-2">
                <p>
                  To be the most trusted and forward-thinking real estate partner, known for setting new standards in
                  client satisfaction, market expertise, and investment success.
                </p>
              </CardContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-prose space-y-8">
        <div>
          <h2 className="font-serif text-3xl">Why Choose Us</h2>
          <Separator className="mt-3 w-24" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Local Expertise</p>
              <p className="text-muted-foreground">Deep understanding of Dubai’s evolving real estate landscape.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Exclusive Access</p>
              <p className="text-muted-foreground">Priority listings and off-market opportunities.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Tailored Solutions</p>
              <p className="text-muted-foreground">Advice and property options built around your unique goals.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">End-to-End Support</p>
              <p className="text-muted-foreground">
                From property search to after-sales services, we’re with you every step.
              </p>
            </div>
          </div>
        </div>

        <p>
          At Vegas Properties, we believe your next move should be more than a property decision—it should be a
          life-changing investment.
        </p>
      </section>
    </main>
  );
}
