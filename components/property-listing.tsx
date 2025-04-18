"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Ruler, Bed, Bath } from "lucide-react"

type Property = {
  id: number
  title: string
  price: string
  address: string
  type: string
  status: "sell" | "rent"
  image: string
  sqft: string
  beds: number
  baths: number
}

export default function PropertyListing() {
  const [activeFilter, setActiveFilter] = useState<"featured" | "sell" | "rent">("featured")

  const properties: Property[] = [
    {
      id: 1,
      title: "Golden Urban House For Sell",
      price: "$12,345",
      address: "123 Street, New York, USA",
      type: "Apartment",
      status: "sell",
      image: "/placeholder.svg?height=300&width=400",
      sqft: "1000",
      beds: 3,
      baths: 2,
    },
    {
      id: 2,
      title: "Golden Urban House For Sell",
      price: "$12,345",
      address: "123 Street, New York, USA",
      type: "Villa",
      status: "rent",
      image: "/placeholder.svg?height=300&width=400",
      sqft: "1000",
      beds: 3,
      baths: 2,
    },
    {
      id: 3,
      title: "Golden Urban House For Sell",
      price: "$12,345",
      address: "123 Street, New York, USA",
      type: "Office",
      status: "sell",
      image: "/placeholder.svg?height=300&width=400",
      sqft: "1000",
      beds: 3,
      baths: 2,
    },
    {
      id: 4,
      title: "Modern Family Home For Rent",
      price: "$14,500",
      address: "456 Avenue, Chicago, USA",
      type: "House",
      status: "rent",
      image: "/placeholder.svg?height=300&width=400",
      sqft: "1200",
      beds: 4,
      baths: 3,
    },
    {
      id: 5,
      title: "Cozy Cottage For Sell",
      price: "$9,999",
      address: "789 Lane, Boston, USA",
      type: "Cottage",
      status: "sell",
      image: "/placeholder.svg?height=300&width=400",
      sqft: "850",
      beds: 2,
      baths: 1,
    },
    {
      id: 6,
      title: "Luxury Penthouse For Rent",
      price: "$18,750",
      address: "101 Boulevard, Miami, USA",
      type: "Penthouse",
      status: "rent",
      image: "/placeholder.svg?height=300&width=400",
      sqft: "1500",
      beds: 5,
      baths: 4,
    },
  ]

  const filteredProperties =
    activeFilter === "featured" ? properties : properties.filter((property) => property.status === activeFilter)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Property Listing</h2>
            <p className="text-gray-600 max-w-2xl">
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit
              diam justo sed rebum.
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant={activeFilter === "featured" ? "default" : "outline"}
              className={activeFilter === "featured" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              onClick={() => setActiveFilter("featured")}
            >
              Featured
            </Button>
            <Button
              variant={activeFilter === "sell" ? "default" : "outline"}
              className={activeFilter === "sell" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              onClick={() => setActiveFilter("sell")}
            >
              For Sell
            </Button>
            <Button
              variant={activeFilter === "rent" ? "default" : "outline"}
              className={activeFilter === "rent" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              onClick={() => setActiveFilter("rent")}
            >
              For Rent
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Link href={`/property/${property.id}`} key={property.id}>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 text-sm font-medium text-white rounded-md ${property.status === "sell" ? "bg-emerald-500" : "bg-emerald-500"}`}
                    >
                      For {property.status === "sell" ? "Sell" : "Rent"}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 text-sm font-medium text-emerald-500 bg-white rounded-md">
                      {property.type}
                    </span>
                  </div>
                  <div className="relative h-64 w-full">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-emerald-500">{property.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                    <span className="text-sm">{property.address}</span>
                  </div>
                  <div className="grid grid-cols-3 border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-center">
                      <Ruler className="w-4 h-4 mr-1 text-emerald-500" />
                      <span className="text-sm">{property.sqft} Sqft</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Bed className="w-4 h-4 mr-1 text-emerald-500" />
                      <span className="text-sm">{property.beds} Bed</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Bath className="w-4 h-4 mr-1 text-emerald-500" />
                      <span className="text-sm">{property.baths} Bath</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
