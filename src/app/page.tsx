import Link from 'next/link';
import HeroVideo from '@/app/components/HeroVideo';
import SaucesTeaser from '@/app/components/SaucesTeaser';
import SocialIcons from '@/app/components/SocialIcons';
import MerchCatalog from '@/app/merch/MerchCatalog';
import { createClient } from '@/lib/supabase/server';

const VIDEO_PLACEHOLDERS = [
  { title: 'Behind the Heat', description: 'A look at how the sauces come together.' },
  { title: 'Street Heat Lookbook', description: 'Styling the latest apparel drop.' },
  { title: 'Flavor Drop Teaser', description: "A first taste of what's cooking next." },
];

export default async function Home() {
  const supabase = await createClient();
  const { data: merchItems } = await supabase
    .from('merch')
    .select('id, name, slug, price, images, category')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  return (
    <>
      <HeroVideo />

      {/* Banner */}
      <div className="middle-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Banner.png" alt="Divil&apos;Lian Banner" />
      </div>

      {/* Header */}
      <header>
        <nav>
          <a href="#home">Home</a>
          <Link href="/sauces">Sauces</Link>
          <Link href="/merch">Merch</Link>
          <a href="#media">Media</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="container" id="apparel-shop">
        <h2 className="section-title">Merch</h2>
        {!merchItems || merchItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
            No merch available yet — check back soon.
          </p>
        ) : (
          <MerchCatalog items={merchItems} />
        )}
      </div>

      <SaucesTeaser />

      {/* About */}
      <div id="about" className="container">
        <h2 className="section-title">About Divil&apos;Lian</h2>
        <div className="about-text">
          <p className="about-lead">
            Doing what you got to do to survive, for those who look over the skies but are overlooked by some eyes. Born in New Jersey, the little big brother of the east, for those trying to scrap for a plate at the feast! Divil&apos;Lians.
          </p>
        </div>
      </div>

      {/* Media */}
      <section id="media" className="media-section">
        <h2 className="section-title">Media</h2>
        <div className="video-placeholder-grid">
          {VIDEO_PLACEHOLDERS.map(video => (
            <div className="video-placeholder-card" key={video.title}>
              <div className="video-placeholder-thumb">
                <span className="teaser-badge">Coming Soon</span>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h4>{video.title}</h4>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
        <div className="spinning-logo-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/spinninglogo.gif" alt="Spinning Logo" />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Divil&apos;Lian</h4>
            <p>Premium apparel and gourmet flavors crafted in New Jersey, USA. Representing the bold and the authentic since 2026.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="/sauces">Sauces</a></li>
              <li><a href="/merch">Merch</a></li>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#media">Media Gallery</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📍 Jersey City, New Jersey, USA</p>
            <p>📧 info@divillian.com</p>
            <SocialIcons />
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Get the latest drops and spicy news.</p>
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Divil&apos;Lian. All rights reserved. Made with fire in New Jersey.</p>
        </div>
      </footer>
    </>
  );
}
