'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const categories = ['All', 'Weddings', 'Couples', 'Elopements'] as const;
type Category = typeof categories[number];
const gallery = [
  { id: 'weddings-01', category: 'Weddings', title: 'A promise in the garden', alt: 'Newlyweds embracing in a sunlit garden surrounded by olive trees' },
  { id: 'couples-01', category: 'Couples', title: 'Where the ocean meets us', alt: 'A couple walking barefoot together along the shoreline at sunset' },
  { id: 'elopements-01', category: 'Elopements', title: 'Only us, and the sea', alt: 'Newlyweds exchanging vows on a cliff above the Pacific Ocean' },
  { id: 'weddings-02', category: 'Weddings', title: 'An evening to remember', alt: 'Newlyweds laughing at a candlelit outdoor vineyard reception' },
  { id: 'couples-02', category: 'Couples', title: 'The quiet kind of magic', alt: 'A couple cuddling together in a softly sunlit meadow' },
  { id: 'elopements-02', category: 'Elopements', title: 'Beneath the redwoods', alt: 'Newlyweds walking hand in hand through a redwood forest' },
  { id: 'weddings-03', category: 'Weddings', title: 'All the little things', alt: 'Newlyweds holding hands beside a bouquet in a warm stone courtyard' },
  { id: 'couples-03', category: 'Couples', title: 'A little closer', alt: 'A couple embracing on a coastal path among windswept grasses' },
  { id: 'elopements-03', category: 'Elopements', title: 'Somewhere, just us', alt: 'A newly married couple beside an alpine lake at sunrise' },
];

export default function Gallery() {
  const [category, setCategory] = useState<Category>('All');
  const [selected, setSelected] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = gallery.filter(photo => category === 'All' || photo.category === category);
  const active = visible.find(photo => photo.id === selected);
  function move(direction: number) {
    const index = visible.findIndex(photo => photo.id === selected);
    setSelected(visible[(index + direction + visible.length) % visible.length].id);
  }
  const viewerOpen = selected !== null;
  useEffect(() => {
    if (!viewerOpen) return;
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, [viewerOpen]);

  return <section id="work" className="portfolio wrap section-space" aria-labelledby="work-title">
    <div className="section-heading"><div><p className="eyebrow">A FEW STORIES, CLOSE TO MY HEART</p><h2 id="work-title">Selected <em>work.</em></h2></div><p>A small collection of big feelings.<br/>The kind you never want to forget.</p></div>
    <div className="gallery-toolbar"><div className="gallery-filters" role="group" aria-label="Filter photographs by category">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><p className="gallery-count" role="status">{visible.length} {category === 'All' ? 'photographs' : `${category.toLowerCase()} photographs`}</p></div>
    <div className="gallery-grid" key={category}>{visible.map((photo, index) => <figure className="gallery-card" key={photo.id} style={{ animationDelay: `${index * 45}ms` }}><button className="photo gallery-image" type="button" onClick={() => setSelected(photo.id)} aria-label={`View ${photo.title}`} aria-haspopup="dialog"><Image src={`/images/gallery/${photo.id}.jpg`} alt={photo.alt} fill sizes="(max-width: 560px) 88vw, (max-width: 1000px) 43vw, 28vw"/><span className="gallery-view" aria-hidden="true">View photograph ↗</span></button><figcaption><h3>{photo.title}</h3><span>{photo.category}</span></figcaption></figure>)}</div>
    <dialog ref={dialog} className="gallery-dialog" aria-label={active?.title ?? 'Photograph viewer'} onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
      {active && <div className="gallery-viewer"><button type="button" className="gallery-close" onClick={() => setSelected(null)} autoFocus aria-label="Close photograph viewer">Close ×</button><div className="gallery-full-image" key={active.id}><Image src={`/images/gallery/${active.id}.jpg`} alt={active.alt} fill sizes="90vw"/></div><div className="gallery-viewer-footer"><button type="button" onClick={() => move(-1)} aria-label="Previous photograph">←</button><div><h3>{active.title}</h3><p>{active.category} · {visible.findIndex(photo => photo.id === selected) + 1} / {visible.length}</p></div><button type="button" onClick={() => move(1)} aria-label="Next photograph">→</button></div></div>}
    </dialog>
  </section>;
}
