import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'LUM. Photography — California Wedding & Couples Photographer', description: 'Natural, emotional, timeless wedding and couples photography. A California photography studio for the moments that feel like you.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
