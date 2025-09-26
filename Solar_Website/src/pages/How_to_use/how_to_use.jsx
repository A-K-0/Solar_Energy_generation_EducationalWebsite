'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Prediction', href: '/prediction' },
  { name: 'How to use', href: '/Howtouse' },
]

export default function HowToUse() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-black min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-white">
          <div className="flex lg:flex-1 text-white"></div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white hover:text-green-400 transition-colors">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/prediction" className="text-sm/6 font-semibold text-green-400 hover:text-green-300 transition-colors">
              Try Prediction <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-32 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-green-400 sm:text-6xl">
              Solar Power Prediction Guide
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300">
              Learn how to accurately predict solar energy generation using our advanced platform
            </p>
          </div>

          <div className="mt-20 space-y-16">
            {/* Aim and Objective Section */}
            <section className="rounded-2xl bg-gray-900/50 p-8 backdrop-blur-sm border border-gray-800">
              <h2 className="text-2xl font-bold text-green-400 mb-6">Our Mission</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20">
                      <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Aim</h3>
                    <p className="mt-1 text-gray-400">
                      To revolutionize solar energy planning by providing accurate, location-specific predictions of solar power generation using cutting-edge machine learning and weather data analysis.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20">
                      <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Objectives</h3>
                    <ul className="mt-1 text-gray-400 list-disc list-inside space-y-2">
                      <li>Provide precise solar generation forecasts to optimize energy planning</li>
                      <li>Integrate real-time weather data with machine learning models</li>
                      <li>Create an intuitive interface for both professionals and homeowners</li>
                      <li>Support India's transition to renewable energy sources</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="rounded-2xl bg-gray-900/50 p-8 backdrop-blur-sm border border-gray-800">
              <h2 className="text-2xl font-bold text-green-400 mb-6">How to Use the Prediction Tool</h2>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-400 font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white">Select Location</h3>
                        <p className="mt-1 text-gray-400">
                          Click anywhere on the India map to select your location. The system will automatically detect the latitude and longitude.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-400 font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white">Review Weather Data</h3>
                        <p className="mt-1 text-gray-400">
                          The system fetches real-time weather data including temperature, humidity, solar radiation, and cloud cover for your selected location.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-400 font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white">Generate Prediction</h3>
                        <p className="mt-1 text-gray-400">
                          Click the "PREDICT" button to run our machine learning model. The system will calculate the expected solar power generation in kWh.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-400 font-bold">4</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white">Analyze Results</h3>
                        <p className="mt-1 text-gray-400">
                          Review the prediction results along with the weather parameters that influenced the calculation. Save or export the data for future reference.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Features Section */}
            <section className="rounded-2xl bg-gray-900/50 p-8 backdrop-blur-sm border border-gray-800">
              <h2 className="text-2xl font-bold text-green-400 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Precision Mapping",
                    description: "Accurate location selection with detailed geographical coordinates",
                    icon: "📍"
                  },
                  {
                    title: "Real-time Weather Integration",
                    description: "Live weather data from trusted meteorological sources",
                    icon: "🌤️"
                  },
                  {
                    title: "Advanced ML Models",
                    description: "Sophisticated algorithms trained on historical solar data",
                    icon: "🧠"
                  },
                  {
                    title: "User-friendly Interface",
                    description: "Intuitive design for both technical and non-technical users",
                    icon: "💻"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <span className="text-2xl mr-4">{feature.icon}</span>
                    <div>
                      <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                      <p className="mt-1 text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <div className="text-center">
              <a
                href="/prediction"
                className={clsx(
                  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-lg font-semibold shadow-sm',
                  'bg-green-600 text-white hover:bg-green-700 transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                )}
              >
                Start Predicting Now
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}