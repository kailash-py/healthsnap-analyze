
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Edit, LineChart, ScanSearch } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Make smarter food choices with NutriLens AI
                </h1>
                <p className="text-gray-700 md:text-xl">
                  Analyze nutrition labels instantly and get personalized health insights 
                  powered by artificial intelligence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/analyze">Analyze Food Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto max-w-md">
              <div className="aspect-video overflow-hidden rounded-xl bg-white p-6 shadow-lg card-shadow">
                <div className="flex h-full items-center justify-center bg-gray-50 rounded-lg">
                  <ScanSearch className="h-24 w-24 text-primary opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How NutriLens AI Works
            </h2>
            <p className="max-w-[85%] text-gray-600 md:text-xl">
              Our smart technology makes nutritional analysis simple, fast, and personalized to your health needs.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Upload Label</h3>
              <p className="text-gray-600">
                Take a photo of any nutrition label and upload it to our secure platform.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Edit className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Review & Edit</h3>
              <p className="text-gray-600">
                Our OCR technology extracts the data, which you can verify and adjust if needed.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <LineChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Get Analysis</h3>
              <p className="text-gray-600">
                Receive detailed insights and a health suitability rating based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to make healthier choices?
              </h2>
              <p className="text-gray-600 md:text-xl">
                Start analyzing your food now and discover what's really in your food.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <Button asChild className="w-full" size="lg">
                <Link to="/analyze">Analyze Food Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
