'use client';

import { useRef, useState } from 'react';

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

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [shopFilter, setShopFilter] = useState('all');
  const [currentSauce, setCurrentSauce] = useState('subtlekick');
  const [packaging, setPackaging] = useState<'glass' | 'squeeze'>('glass');
  const [viewImg, setViewImg] = useState('/sauce-subtlekick.jpeg');
  const [viewTitle, setViewTitle] = useState('Subtle Kick');
  const [viewDesc, setViewDesc] = useState('A perfect introductory layer of mild heat paired with savory, smooth background notes.');
  const [viewFading, setViewFading] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function toggleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  function filterShop(category: string) {
    setShopFilter(category);
    if (category !== 'all') {
      document.getElementById('apparel-shop')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

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

  function hidden(category: string) {
    return shopFilter !== 'all' && shopFilter !== category;
  }

  return (
    <>
      {/* Hero Video */}
      <div id="home">
        <button className="mute-btn" onClick={toggleMute}>
          <span>{muted ? '🔇' : '🔊'}</span>
          <span>{muted ? 'Unmute' : 'Mute'}</span>
        </button>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={videoRef} id="hero-video" className="full-width-media" autoPlay loop muted playsInline>
          <source src="/DevTopvideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Banner */}
      <div className="middle-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Banner.png" alt="Divil'Lian Banner" />
      </div>

      {/* Header */}
      <header>
        <nav>
          <a href="#home">Home</a>
          <div className="dropdown">
            <a href="#apparel-shop" onClick={() => filterShop('all')}>Shop ▾</a>
            <div className="dropdown-content">
              <a onClick={() => filterShop('tshirt')}>T-Shirts</a>
              <a onClick={() => filterShop('hoodie')}>Hoodies</a>
              <a onClick={() => filterShop('skimask')}>Ski Masks</a>
              <a onClick={() => filterShop('facemask')}>Face Masks</a>
              <a onClick={() => filterShop('buckethat')}>Bucket Hats</a>
              <a onClick={() => filterShop('socks')}>Socks</a>
            </div>
          </div>
          <a href="/sauces">Sauces</a>
          <a href="#media">Media</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Shop Grid */}
      <div className="container" id="apparel-shop">
        <h2 className="section-title">Full Collection</h2>
        <div className="shop-grid">
          <div className={`shop-item skimask${hidden('skimask') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/SkiMask-2.jpg" alt="Signature Ski Mask" />
            <h4>Signature Ski Mask</h4><p className="price">$30.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item facemask${hidden('facemask') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/FaceMask-black.jpg" alt="Black Face Mask" />
            <h4>Black Face Mask</h4><p className="price">$15.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item facemask${hidden('facemask') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/FaceMask-white.jpg" alt="White Face Mask" />
            <h4>White Face Mask</h4><p className="price">$15.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item buckethat${hidden('buckethat') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/buckethat-black.jpg" alt="Black Bucket Hat" />
            <h4>Black Bucket Hat</h4><p className="price">$28.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item buckethat${hidden('buckethat') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/buckethat-white.jpg" alt="White Bucket Hat" />
            <h4>White Bucket Hat</h4><p className="price">$28.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item tshirt${hidden('tshirt') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/BlackTshirt.png" alt="Classic Black Tee" />
            <h4>Classic Black Tee</h4><p className="price">$25.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item tshirt${hidden('tshirt') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/GreenTshirt.png" alt="Green Tee" />
            <h4>Green Tee</h4><p className="price">$25.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item tshirt${hidden('tshirt') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/MaroonTshirt.png" alt="Maroon Tee" />
            <h4>Maroon Tee</h4><p className="price">$25.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item tshirt${hidden('tshirt') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/PinkTshirt.png" alt="Pink Tee" />
            <h4>Pink Tee</h4><p className="price">$25.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item tshirt${hidden('tshirt') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/WhiteTshirt.png" alt="White Tee" />
            <h4>White Tee</h4><p className="price">$25.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item hoodie${hidden('hoodie') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/GreenHoodie.png" alt="Green Hoodie" />
            <h4>Green Hoodie</h4><p className="price">$55.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item hoodie${hidden('hoodie') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/GreyHoodie.png" alt="Grey Hoodie" />
            <h4>Grey Hoodie</h4><p className="price">$55.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item socks${hidden('socks') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Blacksocks.png" alt="Black Socks" />
            <h4>Black Socks</h4><p className="price">$15.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item socks${hidden('socks') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Redsocks.png" alt="Red Socks" />
            <h4>Red Socks</h4><p className="price">$15.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
          <div className={`shop-item socks${hidden('socks') ? ' hidden' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Whitesocks.png" alt="White Socks" />
            <h4>White Socks</h4><p className="price">$15.00</p>
            <a href="/order" className="buy-btn">Buy Now</a>
          </div>
        </div>
      </div>

      {/* About */}
      <div id="about" className="container">
        <h2 className="section-title">About Divil&apos;Lian</h2>
        <div className="about-text">
          <p style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.4, color: '#111', letterSpacing: '0.5px' }}>
            Doing what you got to do to survive, for those who look over the skies but over looked by some eyes but are overlooked by some eyes. Born in New Jersey, the little big brother of the east, for those trying to scrap for a plate at the feast! Divil&apos;Lians.
          </p>
        </div>
      </div>

      {/* Sauces Section */}
      <div id="sauces" className="container" style={{ paddingTop: 0, paddingBottom: '4rem' }}>
        <h2 className="section-title">Gourmet Hot Sauces</h2>
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
      </div>

      {/* Lightbox */}
      <div className={`lightbox-modal${lightboxOpen ? ' open' : ''}`} onClick={closeLightbox}>
        <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {lightboxSrc && <img className="lightbox-content" src={lightboxSrc} alt="Expanded View" onClick={(e) => e.stopPropagation()} />}
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
