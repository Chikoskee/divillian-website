import Link from 'next/link';
import HeroVideo from '@/app/components/HeroVideo';
import FeaturedDrops from '@/app/components/FeaturedDrops';

export default function Home() {
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

      <FeaturedDrops />

      {/* About */}
      <div id="about" className="container">
        <h2 className="section-title">About Divil&apos;Lian</h2>
        <div className="about-text">
          <p style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4, color: '#111', letterSpacing: '0.5px' }}>
            Doing what you got to do to survive, for those who look over the skies but over looked by some eyes but are overlooked by some eyes. Born in New Jersey, the little big brother of the east, for those trying to scrap for a plate at the feast! Divil&apos;Lians.
          </p>
        </div>
      </div>

      {/* Media */}
      <section id="media" className="media-section">
        <h2 className="section-title">Media</h2>
        <div className="video-grid">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className="media-video" controls playsInline><source src="/Samplevideo1.mp4" type="video/mp4" /></video>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className="media-video" controls playsInline><source src="/Samplevideo2.mp4" type="video/mp4" /></video>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className="media-video" controls playsInline><source src="/SampleVideo3.mp4" type="video/mp4" /></video>
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
              <li><a href="#apparel-shop">Shop All</a></li>
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
            <p>📸 Instagram: @DivilLian</p>
            <p>🎥 TikTok: @DivilLianOfficial</p>
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
