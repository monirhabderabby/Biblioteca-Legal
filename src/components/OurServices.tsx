import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, FileSearch } from "lucide-react";

export default function OurServices() {
  return (
    <section className="bg-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-blue-400 text-lg font-medium mb-4">
            Our Services
          </h2>
          <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive Legal Resources
          </h3>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            Discover the tools and resources designed to enhance your legal
            practice and provide you with the most up-to-date information.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Legal Library Card */}
          <Card className="bg-transparent border-none shadow-none group hover:bg-white transition-all duration-300 ease-in-out">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-between">
                <h4 className="text-white group-hover:text-slate-800 text-2xl font-bold mb-4 transition-colors duration-300">
                  Legal Library
                </h4>
                <BookOpen className="w-12 h-12 text-white group-hover:text-slate-800 transition-colors duration-300" />
              </div>

              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Access thousands of legal documents, laws, and decrees
              </p>
              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Our comprehensive collection includes the latest legal
                documents, organized and easily accessible.
              </p>
              <Button
                variant="outline"
                className="bg-white rounded-full text-slate-800 border-white hover:bg-slate-100 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300"
              >
                Browse Library
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Legal Updates Card */}
          <Card className="bg-transparent border-none shadow-none group hover:bg-white transition-all duration-300 ease-in-out">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-between">
                <h4 className="text-white group-hover:text-slate-800 text-2xl font-bold mb-4 transition-colors duration-300">
                  Legal Updates
                </h4>
                {/* <FileText className="w-12 h-12 text-white group-hover:text-slate-800 transition-colors duration-300" /> */}
              </div>

              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Stay informed with the latest legal developments
              </p>
              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Get timely updates on new laws, amendments, and important legal
                changes affecting your practice.
              </p>
              <Button
                variant="outline"
                className="bg-white rounded-full text-slate-800 border-white hover:bg-slate-100 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300"
              >
                View Updates
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Document Search Card */}
          <Card className="bg-transparent border-none shadow-none group hover:bg-white transition-all duration-300 ease-in-out">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-between">
                <h4 className="text-white group-hover:text-slate-800 text-2xl font-bold mb-4 transition-colors duration-300">
                  Document Search
                </h4>

                <FileSearch className="w-12 h-12 text-white group-hover:text-slate-800 transition-colors duration-300" />
              </div>

              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Find specific legal documents quickly and efficiently
              </p>
              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Our powerful search tools help you locate exactly what you need
                within our extensive collection.
              </p>
              <Button
                variant="outline"
                className="bg-white rounded-full text-slate-800 border-white hover:bg-slate-100 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300"
              >
                Tray Serarch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
