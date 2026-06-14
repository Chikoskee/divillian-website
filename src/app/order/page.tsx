export default function Order() {
  return (
    <div className="order-page-body">
      <div className="order-container">
        <h1>Order Request</h1>
        <p className="order-subtitle">Select your items and sizes. We&apos;ll email you for payment and confirmation.</p>

        <form action="https://formspree.io/f/mnjlvlnl" method="POST">
          <input type="hidden" name="_next" value="https://divillian-website.robertvtemployee.workers.dev/" />
          <input type="hidden" name="_subject" value="Divil'Lian Order: New Multi-Item Request" />

          <div className="selection-grid">

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/SkiMask-2.jpg" alt="Signature Ski Mask" />
              <span className="price-tag">$30.00</span>
              <label>Signature Ski Mask</label>
              <select name="SkiMask_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Ski Mask" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/FaceMask-black.jpg" alt="Black Face Mask" />
              <span className="price-tag">$15.00</span>
              <label>Black Face Mask</label>
              <select name="FaceMaskBlack_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Black Face Mask" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/FaceMask-white.jpg" alt="White Face Mask" />
              <span className="price-tag">$15.00</span>
              <label>White Face Mask</label>
              <select name="FaceMaskWhite_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="White Face Mask" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/buckethat-black.jpg" alt="Black Bucket Hat" />
              <span className="price-tag">$28.00</span>
              <label>Black Bucket Hat</label>
              <select name="BucketBlack_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Black Bucket Hat" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/buckethat-white.jpg" alt="White Bucket Hat" />
              <span className="price-tag">$28.00</span>
              <label>White Bucket Hat</label>
              <select name="BucketWhite_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="White Bucket Hat" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/BlackTshirt.png" alt="Black T-Shirt" />
              <span className="price-tag">$25.00</span>
              <label>Black T-Shirt</label>
              <select name="BlackTee_Size" className="size-select">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Black T-Shirt" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/WhiteTshirt.png" alt="White T-Shirt" />
              <span className="price-tag">$25.00</span>
              <label>White T-Shirt</label>
              <select name="WhiteTee_Size" className="size-select">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="White T-Shirt" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/GreenTshirt.png" alt="Green T-Shirt" />
              <span className="price-tag">$25.00</span>
              <label>Green T-Shirt</label>
              <select name="GreenTee_Size" className="size-select">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Green T-Shirt" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/MaroonTshirt.png" alt="Maroon T-Shirt" />
              <span className="price-tag">$25.00</span>
              <label>Maroon T-Shirt</label>
              <select name="MaroonTee_Size" className="size-select">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Maroon T-Shirt" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/PinkTshirt.png" alt="Pink T-Shirt" />
              <span className="price-tag">$25.00</span>
              <label>Pink T-Shirt</label>
              <select name="PinkTee_Size" className="size-select">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Pink T-Shirt" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/GreenHoodie.png" alt="Green Hoodie" />
              <span className="price-tag">$55.00</span>
              <label>Green Hoodie</label>
              <select name="GreenHoodie_Size" className="size-select">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Green Hoodie" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/GreyHoodie.png" alt="Grey Hoodie" />
              <span className="price-tag">$55.00</span>
              <label>Grey Hoodie</label>
              <select name="GreyHoodie_Size" className="size-select">
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Grey Hoodie" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Blacksocks.png" alt="Black Socks" />
              <span className="price-tag">$15.00</span>
              <label>Black Socks</label>
              <select name="BlackSocks_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Black Socks" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Redsocks.png" alt="Red Socks" />
              <span className="price-tag">$15.00</span>
              <label>Red Socks</label>
              <select name="RedSocks_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="Red Socks" />
                <span>Select</span>
              </label>
            </div>

            <div className="product-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Whitesocks.png" alt="White Socks" />
              <span className="price-tag">$15.00</span>
              <label>White Socks</label>
              <select name="WhiteSocks_Size" className="size-select"><option>One Size</option></select>
              <label className="checkbox-container">
                <input type="checkbox" name="Item" value="White Socks" />
                <span>Select</span>
              </label>
            </div>

          </div>

          <div className="form-section">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" required placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Full Shipping Address</label>
              <textarea name="address" rows={4} required placeholder="Street, City, State, Zip Code"></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit Order Request</button>
          </div>
        </form>

        <a href="/" className="back-link">← Return to Shop</a>
      </div>
    </div>
  );
}
