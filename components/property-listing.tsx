"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Ruler, Bed, Bath, Loader2 } from "lucide-react"
import { toast } from "sonner"

type Property = {
   _id: string
   title: string
   price: number
   address: string
   type: string
   status: "for-sale" | "for-rent"
   images: { url: string }[]
   features: {
      area: number
      bedrooms: number
      bathrooms: number
   }
}

export default function PropertyListing() {
   const [activeFilter, setActiveFilter] = useState<"featured" | "for-sale" | "for-rent">("featured")
   const [properties, setProperties] = useState<Property[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      const fetchProperties = async () => {
         try {
            setIsLoading(true)
            const response = await fetch('/api/property')

            if (!response.ok) {
               throw new Error('Failed to fetch properties')
            }

            const data = await response.json()
            setProperties(data.properties)
         } catch (err) {
            console.error('Error fetching properties:', err)
            setError('Failed to load properties. Please try again later.')
            toast.error('Failed to load properties')
         } finally {
            setIsLoading(false)
         }
      }

      fetchProperties()
   }, [])

   const filteredProperties =
      activeFilter === "featured"
         ? properties
         : properties.filter((property) => property.status === activeFilter)

   return (
      <section className="py-16 bg-white">
         <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Property Listing</h2>
                  <p className="text-gray-600 max-w-2xl">
                     Browse our selection of premium properties available for sale or rent. Find your perfect home today.
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
                     variant={activeFilter === "for-sale" ? "default" : "outline"}
                     className={activeFilter === "for-sale" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                     onClick={() => setActiveFilter("for-sale")}
                  >
                     For Sell
                  </Button>
                  <Button
                     variant={activeFilter === "for-rent" ? "default" : "outline"}
                     className={activeFilter === "for-rent" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                     onClick={() => setActiveFilter("for-rent")}
                  >
                     For Rent
                  </Button>
               </div>
            </div>

            {isLoading ? (
               <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
               </div>
            ) : error ? (
               <div className="text-center py-20">
                  <p className="text-red-500">{error}</p>
                  <Button
                     className="mt-4 bg-emerald-500 hover:bg-emerald-600"
                     onClick={() => window.location.reload()}
                  >
                     Try Again
                  </Button>
               </div>
            ) : filteredProperties.length === 0 ? (
               <div className="text-center py-20">
                  <p className="text-gray-500">No properties found matching your criteria.</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                     <Link href={`/property/${property._id}`} key={property._id}>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                           <div className="relative">
                              <div className="absolute top-4 left-4 z-10">
                                 <span
                                    className={`px-3 py-1 text-sm font-medium text-white rounded-md ${property.status === "for-sale" ? "bg-emerald-500" : "bg-emerald-500"
                                       }`}
                                 >
                                    For {property.status === "for-sale" ? "Sell" : "Rent"}
                                 </span>
                              </div>
                              <div className="absolute bottom-4 left-4 z-10">
                                 <span className="px-3 py-1 text-sm font-medium text-emerald-500 bg-white rounded-md">
                                    {property.type}
                                 </span>
                              </div>
                              <div className="relative h-64 w-full">
                                 <Image
                                    src={property.images && property.images.length > 0 ? property.images[0].url : "/placeholder.svg"}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                 />
                              </div>
                           </div>
                           <div className="p-4">
                              <div className="mb-2">
                                 <span className="text-2xl font-bold text-emerald-500">${property.price.toLocaleString()}</span>
                              </div>
                              <h3 className="text-xl font-bold text-navy-800 mb-2">{property.title}</h3>
                              <div className="flex items-center text-gray-500 mb-4">
                                 <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                                 <span className="text-sm">{property.address}</span>
                              </div>
                              <div className="grid grid-cols-3 border-t border-gray-200 pt-4">
                                 <div className="flex items-center justify-center">
                                    <Ruler className="w-4 h-4 mr-1 text-emerald-500" />
                                    <span className="text-sm">{property.features.area} Sqft</span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                    <Bed className="w-4 h-4 mr-1 text-emerald-500" />
                                    <span className="text-sm">{property.features.bedrooms} Bed</span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                    <Bath className="w-4 h-4 mr-1 text-emerald-500" />
                                    <span className="text-sm">{property.features.bathrooms} Bath</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </section>
   )
}
