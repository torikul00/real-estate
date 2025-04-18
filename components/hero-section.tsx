"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/login")
  }

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find A <span className="text-emerald-500">Perfect Home</span> To Live With Your Family
          </h1>
          <p className="text-gray-600 mb-8 max-w-lg">
            Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et
            kasd rebum sea elitr.
          </p>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="relative h-[400px] md:h-[500px] w-full">
            <Image
              src="/placeholder.svg?height=500&width=700"
              alt="Luxury Home"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
