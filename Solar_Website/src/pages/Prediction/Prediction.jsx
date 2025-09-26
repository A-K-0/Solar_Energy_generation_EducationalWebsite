'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Description, Field, Fieldset, Input, Label, Legend, Textarea } from '@headlessui/react'
import clsx from 'clsx'

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Prediction', href: '/prediction' },
  { name: 'How to use', href: '/Howtouse' },
]

const BACKEND_API_URL = 'http://localhost:8000/api';

export default function PredictionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [latLng, setLatLng] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi coordinates
  const [weatherData, setWeatherData] = useState({
    days: [{
      temp: 0,
      humidity: 0,
      dew: 0,
      precip: 0,
      cloudcover: 0,
      solarradiation: 0,
      solarenergy: 0
    }]
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState('New Delhi, India'); // Default location
  const [isPredicting, setIsPredicting] = useState(false);

  const API_KEY = '<REPLACE_WITH_YOUR_API_KEY>';
  const today = new Date().toISOString().split('T')[0];

  // Load default data on first render
  useEffect(() => {
    fetchWeatherData(latLng.lat, latLng.lng);
  }, []);

  const handleClick = async (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const img = e.target;
    const width = img.width;
    const height = img.height;

    // India's approximate bounding box coordinates
    const indiaBounds = {
      minLat: 8.0,   // Southernmost point
      maxLat: 37.6,  // Northernmost point
      minLng: 67.7,  // Westernmost point
      maxLng: 97.25  // Easternmost point
    };

    // Calculate latitude and longitude from click position
    const lat = indiaBounds.maxLat - (offsetY / height) * (indiaBounds.maxLat - indiaBounds.minLat);
    const lng = indiaBounds.minLng + (offsetX / width) * (indiaBounds.maxLng - indiaBounds.minLng);

    setLatLng({lat, lng});
    fetchLocationName(lat, lng);
    fetchWeatherData(lat, lng);
  }

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      
      const data = await response.json();
      const name = data.display_name || 
                   data.address?.city || 
                   data.address?.town || 
                   data.address?.village || 
                   data.address?.county || 
                   'Unknown location';
      setLocationName(name);
    } catch (err) {
      console.error('Location fetch error:', err);
      setLocationName(`Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  }

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${today}?unitGroup=metric&key=${API_KEY}&include=current&elements=temp,humidity,dew,cloudcover,solarradiation,solarenergy,precip,lat,lon,resolvedAddress,timezone`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    }
  }

  const predictSolarGeneration = async () => {
    if (!weatherData?.days?.[0]) return;
    
    setIsPredicting(true);
    setError(null);
    
    try {
      const response = await fetch(`${BACKEND_API_URL}/predict/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temp: weatherData.days[0].temp,
          humidity: weatherData.days[0].humidity,
          dew: weatherData.days[0].dew,
          precip: weatherData.days[0].precip,
          cloudcover: weatherData.days[0].cloudcover,
          solarradiation: weatherData.days[0].solarradiation,
          solarenergy: weatherData.days[0].solarenergy
        })
      });
  
      if (!response.ok) {
        throw new Error(`Prediction failed with status: ${response.status}`);
      }
  
      const predictionData = await response.json();
      setPrediction(predictionData.prediction_kwh);
    } catch (err) {
      setError(err.message);
      console.error('Prediction error:', err);
    } finally {
      setIsPredicting(false);
    }
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Floating Gradient Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-green-800/5 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-green-700/5 blur-[80px]"></div>
        <div className="absolute left-1/2 top-1/3 w-64 h-64 rounded-full bg-green-600/8 blur-[70px]"></div>
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-white">
          <div className="flex lg:flex-1 text-white"></div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm/6 font-semibold text-white hover:text-green-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Section */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-full min-h-[500px]">
                <img
                  src="./India.png"
                  alt="India Map"
                  className="object-contain cursor-pointer  border-gray-800 shadow-lg"
                  onClick={handleClick}
                />
              </div>
            </div>

            {/* Prediction Form Section */}
            <div className="rounded-2xl bg-gray-900/50 p-8 backdrop-blur-sm border border-gray-800">
              <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Solar Power Prediction</h2>
              
              <Fieldset className="space-y-6">
                <Field>
                  <Label className="text-sm/6 font-medium text-white">Location</Label>
                  <Input
                    className={clsx(
                      'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
                    )}
                    value={locationName}
                    readOnly
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <Label className="text-sm/6 font-medium text-white">Latitude</Label>
                    <Input
                      className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
                      )}
                      value={latLng.lat.toFixed(4)}
                      readOnly
                    />
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium text-white">Longitude</Label>
                    <Input
                      className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
                      )}
                      value={latLng.lng.toFixed(4)}
                      readOnly
                    />
                  </Field>
                </div>
                
                {error && (
                  <div className="p-3 rounded-lg bg-red-900/30 text-red-300">
                    Error: {error}
                  </div>
                )}
                
                <Field>
                  <Label className="text-sm/6 font-medium text-white mb-4">
                    <span className="text-lg font-semibold text-green-400">🌤️ Weather Information</span>
                  </Label>
                  <div className="mt-3 text-white space-y-3">
                    {Object.entries({
                      '🌡️ Temperature': `${weatherData.days[0].temp}°C`,
                      '💧 Humidity': `${weatherData.days[0].humidity}%`,
                      '🌧️ Precipitation': `${weatherData.days[0].precip} mm`,
                      '☀️ Solar Radiation': `${weatherData.days[0].solarradiation} W/m²`,
                      '⚡ Solar Energy': `${weatherData.days[0].solarenergy} kWh/m²`,
                      '☁️ Cloud Cover': `${weatherData.days[0].cloudcover}%`,
                      '💦 Dew Point': `${weatherData.days[0].dew}°C`
                    }).map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                        <span className="text-gray-300">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </Field>
                
                <Field>
                  <Label className="text-sm/6 font-medium text-white">Predicted Solar Power (kWh)</Label>
                  <Textarea
                    className={clsx(
                      'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
                    )}
                    value={prediction !== null ? `${prediction.toFixed(2)} kWh` : ''}
                    readOnly
                  />
                </Field>

                <button 
                  type="button"
                  onClick={predictSolarGeneration}
                  disabled={isPredicting}
                  className={clsx(
                    'w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold shadow-lg transition-all',
                    'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400',
                    'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900',
                    isPredicting ? 'opacity-50 cursor-not-allowed' : ''
                  )}
                >
                  {isPredicting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Predict Solar Generation'}
                </button>
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}