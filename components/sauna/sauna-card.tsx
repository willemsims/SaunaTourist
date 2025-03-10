import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SaunaCardProps {
  id: string
  name: string
  location: string
  image: string
  rating: number
  reviewCount: number
}

export function SaunaCard({
  id,
  name,
  location,
  image,
  rating,
  reviewCount,
}: SaunaCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{location}</p>
        <div className="flex items-center text-sm mt-2">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="ml-1 font-medium">{rating}</span>
          <span className="ml-1 text-muted-foreground">({reviewCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/sauna/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}