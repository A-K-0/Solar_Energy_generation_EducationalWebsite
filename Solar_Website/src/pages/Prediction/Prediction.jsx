'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'

import { Description, Field, Fieldset, Input, Label, Legend, Select, Textarea } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

import 'leaflet/dist/leaflet.css'

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Prediction', href: '/prediction' },
  { name: 'How to use', href: '/Howtouse' },
  { name: 'About us', href: '/Aboutus' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual API key
  const API_KEY = 'CXSDGPENVV5K7B9PBSPNDG8AU';
  const today = new Date().toISOString().split('T')[0];

  const handleClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const img = e.target;
    const width = img.width;
    const height = img.height;

    // India's approximate bounding box coordinates
    const indiaBounds = {
      minLat: 8.4,
      maxLat: 37.6,
      minLng: 68.7,
      maxLng: 97.25,
    };

    // Calculate latitude and longitude based on click position
    const lat = indiaBounds.maxLat - (offsetY / height) * (indiaBounds.maxLat - indiaBounds.minLat);
    const lng = indiaBounds.minLng + (offsetX / width) * (indiaBounds.maxLng - indiaBounds.minLng);

    setLatLng({lat, lng});
    fetchWeatherData(lat, lng);
  }

  const predictSolarGeneration = async () => {
    if (!weatherData?.days?.[0]) {
      setError('Please select a location first');
      return;
    }
  
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/Predict_Solargeneration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: latLng.lat,
          longitude: latLng.lng,
          temperature: weatherData.days[0].temp,
          humidity: weatherData.days[0].humidity,
          precipitation: weatherData.days[0].precip,
          solar_radiation: weatherData.days[0].solarradiation,
          solar_energy: weatherData.days[0].solarenergy,
          cloud_cover: weatherData.days[0].cloudcover,
          dew_point: weatherData.days[0].dew,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Prediction failed');
      }
  
      const predictionData = await response.json();
      // Handle the prediction result (you might want to add state for this)
      console.log('Prediction result:', predictionData);
      alert(`Predicted Solar Generation: ${predictionData.prediction} kWh`);
      
    } catch (err) {
      setError(err.message);
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${today}?unitGroup=metric&key=${API_KEY}&include=current&elements=temp,humidity,dew,cloudcover,solarradiation,solarenergy,precip`
        
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-white">
          <div className="flex lg:flex-1 text-white"></div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <br />
        <br />

        <div className="flex h-screen">
          <div className="w-2/4 bg-transparent">
            <img
              src="./Untitled_design-removebg-preview.png"
              alt="India Map"
              className="w-176 h-176 object-contain bg-transparent"
              onClick={handleClick}
            />
          </div>
          <div className="flex-1 bg-transparent">
            <div className="w-full max-w-lg px-4">
              <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                <Legend className="text-lg font-semibold text-white text-center pb-2">PREDICTION</Legend>
                <div className="grid grid-cols-2 gap-4">
  <Field>
    <Label className="text-sm/6 font-medium text-white">Latitude</Label>
    <Input
      className={clsx(
        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
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
        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
      )}
      value={latLng.lng.toFixed(4)}
      readOnly
    />
  </Field>
</div>
                
                {error && <p className="text-red-500">Error: {error}</p>}
                
                {weatherData?.days?.[0] && (
  <Field>
    <Label className="text-sm/6 font-medium text-white mb-4">
      <span className="text-xl font-semibold">🌤️ Weather Information</span>
    </Label>
    <div className="mt-3 text-white space-y-2">
      <div className="flex justify-between items-center border-b border-white/20 pb-2">
        <span className="flex items-center gap-2">
          🌡️ <span className="font-medium">Temperature</span>
        </span>
        <span>{weatherData.days[0].temp ?? 'N/A'}°C</span>
      </div>
      <div className="flex justify-between items-center border-b border-white/20 pb-2">
        <span className="flex items-center gap-2">
          💧 <span className="font-medium">Humidity</span>
        </span>
        <span>{weatherData.days[0].humidity ?? 'N/A'}%</span>
      </div>
      <div className="flex justify-between items-center border-b border-white/20 pb-2">
        <span className="flex items-center gap-2">
          🌧️ <span className="font-medium">Precipitation</span>
        </span>
        <span>{weatherData.days[0].precip ?? 'N/A'} mm</span>
      </div>
      <div className="flex justify-between items-center border-b border-white/20 pb-2">
        <span className="flex items-center gap-2">
          ☀️ <span className="font-medium">Solar Radiation</span>
        </span>
        <span>{weatherData.days[0].solarradiation ?? 'N/A'} W/m²</span>
      </div>
      <div className="flex justify-between items-center border-b border-white/20 pb-2">
        <span className="flex items-center gap-2">
          ⚡ <span className="font-medium">Solar Energy</span>
        </span>
        <span>{weatherData.days[0].solarenergy ?? 'N/A'} kWh/m²</span>
      </div>
      <div className="flex justify-between items-center border-b border-white/20 pb-2">
        <span className="flex items-center gap-2">
          ☁️ <span className="font-medium">Cloud Cover</span>
        </span>
        <span>{weatherData.days[0].cloudcover ?? 'N/A'}%</span>
      </div>
      <div className="flex justify-between items-center border-b border-white/20 pb-2">
        <span className="flex items-center gap-2">
          💦 <span className="font-medium">Dew Point</span>
        </span>
        <span>{weatherData.days[0].dew ?? 'N/A'}°C</span>
      </div>
    </div>
  </Field>
)}
                <Field>
                  <Label className="text-sm/6 font-medium text-white">Predicted Solar power</Label>
                
                  <Textarea
                    className={clsx(
                      'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                 
                  />
                </Field>

                <button 
  type="button"  // Changed from "predict" to "button"
  onClick={predictSolarGeneration}
  disabled={loading || !weatherData?.days?.[0]}
  className={clsx(
    'inline-block rounded-lg px-3 py-1.5 text-sm/6 font-semibold shadow-sm ring-1 ring-white/10 hover:ring-white/20',
    loading || !weatherData?.days?.[0] 
      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
      : 'bg-green-600 text-white hover:bg-green-700'
  )}
>
  {loading ? 'PREDICTING...' : 'PREDICT'}
</button>
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}