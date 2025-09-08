import { TunnelBackground } from "@/assets/tunnel-background";

export default function AboutPage() {
  return (
    <main className="container relative min-h-screen space-y-20 pt-6 pb-12">
      <TunnelBackground className="absolute top-0 left-0 w-full" />
      <header className="relative z-20 mx-auto max-w-prose space-y-4 pt-12 text-lg">
        <span className="block w-full text-center font-serif text-3xl">About Us</span>
        <h1 className="font-medium">Your trusted partner in Dubai real estate</h1>
        <p>
          At Vegas Properties, we don’t just sell properties - we help you{" "}
          <span className="font-medium">find a place to call home</span>, grow your investments, and achieve your real
          estate dreams in Dubai.
        </p>
        <h2 className="mt-12 font-serif text-3xl">Our Story.</h2>
        <h3 className="font-medium">A Legacy of Trust and Excellence</h3>
        <p>
          Founded with a vision to transform Dubai’s real estate experience, Vegas Properties has grown into one of the
          region’s most trusted real estate agencies.
        </p>
        <p>
          With years of experience in buying, selling, and managing properties, we have helped countless homeowners,
          investors, and developers navigate Dubai’s dynamic property market.
        </p>
        <p>
          Our commitment is simple: to provide personalized, transparent, and result-driven services that make real
          estate transactions seamless and stress-free. At Vegas Properties, every client is treated like a partner, and
          every property is handled with care and expertise.
        </p>
      </header>
    </main>
  );
}
