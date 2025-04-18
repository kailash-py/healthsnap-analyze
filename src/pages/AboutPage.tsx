
import { CircleCheck } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About NutriLens AI</h1>
          <p className="text-xl text-gray-600">Making nutrition transparent and accessible for everyone.</p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-700">
            NutriLens AI was created with a simple mission: to help people make better food choices by making nutrition information easy to understand. We believe that by providing clear, personalized insights about the food you eat, we can empower you to make healthier decisions every day.
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p className="text-gray-700">
            Our platform combines advanced image recognition technology with artificial intelligence to analyze nutrition labels and provide personalized feedback. By considering your unique health preferences and dietary needs, we can give you a customized assessment of how suitable a food product is for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start space-x-3">
              <CircleCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">Upload & Scan</h3>
                <p className="text-sm text-gray-600">Capture nutrition labels with your camera or upload images</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CircleCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">AI Analysis</h3>
                <p className="text-sm text-gray-600">Our advanced AI evaluates the nutritional content</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CircleCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">Personalized Feedback</h3>
                <p className="text-sm text-gray-600">Get insights tailored to your dietary needs</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CircleCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium">Make Better Choices</h3>
                <p className="text-sm text-gray-600">Use our ratings to choose foods that support your health goals</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">The Technology</h2>
          <p className="text-gray-700">
            NutriLens AI leverages cutting-edge technology to provide you with accurate and helpful nutritional insights:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><span className="font-medium">Optical Character Recognition (OCR)</span> - We use advanced OCR to extract text from nutrition label images</li>
            <li><span className="font-medium">Artificial Intelligence</span> - Google's Gemini model helps analyze nutritional data and provides smart recommendations</li>
            <li><span className="font-medium">User-Centered Design</span> - Our interface is designed to be intuitive and accessible for everyone</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Privacy & Security</h2>
          <p className="text-gray-700">
            We take your privacy seriously. The images you upload are processed securely, and we do not store your personal health information. Our platform is designed with privacy in mind, ensuring that your data remains yours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
