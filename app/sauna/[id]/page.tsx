import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import mongoose from 'mongoose';
import Sauna from '@/models/Sauna';

interface SaunaPageProps {
  params: {
    id: string;
  };
}

async function getSaunaData(id: string) {
  if (!process.env.MONGODB_URI) {
    throw new Error('MongoDB URI is not defined');
  }

  // Connect to MongoDB if not already connected
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  // Find sauna by ID
  const sauna = await Sauna.findById(id);
  if (!sauna) {
    return null;
  }

  return {
    id: sauna._id.toString(),
    name: sauna.name,
    city: sauna.city,
    province: sauna.province,
    street: sauna.street || '',
    postalCode: sauna.postalCode || '',
    phone: sauna.phone || '',
    website: sauna.website || '',
    email: sauna.email || '',
    description: sauna.description || 'No description available',
    rating: sauna.rating || 0,
    reviewCount: sauna.reviewCount || 0,
    images: sauna.images || [],
    latitude: sauna.latitude,
    longitude: sauna.longitude
  };
}

export default async function SaunaPage({ params }: SaunaPageProps) {
  const { id } = params;
  
  // Get real data from MongoDB
  const sauna = await getSaunaData(id);
  
  // Handle case where sauna is not found
  if (!sauna) {
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
            <h1 className="text-3xl font-bold mb-6">Sauna Not Found</h1>
            <p>Sorry, we couldn't find the sauna you're looking for.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={`/${sauna.province.toLowerCase().replace(/\s+/g, '-')}/${sauna.city.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {sauna.city}
            </Link>
          </Button>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="relative h-80 w-full mb-4 rounded-lg overflow-hidden">
                <Image 
                  src={sauna.images.length > 0 ? sauna.images[0] : '/placeholder.svg?height=400&width=600'} 
                  alt={sauna.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              
              {sauna.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {sauna.images.slice(1, 5).map((image: string, index: number) => (
                    <div key={index} className="relative h-20 rounded-md overflow-hidden">
                      <Image 
                        src={image} 
                        alt={`${sauna.name} image ${index + 2}`} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{sauna.name}</h1>
              
              <div className="flex items-center mb-4">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {sauna.street}, {sauna.city}, {sauna.province} {sauna.postalCode}
                </span>
              </div>
              
              {sauna.rating > 0 && (
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
                  <span className="ml-1 font-medium text-lg">{sauna.rating}</span>
                  <span className="ml-1 text-muted-foreground">
                    ({sauna.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
              
              {sauna.phone && (
                <div className="flex items-center mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${sauna.phone}`} className="text-blue-600 hover:underline">
                    {sauna.phone}
                  </a>
                </div>
              )}
              
              {sauna.website && (
                <div className="flex items-center mb-4">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={sauna.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Visit Website
                  </a>
                </div>
              )}
              
              <h2 className="text-xl font-semibold mt-6 mb-2">About</h2>
              <p className="text-gray-700">{sauna.description}</p>
              
              {sauna.latitude && sauna.longitude && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Location</h2>
                  <div className="relative h-60 w-full rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${sauna.latitude},${sauna.longitude}`}
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 