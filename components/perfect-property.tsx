import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PerfectProperty() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Green background shape */}
          <div className="absolute left-0 top-0 w-[45%] h-[110%] bg-emerald-500 clip-path-polygon"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Image */}
            <div className="relative">
              <div className="relative h-[500px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Luxury Property with Pool"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-800 mb-6">
                #1 Place To Find The Perfect Property
              </h2>

              <p className="text-gray-600 mb-8">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
                ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="text-emerald-500 mr-3" />
                  <span>Tempor erat elitr rebum at clita</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-emerald-500 mr-3" />
                  <span>Aliqu diam amet diam et eos</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-emerald-500 mr-3" />
                  <span>Clita duo justo magna dolore erat amet</span>
                </div>
              </div>

              <div>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">Read More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
