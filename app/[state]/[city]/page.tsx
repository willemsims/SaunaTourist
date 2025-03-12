// app/[state]/[city]/page.tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import mongoose from 'mongoose'
import Sauna from '@/models/Sauna'
import City from '@/models/City'

interface CityPageProps {
  params: {
    state: string
    city: string
  }
}

async function getCityData(citySlug: string) {
  if (!process.env.MONGODB_URI) {
    throw new Error('MongoDB URI is not defined')
  }

  // Connect to MongoDB if not already connected
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI)
  }

  // Find city data
  const cityData = await City.findOne({ slug: citySlug })
  if (!cityData) {
    return null
  }

  // Find saunas for this city
  const saunas = await Sauna.find({ citySlug })

  return {
    name: cityData.name,
    province: cityData.province,
    saunas: saunas.map(sauna => ({
      id: sauna._id.toString(),
      name: sauna.name,
      address: sauna.street || '',
      rating: sauna.rating || 0,
      reviewCount: sauna.reviewCount || 0,
      image: sauna.images && sauna.images.length > 0 
        ? sauna.images[0] 
        : '/placeholder.svg?height=400&width=600',
      description: sauna.description || 'No description available'
    }))
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { state, city } = params
  
  // Get real data from MongoDB
  const cityData = await getCityData(city)
  
  // Handle case where city is not found
  if (!cityData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container px-4 py-6 md:px-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-6">City Not Found</h1>
            <p>Sorry, we couldn't find any information for this city.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">Saunas in {cityData.name}, {cityData.province}</h1>
          
          {cityData.saunas.length === 0 ? (
            <p>No saunas found in this city.</p>
          ) : (
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
                      {sauna.rating > 0 && (
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                          <span className="ml-1 font-medium">{sauna.rating}</span>
                          <span className="ml-1 text-muted-foreground">
                            ({sauna.reviewCount || 0} reviews)
                          </span>
                        </div>
                      )}
                      <p className="mt-2">{sauna.description}</p>
                      <Button className="mt-4" asChild>
                        <Link href={`/sauna/${sauna.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}