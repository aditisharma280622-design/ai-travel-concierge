import Hero from "@/components/landing/Hero";
import WorldMapScene from "@/components/landing/WorldMapScene";
import ScrollQuote from "@/components/landing/ScrollQuote";
import AboutVoyara from "@/components/landing/AboutVoyara";
import JourneyCTA from "@/components/landing/JourneyCTA";
import { scrollQuotes } from "@/lib/landingContent";

export default function Home() {
  return (
    <>
      <Hero />
      <WorldMapScene />
      <ScrollQuote quote={scrollQuotes[0]} />
      <AboutVoyara />
      <ScrollQuote quote={scrollQuotes[1]} />
      <JourneyCTA />
    </>
  );
}
