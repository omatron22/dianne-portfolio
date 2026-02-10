'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from './components/Navigation';

const images = [
  'image12.jpg',
  'image7.jpg',
  'image3.jpg',
  'image15.jpg',
  'image9.jpg',
  'image1.jpg',
  'image18.jpg',
  'image5.jpg',
  'image14.jpg',
  'image11.jpg',
  'image6.jpg',
  'image19.jpg',
  'image2.jpg',
  'image8.jpg',
  'image16.jpg',
  'image4.jpg',
  'image13.jpg',
  'image10.jpg',
  'image17.jpg',
  'image20.jpg',
];

const books = [
  {
    title: 'Departure',
    image: '/books/Departure.jpg',
  },
  {
    title: 'Pairings',
    image: '/books/Pairings.jpg',
  },
  {
    title: 'Resonance',
    image: '/books/Resonance.jpg',
  },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full">
        <Image
          src="/images/image1.jpg"
          alt="Dianne Woods Photography"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen bg-black">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-0">
          {images.map((image) => (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className="relative w-full mb-0 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer block"
            >
              <Image
                src={`/images/${image}`}
                alt={image}
                width={800}
                height={800}
                className="w-full h-auto"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-12 pt-32 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {books.map((book) => (
              <div key={book.title} className="flex flex-col">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={800}
                  height={1000}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-white text-lg mb-8 tracking-wide">
              Collaborative photography books created with poet, Ken Owen
            </p>
            <a
              href="http://bit.ly/3UEy2LV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider text-sm uppercase"
            >
              Purchase Books
            </a>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section id="statement" className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto px-12 pt-20 pb-24">
          <div className="text-white space-y-6 leading-relaxed text-lg">
            <p>
              After many years working as a commercial photographer, I now value the freedom 
              to work without expectation. Since I no longer photograph for assignment or 
              outcome, what remains is a quieter practice—one shaped by time, familiarity, and 
              the pleasure of sustained looking. The camera has become a way of keeping 
              company with the world rather than describing it.
            </p>

            <p>
              The images I make now are rooted in ordinary encounters: a pair of figures resting 
              at the edge of a landscape, an animal half-present and half-withheld, a moment of 
              private concentration. I am drawn to what reveals itself slowly, often with a trace 
              of humor or tenderness. These photographs are less about subject matter than about 
              attention—about staying with a scene long enough for it to become itself. Age, 
              memory, and the passage of time hover in these images, not as themes to be 
              declared, but as conditions quietly felt.
            </p>

            <p>
              My recent collaborative books with poet Ken Owen grow out of this sensibility. 
              Together, we explore how photographs and poems can coexist without explanation—each 
              leaving space for the other, and for the reader. The photographs I contribute 
              are made with that same openness, inviting reflection rather than resolution.
            </p>

            <p>
              At this stage of my life, photography is not about accumulation or ambition. It is an 
              act of noticing, a way of remaining present.
            </p>

            <p className="pt-4 italic">
              Dianne Woods
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={`/images/${selectedImage}`}
              alt={selectedImage}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}

      {/* Footer / Contact */}
<footer className="bg-black">
  <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-neutral-400">
    <p>
      <a
        href="mailto:dpwoods@earthlink.net"
        className="underline hover:text-white transition-colors"
      >
        dpwoods@earthlink.net
      </a>
    </p>
  </div>
</footer>

    </>
  );
}
