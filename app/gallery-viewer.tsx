'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Photo = { id: string; title: string; alt: string; category: string };

export default function GalleryViewer({
  photos, index, onMove, onClose,
}: {
  photos: readonly Photo[];
  index: number;
  onMove: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photos[index];

  useEffect(() => {
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function close() {
    dialog.current?.close();
    onClose();
  }

  function move(direction: number) {
    onMove((index + direction + photos.length) % photos.length);
  }

  return (
    <dialog
      ref={dialog}
      className="gallery-dialog"
      aria-label={photo.title}
      onCancel={event => { event.preventDefault(); close(); }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <div className="gallery-viewer">
        <button type="button" className="gallery-close" onClick={close} autoFocus aria-label="Close photograph viewer">Close ×</button>
        <div className="gallery-full-image" key={photo.id}>
          <Image src={`/images/gallery/${photo.id}.jpg`} alt={photo.alt} fill unoptimized loading="eager"/>
        </div>
        <div className="gallery-viewer-footer">
          <button type="button" onClick={() => move(-1)} aria-label="Previous photograph">←</button>
          <div><h3>{photo.title}</h3><p>{photo.category} · {index + 1} / {photos.length}</p></div>
          <button type="button" onClick={() => move(1)} aria-label="Next photograph">→</button>
        </div>
      </div>
    </dialog>
  );
}
