'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const GalleryViewer = dynamic(() => import('./gallery-viewer'), { ssr: false });

const categories = ['All', 'Weddings', 'Couples', 'Elopements'] as const;
type Category = typeof categories[number];
const gallery = [
  { id: 'weddings-01', category: 'Weddings', title: 'A promise in the garden', alt: 'A bride holding a white bouquet leans into the groom beneath a garden tree' },
  { id: 'couples-01', category: 'Couples', title: 'Where the ocean meets us', alt: 'A couple holds hands as they walk barefoot along the shoreline at sunset' },
  { id: 'elopements-01', category: 'Elopements', title: 'Only us, and the sea', alt: 'A groom reads from a booklet beside his bride on a cliff above the ocean' },
  { id: 'weddings-02', category: 'Weddings', title: 'An evening to remember', alt: 'A bride and groom laugh together at a candlelit outdoor reception' },
  { id: 'couples-02', category: 'Couples', title: 'The quiet kind of magic', alt: 'A couple sits close together in tall grass in the evening light' },
  { id: 'elopements-02', category: 'Elopements', title: 'Beneath the redwoods', alt: 'A bride and groom hold hands on a path among tall redwoods' },
  { id: 'weddings-03', category: 'Weddings', title: 'All the little things', alt: 'A bride carrying a bouquet and a groom walk hand in hand through a stone courtyard' },
  { id: 'couples-03', category: 'Couples', title: 'A little closer', alt: 'A couple embraces on a grassy bluff above a rocky shoreline' },
  { id: 'elopements-03', category: 'Elopements', title: 'Somewhere, just us', alt: 'A bride and groom touch foreheads above a mountain lake in golden light' },
];

export default function Gallery() {
  const [category, setCategory] = useState<Category>('All');
  const [selected, setSelected] = useState<string | null>(null);
  const visible = gallery.filter(photo => category === 'All' || photo.category === category);
  const selectedIndex = visible.findIndex(photo => photo.id === selected);

  return <section id="work" className="portfolio wrap section-space" aria-labelledby="work-title">
    <div className="section-heading"><div><p className="eyebrow">A FEW STORIES, CLOSE TO MY HEART</p><h2 id="work-title">Selected <em>work.</em></h2></div><p>A small collection of big feelings.<br/>The kind you never want to forget.</p></div>
    <div className="gallery-toolbar"><div className="gallery-filters" role="group" aria-label="Filter photographs by category">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setSelected(null); }}>{item}</button>)}</div><p className="gallery-count" role="status">{visible.length} {category === 'All' ? 'photographs' : `${category.toLowerCase()} photographs`}</p></div>
    <div className="gallery-grid" key={category}>{visible.map((photo, index) => <figure className="gallery-card" key={photo.id} style={{ animationDelay: `${index * 45}ms` }}><button className="photo gallery-image" type="button" onClick={() => setSelected(photo.id)} aria-label={`View ${photo.title}`} aria-haspopup="dialog" aria-describedby={`photo-description-${photo.id}`}><Image src={`/images/gallery/${photo.id}.jpg`} alt={photo.alt} fill sizes="(max-width: 560px) 88vw, (max-width: 1000px) calc(44vw - 14px), (min-width: 1637px) 462px, calc(29.33vw - 19px)"/><span className="gallery-view" aria-hidden="true">View photograph ↗</span></button><div hidden id={`photo-description-${photo.id}`}>{photo.alt}</div><figcaption><h3>{photo.title}</h3><span>{photo.category}</span></figcaption></figure>)}</div>
    {selectedIndex >= 0 && <GalleryViewer
      photos={visible}
      index={selectedIndex}
      onMove={index => setSelected(visible[index].id)}
      onClose={() => setSelected(null)}
    />}
  </section>;
}
