"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
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
   Loader2,
   Check,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { use } from "react"

interface Property {
   _id: string;
   title: string;
   description: string;
   price: number;
   location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
   };
   propertyType: string;
   status: string;
   images: {
      url: string;
      public_id: string;
   }[];
   features: {
      bedrooms: number;
      bathrooms: number;
      area: number;
      parking: number;
   };
   amenities: string[];
   createdAt: string;
   updatedAt: string;
   owner: {
      name: string;
      email: string;
      phone: string;
   };
}

// Helper function for price formatting
const formatPrice = (price: number): string => {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(price);
};

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const [activeTab, setActiveTab] = useState("description")
   const [property, setProperty] = useState<Property | null>(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)
   const [isSubmitting, setIsSubmitting] = useState(false)
   
   // Unwrap params using React.use()
   const unwrappedParams = use(params)
   const propertyId = unwrappedParams.id

   useEffect(() => {
      const fetchProperty = async () => {
         try {
            setIsLoading(true)
            const response = await fetch(`/api/property/${propertyId}`)

            if (!response.ok) {
               throw new Error('Failed to fetch property details')
            }

            const data = await response.json()
            setProperty(data.property)
         } catch (err) {
            console.error('Error fetching property:', err)
            setError('Failed to load property details. Please try again later.')
            toast.error('Failed to load property details')
         } finally {
            setIsLoading(false)
         }
      }

      fetchProperty()
   }, [propertyId])

   const nextImage = () => {
      if (property && property.images.length > 0) {
         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length)
      }
   }

   const prevImage = () => {
      if (property && property.images.length > 0) {
         setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length)
      }
   }

   const handleSubmitContactForm = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      try {
         const formData = new FormData(e.target as HTMLFormElement)
         const name = formData.get('name') as string
         const email = formData.get('email') as string
         const phone = formData.get('phone') as string
         const message = formData.get('message') as string

         const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               propertyId: propertyId,
               name,
               email,
               phone,
               message,
            }),
         })

         const data = await response.json()

         if (data.success) {
            toast.success('Message sent successfully!')
            // Reset form
            (e.target as HTMLFormElement).reset()
         } else {
            toast.error(data.message || 'Failed to send message')
         }
      } catch (error) {
         console.error('Error sending message:', error)
         toast.error('Failed to send message. Please try again later.')
      } finally {
         setIsSubmitting(false)
      }
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
               ) : property ? (
                  <>
                     {/* Property Title and Actions */}
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                           <h1 className="text-3xl font-bold text-navy-800">{property.title}</h1>
                           <p className="flex items-center text-gray-500 mt-2">
                              <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                              {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
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
                                 {property.images && property.images.length > 0 ? (
                                    <Image
                                       src={property.images[currentImageIndex].url}
                                       alt={`Property image ${currentImageIndex + 1}`}
                                       fill
                                       className="object-cover"
                                    />
                                 ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                       <span className="text-gray-400">No image available</span>
                                    </div>
                                 )}
                                 {property.images && property.images.length > 1 && (
                                    <>
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
                                                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-emerald-500" : "bg-white/70"
                                                   }`}
                                                aria-label={`Go to image ${index + 1}`}
                                             />
                                          ))}
                                       </div>
                                    </>
                                 )}
                              </div>
                              {property.images && property.images.length > 1 && (
                                 <div className="p-4 flex space-x-2 overflow-x-auto">
                                    {property.images.map((image, index) => (
                                       <button
                                          key={index}
                                          onClick={() => setCurrentImageIndex(index)}
                                          className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${index === currentImageIndex ? "ring-2 ring-emerald-500" : ""
                                             }`}
                                       >
                                          <Image
                                             src={image.url}
                                             alt={`Property thumbnail ${index + 1}`}
                                             fill
                                             className="object-cover"
                                          />
                                       </button>
                                    ))}
                                 </div>
                              )}
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
                                             <span className="font-medium">#{property._id}</span>
                                          </div>
                                          <div className="flex items-center justify-between border-b pb-2">
                                             <span className="text-gray-600">Property Type:</span>
                                             <span className="font-medium">{property.propertyType}</span>
                                          </div>
                                          <div className="flex items-center justify-between border-b pb-2">
                                             <span className="text-gray-600">Property Status:</span>
                                             <span className="font-medium capitalize">For {property.status === "for-sale" ? "Sale" : "Rent"}</span>
                                          </div>
                                          <div className="flex items-center justify-between border-b pb-2">
                                             <span className="text-gray-600">Property Price:</span>
                                             <span className="font-medium">
                                                {formatPrice(property.price)}
                                             </span>
                                          </div>
                                       </div>
                                       <div className="space-y-4">
                                          <div className="flex items-center justify-between border-b pb-2">
                                             <span className="text-gray-600">Area:</span>
                                             <span className="font-medium">{property.features.area} Sqft</span>
                                          </div>
                                          <div className="flex items-center justify-between border-b pb-2">
                                             <span className="text-gray-600">Bedrooms:</span>
                                             <span className="font-medium">{property.features.bedrooms}</span>
                                          </div>
                                          <div className="flex items-center justify-between border-b pb-2">
                                             <span className="text-gray-600">Bathrooms:</span>
                                             <span className="font-medium">{property.features.bathrooms}</span>
                                          </div>
                                          <div className="flex items-center justify-between border-b pb-2">
                                             <span className="text-gray-600">Year Built:</span>
                                             <span className="font-medium">{property.features.bedrooms}</span>
                                          </div>
                                       </div>
                                    </div>
                                 </TabsContent>

                                 <TabsContent value="amenities" className="p-6">
                                    <h3 className="text-xl font-bold text-navy-800 mb-4">Property Amenities</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                       {Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                                          property.amenities.map((amenity: string, index: number) => (
                                             <div key={index} className="flex items-center">
                                                <CheckCircle className="w-5 h-5 mr-2 text-emerald-500" />
                                                <span>{amenity}</span>
                                             </div>
                                          ))
                                       ) : (
                                          <p className="text-gray-500">No amenities listed</p>
                                       )}
                                    </div>
                                    <div className="mt-8">
                                       <h3 className="text-xl font-semibold mb-4">Features</h3>
                                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                          <div className="flex items-center space-x-2">
                                             <Bed className="w-4 h-4 text-emerald-500" />
                                             <span>{property.features.bedrooms} Bedrooms</span>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                             <Bath className="w-4 h-4 text-emerald-500" />
                                             <span>{property.features.bathrooms} Bathrooms</span>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                             <Ruler className="w-4 h-4 text-emerald-500" />
                                             <span>{property.features.area} sq ft</span>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                             <Car className="w-4 h-4 text-emerald-500" />
                                             <span>{property.features.parking} Parking</span>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="mt-8">
                                       <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                          {Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                                             property.amenities.map((amenity: string, index: number) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                   <Check className="w-4 h-4 text-emerald-500" />
                                                   <span>{amenity}</span>
                                                </div>
                                             ))
                                          ) : (
                                             <p className="text-gray-500">No amenities listed</p>
                                          )}
                                       </div>
                                    </div>
                                 </TabsContent>
                              </Tabs>
                           </div>
                        </div>

                        <div className="lg:col-span-1">
                           {/* Property Summary */}
                           <Card className="mb-8">
                              <CardContent className="p-6">
                                 <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-emerald-500">
                                       {formatPrice(property.price)}
                                    </h3>
                                    <Badge
                                       className={`${property.status === "for-sale" ? "bg-emerald-500" : "bg-emerald-500"
                                          } hover:bg-emerald-600`}
                                    >
                                       For {property.status === "for-sale" ? "Sale" : "Rent"}
                                    </Badge>
                                 </div>

                                 <div className="space-y-4 mb-6">
                                    <div className="flex items-center">
                                       <Ruler className="w-5 h-5 mr-3 text-emerald-500" />
                                       <div>
                                          <p className="text-sm text-gray-500">Area</p>
                                          <p className="font-medium">{property.features.area} Sqft</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center">
                                       <Bed className="w-5 h-5 mr-3 text-emerald-500" />
                                       <div>
                                          <p className="text-sm text-gray-500">Bedrooms</p>
                                          <p className="font-medium">{property.features.bedrooms}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center">
                                       <Bath className="w-5 h-5 mr-3 text-emerald-500" />
                                       <div>
                                          <p className="text-sm text-gray-500">Bathrooms</p>
                                          <p className="font-medium">{property.features.bathrooms}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center">
                                       <Car className="w-5 h-5 mr-3 text-emerald-500" />
                                       <div>
                                          <p className="text-sm text-gray-500">Garage</p>
                                          <p className="font-medium">{property.features.parking}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center">
                                       <Calendar className="w-5 h-5 mr-3 text-emerald-500" />
                                       <div>
                                          <p className="text-sm text-gray-500">Year Built</p>
                                          <p className="font-medium">{property.features.bedrooms}</p>
                                       </div>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>

                           {/* Agent Information */}
                           <Card className="mb-8">
                              <CardContent className="p-6">
                                 <h3 className="text-xl font-bold text-navy-800 mb-4">Property Agent</h3>
                                 {property.owner ? (
                                    <>
                                       <div className="flex items-center mb-4">
                                          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200">
                                             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                {property.owner.name.charAt(0)}
                                             </div>
                                          </div>
                                          <div>
                                             <h4 className="font-bold text-navy-800">{property.owner.name}</h4>
                                             <p className="text-gray-500 text-sm">Real Estate Agent</p>
                                          </div>
                                       </div>

                                       <div className="space-y-3 mb-6">
                                          <div className="flex items-center">
                                             <Phone className="w-5 h-5 mr-3 text-emerald-500" />
                                             <a href={`tel:${property.owner.phone}`} className="hover:text-emerald-500">
                                                {property.owner.phone}
                                             </a>
                                          </div>
                                          <div className="flex items-center">
                                             <Mail className="w-5 h-5 mr-3 text-emerald-500" />
                                             <a href={`mailto:${property.owner.email}`} className="hover:text-emerald-500">
                                                {property.owner.email}
                                             </a>
                                          </div>
                                       </div>

                                       <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                                          <MessageSquare className="w-4 h-4 mr-2" />
                                          View All Listings
                                       </Button>
                                    </>
                                 ) : (
                                    <p className="text-gray-500">Agent information not available</p>
                                 )}
                              </CardContent>
                           </Card>

                           {/* Contact Form */}
                           <Card>
                              <CardContent className="p-6">
                                 <h3 className="text-xl font-bold text-navy-800 mb-4">Contact Agent</h3>
                                 <form onSubmit={handleSubmitContactForm} className="space-y-4">
                                    <div>
                                       <Label htmlFor="name">Your Name</Label>
                                       <Input id="name" name="name" placeholder="Enter your name" className="mt-1" required />
                                    </div>
                                    <div>
                                       <Label htmlFor="email">Your Email</Label>
                                       <Input id="email" name="email" type="email" placeholder="Enter your email" className="mt-1" required />
                                    </div>
                                    <div>
                                       <Label htmlFor="phone">Your Phone</Label>
                                       <Input id="phone" name="phone" placeholder="Enter your phone" className="mt-1" required />
                                    </div>
                                    <div>
                                       <Label htmlFor="message">Message</Label>
                                       <Textarea
                                          id="message"
                                          name="message"
                                          placeholder="I'm interested in this property..."
                                          className="mt-1 min-h-[120px]"
                                          required
                                       />
                                    </div>
                                    <Button
                                       type="submit"
                                       className="w-full bg-emerald-500 hover:bg-emerald-600"
                                       disabled={isSubmitting}
                                    >
                                       {isSubmitting ? (
                                          <>
                                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                             Sending...
                                          </>
                                       ) : (
                                          'Send Message'
                                       )}
                                    </Button>
                                 </form>
                              </CardContent>
                           </Card>
                        </div>
                     </div>
                  </>
               ) : null}
            </div>
         </div>
         <Footer />
      </>
   )
}
