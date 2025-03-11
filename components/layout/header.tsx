"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  
  // Function to handle scrolling to sections
  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      // If on homepage, scroll to the section
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // If not on homepage, navigate to homepage with hash
      window.location.href = `/#${sectionId}`
    }
  }

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
        <nav className="flex gap-6">
          <button 
            onClick={() => scrollToSection("browse-locations")}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Find a Sauna
          </button>
          <button 
            onClick={() => scrollToSection("faq")}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            FAQ
          </button>
        </nav>
      </div>
    </header>
  )
} 