import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CityCard } from "@/components/city/city-card"

interface StatePageProps {
  params: { state: string }
}

export default function StatePage({ params }: StatePageProps) {
  const { state } = params
  
  // This would come from your database in a real implementation
  const stateData = {
    bc: {
      name: "British Columbia",
      cities: [
        { name: "Vancouver", slug: "vancouver", count: 12 },
        { name: "Victoria", slug: "victoria", count: 6 },
        { name: "Whistler", slug: "whistler", count: 4 },
        { name: "Kelowna", slug: "kelowna", count: 2 },
      ]
    },
    // Add more provinces as needed
  }[state] || { name: "Unknown Province", cities: [] }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all provinces
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">Saunas in {stateData.name}</h1>
          
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {stateData.cities.map((city) => (
              <CityCard
                key={city.slug}
                name={city.name}
                province={state}
                slug={city.slug}
                image={`/images/cities/${city.slug}.jpg`}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
