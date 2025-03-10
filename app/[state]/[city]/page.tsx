// app/[state]/[city]/page.tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface CityPageProps {
  params: { state: string; city: string }
}

export default function CityPage({ params }: CityPageProps) {
  const { state, city } = params
  
  // This would come from your database in a real implementation
  const cityData = {
    name: city.charAt(0).toUpperCase() + city.slice(1),
    state: state.toUpperCase(),
    saunas: [
      {
        id: "1",
        name: "Nordic Sauna Spa",
        address: "123 Main St",
        rating: 4.8,
        reviewCount: 124,
        image: "/placeholder.svg?height=400&width=600",
        description: "Authentic Finnish sauna experience with multiple temperature options."
      },
      {
        id: "2",
        name: "Urban Steam House",
        address: "456 Oak Ave",
        rating: 4.6,
        reviewCount: 98,
        image: "/placeholder.svg?height=400&width=600",
        description: "Modern sauna facility with multiple temperature rooms."
      },
      // Add more saunas as needed
    ]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={`/${state}`} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {state.toUpperCase()}
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">Saunas in {cityData.name}, {cityData.state}</h1>
          
          <div className="space-y-6">
            {cityData.saunas.map((sauna) => (
              <div key={sauna.id} className="border rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative h-48 md:h-full">
                    <Image 
                      src={sauna.image} 
                      alt={sauna.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 md:col-span-2">
                    <h2 className="text-xl font-bold">{sauna.name}</h2>
                    <p className="text-muted-foreground">{sauna.address}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="ml-1 font-medium">{sauna.rating}</span>
                      <span className="ml-1 text-muted-foreground">({sauna.reviewCount} reviews)</span>
                    </div>
                    <p className="mt-2">{sauna.description}</p>
                    <Button className="mt-4" asChild>
                      <Link href={`/sauna/${sauna.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}