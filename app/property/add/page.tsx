"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, MapPin, DollarSign, Ruler, Bed, Bath } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AddPropertyPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [propertyType, setPropertyType] = useState("house")
  const [listingType, setListingType] = useState("sell")
  const [previewData, setPreviewData] = useState({
    title: "Golden Urban House For Sell",
    price: "12,345",
    address: "123 Street, New York, USA",
    type: "Villa",
    sqft: "1000",
    beds: "3",
    baths: "2",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setPreviewData({
      ...previewData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert("Property submitted successfully!")
    router.push("/")
  }

  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-navy-800 mb-6">Add New Property</h1>
            <p className="text-gray-600 mb-8">
              Fill out the form below to list your property on PropFind. All fields marked with * are required.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Provide the basic details about your property</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="title">Property Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g. Modern Villa with Pool"
                          required
                          className="mt-1"
                          value={previewData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="price">Price *</Label>
                          <div className="relative mt-1">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="price"
                              type="text"
                              placeholder="e.g. 250,000"
                              className="pl-10"
                              required
                              value={previewData.price}
                              onChange={(e) => handleInputChange("price", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Listing Type *</Label>
                          <Tabs defaultValue="sell" className="mt-1" value={listingType} onValueChange={setListingType}>
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="sell">For Sell</TabsTrigger>
                              <TabsTrigger value="rent">For Rent</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                      </div>

                      <div>
                        <Label>Property Type *</Label>
                        <Select
                          value={propertyType}
                          onValueChange={(value) => {
                            setPropertyType(value)
                            handleInputChange("type", value.charAt(0).toUpperCase() + value.slice(1))
                          }}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="building">Building</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="shop">Shop</SelectItem>
                            <SelectItem value="garage">Garage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your property..."
                          className="mt-1 min-h-[150px]"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Location</CardTitle>
                      <CardDescription>Where is your property located?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            id="address"
                            placeholder="e.g. 123 Main St"
                            className="pl-10"
                            required
                            value={previewData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" placeholder="e.g. New York" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input id="state" placeholder="e.g. NY" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code *</Label>
                          <Input id="zip" placeholder="e.g. 10001" className="mt-1" required />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Property Details</CardTitle>
                      <CardDescription>Provide specific details about your property</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="sqft">Square Feet *</Label>
                          <div className="relative mt-1">
                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="sqft"
                              type="number"
                              placeholder="e.g. 1500"
                              className="pl-10"
                              required
                              value={previewData.sqft}
                              onChange={(e) => handleInputChange("sqft", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bedrooms">Bedrooms *</Label>
                          <div className="relative mt-1">
                            <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="bedrooms"
                              type="number"
                              placeholder="e.g. 3"
                              className="pl-10"
                              required
                              value={previewData.beds}
                              onChange={(e) => handleInputChange("beds", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bathrooms">Bathrooms *</Label>
                          <div className="relative mt-1">
                            <Bath className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="bathrooms"
                              type="number"
                              placeholder="e.g. 2"
                              className="pl-10"
                              required
                              value={previewData.baths}
                              onChange={(e) => handleInputChange("baths", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="year">Year Built</Label>
                          <Input id="year" type="number" placeholder="e.g. 2010" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="garage">Garage Spaces</Label>
                          <Input id="garage" type="number" placeholder="e.g. 2" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label className="mb-3 block">Amenities</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            "Air Conditioning",
                            "Swimming Pool",
                            "Central Heating",
                            "Garden",
                            "Gym",
                            "Elevator",
                            "Balcony",
                            "Parking",
                            "Security System",
                          ].map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <Checkbox id={`amenity-${amenity}`} />
                              <label
                                htmlFor={`amenity-${amenity}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Property Images</CardTitle>
                      <CardDescription>Upload images of your property (max 10 images)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Property image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              onClick={() => setImages(images.filter((_, i) => i !== index))}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                        {images.length < 10 && (
                          <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center aspect-square hover:border-emerald-500 transition-colors">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              multiple
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, GIF. Maximum file size: 5MB per image.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>How potential buyers/renters can reach you</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="contact-name">Contact Name *</Label>
                          <Input id="contact-name" placeholder="Your name" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="contact-phone">Phone Number *</Label>
                          <Input id="contact-phone" placeholder="Your phone number" className="mt-1" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Email *</Label>
                        <Input id="contact-email" type="email" placeholder="Your email" className="mt-1" required />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
                      Submit Property
                    </Button>
                  </div>
                </form>
              </div>

              {/* Preview Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">Property Preview</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-3 py-1 text-sm font-medium text-white rounded-md ${
                            listingType === "sell" ? "bg-emerald-500" : "bg-emerald-500"
                          }`}
                        >
                          For {listingType === "sell" ? "Sell" : "Rent"}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="px-3 py-1 text-sm font-medium text-emerald-500 bg-white rounded-md">
                          {previewData.type}
                        </span>
                      </div>
                      <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
                        {images.length > 0 ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={images[0] || "/placeholder.svg"}
                              alt="Property preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-gray-400 flex flex-col items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <span className="mt-2">No image uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-emerald-500">${previewData.price}</span>
                      </div>
                      <h3 className="text-xl font-bold text-navy-800 mb-2">{previewData.title}</h3>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                        <span className="text-sm">{previewData.address}</span>
                      </div>
                      <div className="grid grid-cols-3 border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-center">
                          <Ruler className="w-4 h-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{previewData.sqft} Sqft</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Bed className="w-4 h-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{previewData.beds} Bed</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Bath className="w-4 h-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{previewData.baths} Bath</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
