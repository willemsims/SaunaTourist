"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface City {
  name: string
  slug: string
}

interface Province {
  name: string
  slug: string
  cities: City[]
}

interface ProvinceCitySelectorProps {
  provinces: Province[]
}

export function ProvinceCitySelector({ provinces }: ProvinceCitySelectorProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>(provinces[0]?.slug || "")
  
  // Find the currently selected province data
  const currentProvince = provinces.find(p => p.slug === selectedProvince) || provinces[0]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Province list - takes 1/4 of the space on desktop */}
      <div className="md:col-span-1 border-r pr-6">
        <h3 className="text-lg font-semibold mb-4">Provinces & Territories</h3>
        <div className="space-y-2">
          {provinces.map((province) => (
            <button
              key={province.slug}
              onClick={() => setSelectedProvince(province.slug)}
              className={cn(
                "w-full text-left py-2 px-3 rounded-md transition-colors",
                selectedProvince === province.slug 
                  ? "bg-blue-100 text-blue-900" 
                  : "hover:bg-gray-100"
              )}
            >
              <div className="font-medium">{province.name}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* City grid - takes 3/4 of the space on desktop */}
      <div className="md:col-span-3">
        <h3 className="text-lg font-semibold mb-4">
          Explore Saunas by City
        </h3>
        
        {currentProvince?.cities?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProvince.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${currentProvince.slug}/${city.slug}`}
                className="group block p-4 border rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="font-medium group-hover:text-blue-600">{city.name}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No cities available for this province.</p>
        )}
      </div>
    </div>
  )
} 