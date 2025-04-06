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
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 }); // Initialize with default values

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

    setLatLng({lat,lng});

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
            src="./Untitled_design-removebg-preview.png" // Path to the PNG file in the public folder
            alt="India Map"
            className="w-176 h-176 object-contain bg-transparent"
            onClick={handleClick}
          />

          </div>
          <div className="flex-1 bg-transparent">
          <div className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
        <Legend className="text-lg font-semibold text-white text-center">Prediction</Legend>
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
        <Field>
          <Label className="text-sm/6 font-medium text-white">Prediction</Label>
          <Description className="text-sm/6 text-white/50">We keep 5 parameters as our base.Which are</Description>
          <div className="relative">
            <Select
              className={clsx(
                'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                // Make the text of each option black on Windows
                '*:text-black'
              )}
            >
              <option>Canada</option>
              <option>Mexico</option>
              <option>United States</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Delivery notes</Label>
          <Description className="text-sm/6 text-white/50">
            If you have a tiger, we'd like to know about it.
          </Description>
          <Textarea
            className={clsx(
              'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            
            
            rows={3}
          />
          
        </Field>
      </Fieldset>
    </div>


          </div>
        </div>
      </div>
    </div>
  )
}


   