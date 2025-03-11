import Link from "next/link"
import Image from "next/image"

interface CityCardProps {
  name: string
  province: string
  slug: string
  image: string
}

export function CityCard({ name, province, slug, image }: CityCardProps) {
  return (
    <Link 
      href={`/${province}/${slug}`}
      className="group overflow-hidden rounded-lg border hover:border-blue-500 transition-colors"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={`Saunas in ${name}`} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 w-full p-4 text-white">
          <h3 className="text-lg font-medium">{name}</h3>
        </div>
      </div>
    </Link>
  )
} 