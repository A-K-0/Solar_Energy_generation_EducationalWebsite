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

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-950/80 to-black">
      {/* Star effects */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() > 0.5 ? 1 : 2}px`,
              height: `${Math.random() > 0.5 ? 1 : 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-green-800/5 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-green-700/5 blur-[80px]"></div>
        <div className="absolute left-1/2 top-1/3 w-64 h-64 rounded-full bg-green-600/8 blur-[70px]"></div>
      </div>

      {/* Global styles for stars */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-white">
          <div className="flex lg:flex-1"></div>
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

      <div className="relative flex-1 flex items-center justify-center px-6 pt-14 lg:px-8">
        <div className="w-full max-w-2xl text-center relative z-10">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm/6 font-medium text-gray-300 ring-1 ring-green-800/50 hover:ring-green-500/50 transition-all bg-green-900/10 backdrop-blur-sm">
              Announcing our solar energy predicted.{' '}
              <a href="/howtouse" className="font-semibold text-green-400 hover:text-green-300">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to Solar Sense! 
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
            Join India's renewable energy revolution today - explore our prediction tool and discover how much clean energy your location can generate throughout the year.            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/prediction"
                className={clsx(
                  'relative rounded-lg px-6 py-3.5 text-base font-semibold shadow-lg',
                  'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 transition-all',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
                  'transform hover:scale-105 duration-200',
                  'overflow-hidden group'
                )}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
                Get started
              </a>
              <a 
                href="/Howtouse" 
                className="text-base/6 font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-x-1 group"
              >
                Learn more <span className="text-green-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}