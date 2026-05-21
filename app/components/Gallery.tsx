'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

export type Photo = { file: string; w: number; h: number };
type Row = { photos: Photo[]; height: number };

// Width to assume for server-side render so crawlers and no-JS users
// receive a fully-laid-out gallery. The client re-measures on hydration.
const SSR_WIDTH = 1280;

// Justified row layout (Flickr / Google Photos style).
function buildRows(
  items: Photo[],
  containerWidth: number,
  targetHeight: number,
  gap: number
): Row[] {
  if (items.length === 0 || containerWidth <= 0) return [];

  const rows: Row[] = [];
  let currentRow: Photo[] = [];

  const rowHeight = (row: Photo[]) => {
    const totalGap = (row.length - 1) * gap;
    const sumAspect = row.reduce((s, p) => s + p.w / p.h, 0);
    return (containerWidth - totalGap) / sumAspect;
  };

  // No clamp: Dianne wants every row to fill full container width even if
  // a row ends up unusually tall or short. Trade-off: occasional outlier
  // row size, but no trailing whitespace.
  for (const photo of items) {
    if (currentRow.length === 0) {
      currentRow = [photo];
      continue;
    }
    const withPhoto = [...currentRow, photo];
    const errWith = Math.abs(rowHeight(withPhoto) - targetHeight);
    const errWithout = Math.abs(rowHeight(currentRow) - targetHeight);
    if (errWith <= errWithout) {
      currentRow = withPhoto;
    } else {
      rows.push({ photos: currentRow, height: rowHeight(currentRow) });
      currentRow = [photo];
    }
  }
  if (currentRow.length > 0) {
    rows.push({ photos: currentRow, height: rowHeight(currentRow) });
  }
  return rows;
}

function targetFor(width: number) {
  return Math.max(180, Math.min(360, width * 0.26));
}

export default function Gallery({
  photos,
  gap = 0,
}: {
  photos: Photo[];
  gap?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(SSR_WIDTH);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const targetHeight = targetFor(width);

  const rows = useMemo(
    () => buildRows(photos, width, targetHeight, gap),
    [photos, width, targetHeight, gap]
  );

  const selected = selectedIndex !== null ? photos[selectedIndex] : null;
  const close = () => setSelectedIndex(null);
  const next = () =>
    setSelectedIndex((i) =>
      i === null ? null : (i + 1) % photos.length
    );
  const prev = () =>
    setSelectedIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length
    );

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedIndex]);

  return (
    <>
      <div ref={containerRef}>
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="flex items-start"
            style={{ marginBottom: ri < rows.length - 1 ? gap : 0 }}
          >
            {row.photos.map((photo, pi) => {
              const w = (photo.w * row.height) / photo.h;
              return (
                <button
                  key={photo.file}
                  onClick={() =>
                    setSelectedIndex(
                      photos.findIndex((orig) => orig.file === photo.file)
                    )
                  }
                  style={{
                    width: `${w}px`,
                    height: `${row.height}px`,
                    marginLeft: pi > 0 ? gap : 0,
                  }}
                  className="block group cursor-zoom-in shrink-0 overflow-hidden"
                  aria-label="Open larger view"
                >
                  <Image
                    src={`/images/${photo.file}`}
                    alt="Photograph by Dianne Woods"
                    width={photo.w}
                    height={photo.h}
                    sizes={`${Math.ceil(w)}px`}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph by Dianne Woods"
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
          >
            &times;
          </button>
          <button
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl hover:text-gray-300 z-10 px-3 py-2"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
          >
            &lsaquo;
          </button>
          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl hover:text-gray-300 z-10 px-3 py-2"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
          >
            &rsaquo;
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={selected.file}
              src={`/images/${selected.file}`}
              alt="Photograph by Dianne Woods"
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
