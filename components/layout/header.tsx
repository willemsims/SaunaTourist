import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Sauna Directory Logo" 
            width={150} 
            height={50} 
            className="h-auto" 
            priority
          />
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Input type="search" placeholder="Search for saunas near you..." className="pr-10" />
            <Button size="sm" className="absolute right-0 top-0 h-full rounded-l-none">
              Search
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 