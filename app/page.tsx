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

// Dianne's short film, "One Year Photographing Music".
const FILM_URL = 'https://www.youtube.com/watch?v=kOs8Pes6K94';

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="relative h-[100svh] w-full">
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
        className="min-h-screen bg-black flex items-center justify-center px-3 sm:px-6"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-0">
            {books.map((book) => (
              <div key={book.title} className="flex flex-col">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={1224}
                  height={1224}
                  className="w-full h-auto"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p
              className="text-white text-xl mb-8"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              Collaborative photography books created with poet, Ken Owen
            </p>
            <a
              href={BOOKS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white text-lg italic underline decoration-neutral-500 underline-offset-4 hover:decoration-white transition-colors"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              Purchase the books
            </a>
          </div>
        </div>
      </section>

      {/* Film Section — full viewport so nav-click centers cleanly */}
      <section
        id="film"
        className="min-h-screen bg-black flex items-center justify-center px-6"
      >
        <a
          href={FILM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-3xl mx-auto group"
          aria-label="Watch the film: One Year Photographing Music"
        >
          <Image
            src="/film/Title-150.jpg"
            alt="One Year Photographing Music — a short film"
            width={1500}
            height={426}
            className="w-full h-auto transition-opacity duration-300 group-hover:opacity-80"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </a>
      </section>

      {/* Bio Section — full viewport so nav-click centers cleanly */}
      <section
        id="bio"
        className="min-h-screen bg-black flex items-center justify-center px-6"
      >
        <div
          className="w-full max-w-4xl mx-auto"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          <div className="text-white space-y-6 leading-relaxed text-lg sm:text-xl">
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
