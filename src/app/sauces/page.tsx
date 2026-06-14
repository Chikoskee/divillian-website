'use client';

import { useState } from 'react';

const sauceData: Record<string, { glassImg: string; squeezeImg: string; title: string; desc: string }> = {
  subtlekick: {
    glassImg: '/sauce-subtlekick.jpeg',
    squeezeImg: '/Sauce-subtlekick2.jpeg',
    title: 'Subtle Kick',
    desc: 'A perfect introductory layer of mild heat paired with savory, smooth background notes.',
  },
  spicytalk: {
    glassImg: '/sauce-spicytalk.jpeg',
    squeezeImg: '/Sauce-spicytalk2.jpeg',
    title: 'Spicy Talk',
    desc: 'Bold heat that prompts a real conversation. Vibrant peppers balanced with crisp flavor profile layers.',
  },
  offthegrill: {
    glassImg: '/sauce-offthegrill.jpeg',
    squeezeImg: '/Sauce-offthegrill2.jpeg',
    title: 'Off The Grill',
    desc: 'Smoky, deep, barbecue-inspired rich fire profile. Excellent for heavy meats and marinades.',
  },
  fullflavor: {
    glassImg: '/sauce-fullflavor.jpeg',
    squeezeImg: '/Sauce-fullflavor2.jpeg',
    title: 'Full Flavor',
    desc: 'An intense blast of maximum aromatic components alongside an elegant, escalating burn.',
  },
};

export default function Sauces() {
  const [currentSauce, setCurrentSauce] = useState('subtlekick');
  const [packaging, setPackaging] = useState<'glass' | 'squeeze'>('glass');
  const [viewImg, setViewImg] = useState('/sauce-subtlekick.jpeg');
  const [viewTitle, setViewTitle] = useState('Subtle Kick');
  const [viewDesc, setViewDesc] = useState('A perfect introductory layer of mild heat paired with savory, smooth background notes.');
  const [viewFading, setViewFading] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function updateExplorer(sauceKey: string, pack: 'glass' | 'squeeze') {
    setViewFading(true);
    setTimeout(() => {
      const data = sauceData[sauceKey];
      setViewImg(pack === 'glass' ? data.glassImg : data.squeezeImg);
      setViewTitle(data.title);
      setViewDesc(data.desc);
      setViewFading(false);
    }, 200);
  }

  function switchSauce(key: string) {
    setCurrentSauce(key);
    updateExplorer(key, packaging);
  }

  function switchPackaging(pack: 'glass' | 'squeeze') {
    setPackaging(pack);
    updateExplorer(currentSauce, pack);
  }

  function openLightbox(src: string) {
    setLightboxSrc(src);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  return (
    <>
      {/* Header */}
      <header>
        <nav>
          <a href="/#home">Home</a>
          <div className="dropdown">
            <a href="/#apparel-shop">Shop ▾</a>
            <div className="dropdown-content">
              <a href="/#apparel-shop">T-Shirts</a>
              <a href="/#apparel-shop">Hoodies</a>
              <a href="/#apparel-shop">Ski Masks</a>
              <a href="/#apparel-shop">Face Masks</a>
              <a href="/#apparel-shop">Bucket Hats</a>
              <a href="/#apparel-shop">Socks</a>
            </div>
          </div>
          <a href="/sauces">Sauces</a>
          <a href="/#media">Media</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container">
        <h2 className="section-title">Gourmet Hot Sauces</h2>

        <div className="page-intro">
          <p>Four signature flavors, crafted in New Jersey. From a smooth introductory warmth to a full-flavor blast of fire — explore the lineup below, switch between glass and squeeze bottles, and click any image to take a closer look.</p>
        </div>

        {/* Sauce Showcase */}
        <div className="sauces-showcase">
          <div className="sauces-main-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sauce-all.jpeg" alt="Divil'Lian Hot Sauce Lineup" onClick={() => openLightbox('/sauce-all.jpeg')} />
          </div>
          <div className="sauce-explorer">
            <div className="sauce-nav">
              <button className={`sauce-nav-btn${currentSauce === 'subtlekick' ? ' active' : ''}`} onClick={() => switchSauce('subtlekick')}>Subtle Kick</button>
              <button className={`sauce-nav-btn${currentSauce === 'spicytalk' ? ' active' : ''}`} onClick={() => switchSauce('spicytalk')}>Spicy Talk</button>
              <button className={`sauce-nav-btn${currentSauce === 'offthegrill' ? ' active' : ''}`} onClick={() => switchSauce('offthegrill')}>Off The Grill</button>
              <button className={`sauce-nav-btn${currentSauce === 'fullflavor' ? ' active' : ''}`} onClick={() => switchSauce('fullflavor')}>Full Flavor</button>
            </div>
            <div className="explorer-display">
              <div className="img-wrapper" onClick={() => openLightbox(viewImg)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={viewImg} alt={viewTitle} style={{ opacity: viewFading ? 0 : 1 }} />
              </div>
              <div className="variant-toggle">
                <button className={`variant-btn${packaging === 'glass' ? ' active' : ''}`} onClick={() => switchPackaging('glass')}>Glass Bottle</button>
                <button className={`variant-btn${packaging === 'squeeze' ? ' active' : ''}`} onClick={() => switchPackaging('squeeze')}>Squeeze Bottle</button>
              </div>
              <h4 className="flavor-title">{viewTitle}</h4>
              <p className="flavor-desc">{viewDesc}</p>
              <a href="/order" className="buy-btn" style={{ maxWidth: 200, margin: '0 auto' }}>Order Flavor</a>
            </div>
          </div>
        </div>

        {/* Full Gallery */}
        <div className="sauce-gallery">
          <div className="sauce-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sauce-subtlekick.jpeg" alt="Subtle Kick" onClick={() => openLightbox('/sauce-subtlekick.jpeg')} />
            <h4>Subtle Kick</h4>
            <p>A perfect introductory layer of mild heat paired with savory, smooth background notes.</p>
            <a href="/order" className="buy-btn">Order Now</a>
          </div>
          <div className="sauce-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sauce-spicytalk.jpeg" alt="Spicy Talk" onClick={() => openLightbox('/sauce-spicytalk.jpeg')} />
            <h4>Spicy Talk</h4>
            <p>Bold heat that prompts a real conversation. Vibrant peppers balanced with crisp flavor profile layers.</p>
            <a href="/order" className="buy-btn">Order Now</a>
          </div>
          <div className="sauce-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sauce-offthegrill.jpeg" alt="Off The Grill" onClick={() => openLightbox('/sauce-offthegrill.jpeg')} />
            <h4>Off The Grill</h4>
            <p>Smoky, deep, barbecue-inspired rich fire profile. Excellent for heavy meats and marinades.</p>
            <a href="/order" className="buy-btn">Order Now</a>
          </div>
          <div className="sauce-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sauce-fullflavor.jpeg" alt="Full Flavor" onClick={() => openLightbox('/sauce-fullflavor.jpeg')} />
            <h4>Full Flavor</h4>
            <p>An intense blast of maximum aromatic components alongside an elegant, escalating burn.</p>
            <a href="/order" className="buy-btn">Order Now</a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <div className={`lightbox-modal${lightboxOpen ? ' open' : ''}`} onClick={closeLightbox}>
        <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {lightboxSrc && <img className="lightbox-content" src={lightboxSrc} alt="Expanded View" onClick={(e) => e.stopPropagation()} />}
      </div>

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
              <li><a href="/#home">Home</a></li>
              <li><a href="/#apparel-shop">Shop All</a></li>
              <li><a href="/sauces">Sauces</a></li>
              <li><a href="/#about">Our Story</a></li>
              <li><a href="/#media">Media Gallery</a></li>
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
