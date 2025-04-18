"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Calendar,
  Ruler,
  Bed,
  Bath,
  Car,
  CheckCircle,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  MessageSquare,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock data for the property
const property = {
  id: 1,
  title: "Golden Urban House For Sell",
  price: "$12,345",
  address: "123 Street, New York, USA",
  type: "Villa",
  status: "sell",
  description:
    "Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo. Ipsum diam justo sed rebum vero dolor duo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  sqft: "1000",
  beds: 3,
  baths: 2,
  garage: 1,
  yearBuilt: 2018,
  amenities: [
    "Air Conditioning",
    "Swimming Pool",
    "Central Heating",
    "Garden",
    "Gym",
    "Security System",
    "Parking",
    "Balcony",
    "Elevator",
  ],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  agent: {
    name: "John Doe",
    title: "Real Estate Agent",
    phone: "+012 345 67890",
    email: "john.doe@example.com",
    image: "/placeholder.svg?height=150&width=150",
  },
  relatedProperties: [
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
  ],
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("description")

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length)
  }

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert("Your message has been sent to the agent!")
  }

  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/50 py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-emerald-500">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/property" className="hover:text-emerald-500">
              Property
            </Link>
            <span className="mx-2">/</span>
            <span className="text-emerald-500">Property Details</span>
          </div>

          {/* Property Title and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-navy-800">{property.title}</h1>
              <p className="flex items-center text-gray-500 mt-2">
                <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                {property.address}
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Property Images */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
                <div className="relative h-[400px] md:h-[500px] w-full">
                  <Image
                    src={property.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`Property image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-navy-800 flex items-center justify-center z-10 hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-navy-800 flex items-center justify-center z-10 hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? "bg-emerald-500" : "bg-white/70"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                        index === currentImageIndex ? "ring-2 ring-emerald-500" : ""
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Property thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Details Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="border-b">
                    <TabsList className="w-full justify-start rounded-none bg-transparent border-b p-0">
                      <TabsTrigger
                        value="description"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                      >
                        Description
                      </TabsTrigger>
                      <TabsTrigger
                        value="details"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                      >
                        Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="amenities"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                      >
                        Amenities
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="description" className="p-6">
                    <h3 className="text-xl font-bold text-navy-800 mb-4">Property Description</h3>
                    <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
                  </TabsContent>

                  <TabsContent value="details" className="p-6">
                    <h3 className="text-xl font-bold text-navy-800 mb-4">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Property ID:</span>
                          <span className="font-medium">#{property.id}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Property Type:</span>
                          <span className="font-medium">{property.type}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Property Status:</span>
                          <span className="font-medium capitalize">For {property.status}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Property Price:</span>
                          <span className="font-medium">{property.price}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Area:</span>
                          <span className="font-medium">{property.sqft} Sqft</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Bedrooms:</span>
                          <span className="font-medium">{property.beds}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Bathrooms:</span>
                          <span className="font-medium">{property.baths}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Year Built:</span>
                          <span className="font-medium">{property.yearBuilt}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="amenities" className="p-6">
                    <h3 className="text-xl font-bold text-navy-800 mb-4">Property Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-emerald-500" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Related Properties */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-xl font-bold text-navy-800 mb-6">Related Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {property.relatedProperties.map((relatedProperty) => (
                    <Link href={`/property/${relatedProperty.id}`} key={relatedProperty.id}>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative">
                          <div className="absolute top-4 left-4 z-10">
                            <span
                              className={`px-3 py-1 text-sm font-medium text-white rounded-md ${
                                relatedProperty.status === "sell" ? "bg-emerald-500" : "bg-emerald-500"
                              }`}
                            >
                              For {relatedProperty.status === "sell" ? "Sell" : "Rent"}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 z-10">
                            <span className="px-3 py-1 text-sm font-medium text-emerald-500 bg-white rounded-md">
                              {relatedProperty.type}
                            </span>
                          </div>
                          <div className="relative h-48 w-full">
                            <Image
                              src={relatedProperty.image || "/placeholder.svg"}
                              alt={relatedProperty.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-2">
                            <span className="text-lg font-bold text-emerald-500">{relatedProperty.price}</span>
                          </div>
                          <h3 className="text-base font-bold text-navy-800 mb-2 line-clamp-1">
                            {relatedProperty.title}
                          </h3>
                          <div className="flex items-center text-gray-500 mb-3">
                            <MapPin className="w-3 h-3 mr-1 text-emerald-500" />
                            <span className="text-xs line-clamp-1">{relatedProperty.address}</span>
                          </div>
                          <div className="grid grid-cols-3 border-t border-gray-200 pt-3">
                            <div className="flex items-center justify-center">
                              <Ruler className="w-3 h-3 mr-1 text-emerald-500" />
                              <span className="text-xs">{relatedProperty.sqft} Sqft</span>
                            </div>
                            <div className="flex items-center justify-center">
                              <Bed className="w-3 h-3 mr-1 text-emerald-500" />
                              <span className="text-xs">{relatedProperty.beds} Bed</span>
                            </div>
                            <div className="flex items-center justify-center">
                              <Bath className="w-3 h-3 mr-1 text-emerald-500" />
                              <span className="text-xs">{relatedProperty.baths} Bath</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Property Summary */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-emerald-500">{property.price}</h3>
                    <Badge
                      className={`${
                        property.status === "sell" ? "bg-emerald-500" : "bg-emerald-500"
                      } hover:bg-emerald-600`}
                    >
                      For {property.status === "sell" ? "Sell" : "Rent"}
                    </Badge>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Ruler className="w-5 h-5 mr-3 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500">Area</p>
                        <p className="font-medium">{property.sqft} Sqft</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Bed className="w-5 h-5 mr-3 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500">Bedrooms</p>
                        <p className="font-medium">{property.beds}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-5 h-5 mr-3 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500">Bathrooms</p>
                        <p className="font-medium">{property.baths}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Car className="w-5 h-5 mr-3 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500">Garage</p>
                        <p className="font-medium">{property.garage}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500">Year Built</p>
                        <p className="font-medium">{property.yearBuilt}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Information */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy-800 mb-4">Property Agent</h3>
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={property.agent.image || "/placeholder.svg"}
                        alt={property.agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800">{property.agent.name}</h4>
                      <p className="text-gray-500 text-sm">{property.agent.title}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-emerald-500" />
                      <a href={`tel:${property.agent.phone}`} className="hover:text-emerald-500">
                        {property.agent.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-emerald-500" />
                      <a href={`mailto:${property.agent.email}`} className="hover:text-emerald-500">
                        {property.agent.email}
                      </a>
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View All Listings
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-navy-800 mb-4">Contact Agent</h3>
                  <form onSubmit={handleSubmitContactForm} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Your Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Your Phone</Label>
                      <Input id="phone" placeholder="Enter your phone" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="I'm interested in this property..."
                        className="mt-1 min-h-[120px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
