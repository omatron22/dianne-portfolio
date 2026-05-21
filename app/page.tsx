import Image from 'next/image';
import Navigation from './components/Navigation';
import Gallery, { type Photo } from './components/Gallery';
import photoData from './photos.json';

const photos: Photo[] = photoData.photos;

const books = [
  { title: 'Departure', image: '/books/Departure.jpg' },
  { title: 'Pairings', image: '/books/Pairings.jpg' },
  { title: 'Resonance', image: '/books/Resonance.jpg' },
];

const BOOKS_URL =
  'https://www.lulu.com/search?contributor=Dianne+Woods&q=Resonance%2C+Pairings%2C+Departure%2C+Dianne+Woods%2C+Ken+Owen';

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full">
        <Image
          src="/images/_DSF0286-03-150.jpg"
          alt="Photograph by Dianne Woods"
          fill
          className="object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-black">
        <Gallery photos={photos} />
      </section>

      {/* Books Section — full viewport so nav-click centers cleanly */}
      <section
        id="books"
        className="min-h-screen bg-black flex items-center justify-center px-6"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {books.map((book) => (
              <div key={book.title} className="flex flex-col">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={1224}
                  height={1224}
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
              href={BOOKS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider text-sm uppercase"
            >
              Purchase Books
            </a>
          </div>
        </div>
      </section>

      {/* Bio Section — full viewport so nav-click centers cleanly */}
      <section
        id="bio"
        className="min-h-screen bg-black flex items-center justify-center px-6"
      >
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-white space-y-6 leading-relaxed text-lg">
            <p>
              I grew up in Los Angeles and graduated from Art Center College of Design in 1977.
              After 40 years as a commercial photographer working with advertising agencies,
              design groups, book publishers, and magazines, I&rsquo;m now retired and have turned
              my attention toward fine art photography, with a particular interest in performers,
              gardens and landscapes, and still life. I&rsquo;m interested in moments observed
              rather than arranged, and in details that often go unnoticed.
            </p>

            <p className="pt-4 italic">
              Dianne Woods
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-black">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-neutral-400">
          <p>
            <a
              href="mailto:diannepwoods@gmail.com"
              className="underline hover:text-white transition-colors"
            >
              diannepwoods@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
