// app/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { FeaturedProducts } from './components/FeaturedProdects';
import { Testimonials } from './components/Testimonials';
import { Stats } from './components/Stats';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample products data
  

  
  

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <FeaturedProducts />
      <Testimonials />
      <Stats />
      <CallToAction />
      <Footer />
    </div>
  );
}