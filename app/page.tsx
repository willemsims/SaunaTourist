"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CityCard } from "@/components/city/city-card"
import { ProvinceCitySelector } from "@/components/province/province-city-selector"
import { useEffect } from "react"

export default function Home() {
  // Handle hash navigation when coming from other pages
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  // All Canadian provinces and territories with their cities
  const provinces = [
    { 
      name: "Alberta", 
      slug: "ab",
      cities: [
        { name: "Calgary", slug: "calgary" },
        { name: "Edmonton", slug: "edmonton" },
        { name: "Banff", slug: "banff" },
        { name: "Jasper", slug: "jasper" },
        { name: "Canmore", slug: "canmore" },
        { name: "Red Deer", slug: "red-deer" },
        { name: "Lethbridge", slug: "lethbridge" },
      ]
    },
    { 
      name: "British Columbia", 
      slug: "bc",
      cities: [
        { name: "Vancouver", slug: "vancouver" },
        { name: "Victoria", slug: "victoria" },
        { name: "Whistler", slug: "whistler" },
        { name: "Kelowna", slug: "kelowna" },
        { name: "Tofino", slug: "tofino" },
        { name: "Nanaimo", slug: "nanaimo" },
        { name: "Kamloops", slug: "kamloops" },
        { name: "Prince George", slug: "prince-george" },
      ]
    },
    { 
      name: "Manitoba", 
      slug: "mb",
      cities: [
        { name: "Winnipeg", slug: "winnipeg" },
        { name: "Brandon", slug: "brandon" },
        { name: "Churchill", slug: "churchill" },
        { name: "Steinbach", slug: "steinbach" },
        { name: "Thompson", slug: "thompson" },
      ]
    },
    { 
      name: "New Brunswick", 
      slug: "nb",
      cities: [
        { name: "Fredericton", slug: "fredericton" },
        { name: "Saint John", slug: "saint-john" },
        { name: "Moncton", slug: "moncton" },
        { name: "Edmundston", slug: "edmundston" },
      ]
    },
    { 
      name: "Newfoundland and Labrador", 
      slug: "nl",
      cities: [
        { name: "St. John's", slug: "st-johns" },
        { name: "Corner Brook", slug: "corner-brook" },
        { name: "Gander", slug: "gander" },
        { name: "Labrador City", slug: "labrador-city" },
      ]
    },
    { 
      name: "Northwest Territories", 
      slug: "nt",
      cities: [
        { name: "Yellowknife", slug: "yellowknife" },
        { name: "Inuvik", slug: "inuvik" },
        { name: "Hay River", slug: "hay-river" },
      ]
    },
    { 
      name: "Nova Scotia", 
      slug: "ns",
      cities: [
        { name: "Halifax", slug: "halifax" },
        { name: "Sydney", slug: "sydney" },
        { name: "Dartmouth", slug: "dartmouth" },
        { name: "Truro", slug: "truro" },
        { name: "Lunenburg", slug: "lunenburg" },
      ]
    },
    { 
      name: "Nunavut", 
      slug: "nu",
      cities: [
        { name: "Iqaluit", slug: "iqaluit" },
        { name: "Rankin Inlet", slug: "rankin-inlet" },
        { name: "Cambridge Bay", slug: "cambridge-bay" },
      ]
    },
    { 
      name: "Ontario", 
      slug: "on",
      cities: [
        { name: "Toronto", slug: "toronto" },
        { name: "Ottawa", slug: "ottawa" },
        { name: "Mississauga", slug: "mississauga" },
        { name: "Hamilton", slug: "hamilton" },
        { name: "London", slug: "london" },
        { name: "Niagara Falls", slug: "niagara-falls" },
        { name: "Kingston", slug: "kingston" },
        { name: "Windsor", slug: "windsor" },
        { name: "Sudbury", slug: "sudbury" },
        { name: "Thunder Bay", slug: "thunder-bay" },
      ]
    },
    { 
      name: "Prince Edward Island", 
      slug: "pe",
      cities: [
        { name: "Charlottetown", slug: "charlottetown" },
        { name: "Summerside", slug: "summerside" },
        { name: "Montague", slug: "montague" },
      ]
    },
    { 
      name: "Quebec", 
      slug: "qc",
      cities: [
        { name: "Montreal", slug: "montreal" },
        { name: "Quebec City", slug: "quebec-city" },
        { name: "Gatineau", slug: "gatineau" },
        { name: "Sherbrooke", slug: "sherbrooke" },
        { name: "Trois-Rivières", slug: "trois-rivieres" },
        { name: "Mont-Tremblant", slug: "mont-tremblant" },
        { name: "Laval", slug: "laval" },
      ]
    },
    { 
      name: "Saskatchewan", 
      slug: "sk",
      cities: [
        { name: "Regina", slug: "regina" },
        { name: "Saskatoon", slug: "saskatoon" },
        { name: "Moose Jaw", slug: "moose-jaw" },
        { name: "Prince Albert", slug: "prince-albert" },
      ]
    },
    { 
      name: "Yukon", 
      slug: "yt",
      cities: [
        { name: "Whitehorse", slug: "whitehorse" },
        { name: "Dawson City", slug: "dawson-city" },
        { name: "Watson Lake", slug: "watson-lake" },
      ]
    },
  ]

  // Popular cities with saunas (for the featured section)
  const popularCities = [
    { name: "Victoria", province: "bc", slug: "victoria", image: "/images/cities/victoria_bc_inner-harbour.jpeg" },
    { name: "Vancouver", province: "bc", slug: "vancouver", image: "/images/cities/vancouver_bc_aerial-shot.jpeg" },
    { name: "Toronto", province: "on", slug: "toronto", image: "/images/cities/toronto-skyline.jpeg" },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "Sauna vs steam room",
      answer: "While both provide heat therapy, saunas and steam rooms differ in humidity levels and heat transfer. <strong>Saunas use dry heat</strong>, whereas <strong>steam rooms use moist heat</strong>. <br /><br /> Steam rooms often feel hotter than saunas because water retains and transfers heat more efficiently than air. This is why a 60°C (140°F) sauna feels relatively mild, while water at the same temperature would scald your skin within seconds."
    },
    {
      question: "How long should I stay in a sauna?",
      answer: "For most people, <strong>5 to 20 minutes per session</strong> is a safe starting point and enough to experience benefits such as improved cardiovascular health, mood, and stress resilience.<br /><br />A 2018 study found that people who used a sauna <strong>4-7 times per week</strong> were <strong>50% less likely to die from a cardiovascular event</strong> compared to those who only went once per week! Participants in the study typically spent 5 to 20 minutes per session at temperatures ranging from 80°C (176°F) to 100°C (212°F)."
    },
    {
      question: "Does the sauna burn calories?",
      answer: "<strong>Yes, saunas can help burn calories.</strong> Sitting in a sauna increases your heart rate and stimulates your metabolism, causing your body to burn calories, similar to light activity.<br /><br />A 20-minute session can burn <strong>30-100 calories</strong>, depending on body weight and temperature."
    },
    {
      question: "How hot is a sauna?",
      answer: "Saunas typically range from <strong>80°C (176°F) to 100°C (212°F)</strong>. Temperature is typically measured at the ceiling—since heat rises.<br /><br />The temperature on different bench levels can vary significantly, with the lowest bench often being <strong>10-20°C (18-36°F) cooler</strong> than the top bench."
    },
    {
      question: "Should you sauna when you're sick?",
      answer: "A mild sauna session might feel comforting when you're sick, but it's important to remember that, <strong>like exercise, saunas are a physical stressor on the body</strong>.<br /><br />When you're ill, rest and recovery should be the priority. <strong>It's best to wait until you're feeling better</strong> before using the sauna."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-blue-50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find the Best Sauna Near You
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover top-rated saunas across Canada. From traditional Finnish saunas to modern spa experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Cities Section */}
        <section className="container px-4 py-8 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Popular Cities for Saunas</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {popularCities.map((city) => (
              <CityCard
                key={`${city.province}-${city.slug}`}
                name={city.name}
                province={city.province}
                slug={city.slug}
                image={city.image}
              />
            ))}
          </div>
        </section>

        {/* Browse by Province/City Section */}
        <section id="browse-locations" className="container px-4 py-12 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Browse Saunas by Location</h2>
          <ProvinceCitySelector provinces={provinces} />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container px-4 py-12 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 