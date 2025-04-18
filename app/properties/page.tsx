"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Ruler, Bed, Bath, Search, SlidersHorizontal, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock data for properties
const properties = [
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
    featured: true,
  },
  {
    id: 2,
    title: "Modern Family Home For Rent",
    price: "$14,500",
    address: "456 Avenue, Chicago, USA",
    type: "Villa",
    status: "rent",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "1200",
    beds: 4,
    baths: 3,
    featured: false,
  },
  {
    id: 3,
    title: "Cozy Cottage For Sell",
    price: "$9,999",
    address: "789 Lane, Boston, USA",
    type: "Office",
    status: "sell",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "850",
    beds: 2,
    baths: 1,
    featured: true,
  },
  {
    id: 4,
    title: "Luxury Penthouse For Rent",
    price: "$18,750",
    address: "101 Boulevard, Miami, USA",
    type: "House",
    status: "rent",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "1500",
    beds: 5,
    baths: 4,
    featured: false,
  },
  {
    id: 5,
    title: "Suburban Family House For Sell",
    price: "$22,500",
    address: "202 Street, Seattle, USA",
    type: "Cottage",
    status: "sell",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "1800",
    beds: 4,
    baths: 3,
    featured: true,
  },
  {
    id: 6,
    title: "Downtown Apartment For Rent",
    price: "$8,200",
    address: "303 Avenue, San Francisco, USA",
    type: "Penthouse",
    status: "rent",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "750",
    beds: 1,
    baths: 1,
    featured: false,
  },
  {
    id: 7,
    title: "Beachfront Villa For Sell",
    price: "$35,000",
    address: "404 Beach Road, Los Angeles, USA",
    type: "Building",
    status: "sell",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "2500",
    beds: 6,
    baths: 5,
    featured: true,
  },
  {
    id: 8,
    title: "Mountain Cabin For Rent",
    price: "$6,500",
    address: "505 Mountain View, Denver, USA",
    type: "Townhouse",
    status: "rent",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "900",
    beds: 2,
    baths: 2,
    featured: false,
  },
  {
    id: 9,
    title: "Historic Townhouse For Sell",
    price: "$18,900",
    address: "606 Heritage Lane, Philadelphia, USA",
    type: "Shop",
    status: "sell",
    image: "/placeholder.svg?height=300&width=400",
    sqft: "1600",
    beds: 3,
    baths: 2,
    featured: true,
  },
]

type FilterState = {
  status: string
  type: string
  minPrice: number
  maxPrice: number
  minBeds: number
  maxBeds: number
  minBaths: number
  maxBaths: number
  featured: boolean
}

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    type: "all",
    minPrice: 0,
    maxPrice: 50000,
    minBeds: 0,
    maxBeds: 6,
    minBaths: 0,
    maxBaths: 5,
    featured: false,
  })

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const resetFilters = () => {
    setFilters({
      status: "all",
      type: "all",
      minPrice: 0,
      maxPrice: 50000,
      minBeds: 0,
      maxBeds: 6,
      minBaths: 0,
      maxBaths: 5,
      featured: false,
    })
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    })
  }

  // Filter properties based on current filters
  const filteredProperties = properties.filter((property) => {
    // Filter by status
    if (filters.status !== "all" && property.status !== filters.status) return false

    // Filter by type
    if (filters.type !== "all" && property.type !== filters.type) return false

    // Filter by price
    const price = Number.parseInt(property.price.replace(/[^0-9]/g, ""))
    if (price < filters.minPrice || price > filters.maxPrice) return false

    // Filter by beds
    if (property.beds < filters.minBeds || property.beds > filters.maxBeds) return false

    // Filter by baths
    if (property.baths < filters.minBaths || property.baths > filters.maxBaths) return false

    // Filter by featured
    if (filters.featured && !property.featured) return false

    return true
  })

  // Sort properties based on current sort option
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseInt(a.price.replace(/[^0-9]/g, "")) - Number.parseInt(b.price.replace(/[^0-9]/g, ""))
      case "price-high":
        return Number.parseInt(b.price.replace(/[^0-9]/g, "")) - Number.parseInt(a.price.replace(/[^0-9]/g, ""))
      case "beds":
        return b.beds - a.beds
      case "baths":
        return b.baths - a.baths
      case "size":
        return Number.parseInt(b.sqft) - Number.parseInt(a.sqft)
      case "newest":
      default:
        return b.id - a.id
    }
  })

  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/50 py-10">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-navy-800 mb-4">Property Listings</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our wide range of properties for sale and rent. Use the filters to find your perfect home that
              matches all your requirements.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-auto md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Search by location, property name..." className="pl-10 pr-4 py-2 h-12" />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] h-12">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="beds">Most Bedrooms</SelectItem>
                    <SelectItem value="baths">Most Bathrooms</SelectItem>
                    <SelectItem value="size">Largest Size</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={toggleFilters}
                  variant="outline"
                  className="h-12 flex items-center gap-2 border-emerald-500 text-emerald-500"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="hidden md:inline">Filters</span>
                </Button>
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-navy-800">Filters</h3>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-500">
                      Reset All
                    </Button>
                    <Button variant="ghost" size="sm" onClick={toggleFilters} className="text-gray-500 md:hidden">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Property Status */}
                  <div>
                    <Label className="mb-2 block">Property Status</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={filters.status === "all" ? "default" : "outline"}
                        className={filters.status === "all" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                        onClick={() => handleFilterChange("status", "all")}
                      >
                        All
                      </Button>
                      <Button
                        variant={filters.status === "sell" ? "default" : "outline"}
                        className={filters.status === "sell" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                        onClick={() => handleFilterChange("status", "sell")}
                      >
                        For Sell
                      </Button>
                      <Button
                        variant={filters.status === "rent" ? "default" : "outline"}
                        className={filters.status === "rent" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                        onClick={() => handleFilterChange("status", "rent")}
                      >
                        For Rent
                      </Button>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <Label htmlFor="property-type" className="mb-2 block">
                      Property Type
                    </Label>
                    <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                      <SelectTrigger id="property-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Building">Building</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Shop">Shop</SelectItem>
                        <SelectItem value="Garage">Garage</SelectItem>
                        <SelectItem value="Cottage">Cottage</SelectItem>
                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Price Range</Label>
                      <span className="text-sm text-gray-500">
                        ${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="px-2">
                      <Slider
                        defaultValue={[filters.minPrice, filters.maxPrice]}
                        min={0}
                        max={50000}
                        step={1000}
                        value={[filters.minPrice, filters.maxPrice]}
                        onValueChange={(value) => {
                          handleFilterChange("minPrice", value[0])
                          handleFilterChange("maxPrice", value[1])
                        }}
                        className="my-4"
                      />
                    </div>
                  </div>

                  {/* Bedrooms & Bathrooms */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Bedrooms</Label>
                        <span className="text-sm text-gray-500">
                          {filters.minBeds} - {filters.maxBeds}+
                        </span>
                      </div>
                      <div className="px-2">
                        <Slider
                          defaultValue={[filters.minBeds, filters.maxBeds]}
                          min={0}
                          max={6}
                          step={1}
                          value={[filters.minBeds, filters.maxBeds]}
                          onValueChange={(value) => {
                            handleFilterChange("minBeds", value[0])
                            handleFilterChange("maxBeds", value[1])
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Bathrooms</Label>
                        <span className="text-sm text-gray-500">
                          {filters.minBaths} - {filters.maxBaths}+
                        </span>
                      </div>
                      <div className="px-2">
                        <Slider
                          defaultValue={[filters.minBaths, filters.maxBaths]}
                          min={0}
                          max={5}
                          step={1}
                          value={[filters.minBaths, filters.maxBaths]}
                          onValueChange={(value) => {
                            handleFilterChange("minBaths", value[0])
                            handleFilterChange("maxBaths", value[1])
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Featured Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={filters.featured}
                      onCheckedChange={(checked) => handleFilterChange("featured", checked)}
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Featured Properties Only
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{sortedProperties.length}</span> properties
            </p>
          </div>

          {/* Property Grid */}
          {sortedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <Link href={`/property/${property.id}`} key={property.id}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-3 py-1 text-sm font-medium text-white rounded-md ${
                            property.status === "sell" ? "bg-emerald-500" : "bg-emerald-500"
                          }`}
                        >
                          For {property.status === "sell" ? "Sell" : "Rent"}
                        </span>
                      </div>
                      {property.featured && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-3 py-1 text-sm font-medium text-white bg-navy-800 rounded-md">
                            Featured
                          </span>
                        </div>
                      )}
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
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">No properties found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to find properties that match your criteria.
              </p>
              <Button onClick={resetFilters} className="bg-emerald-500 hover:bg-emerald-600">
                Reset Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {sortedProperties.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
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
                    className="h-4 w-4"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="bg-emerald-500 text-white hover:bg-emerald-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <Button variant="outline" size="icon">
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
                    className="h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
