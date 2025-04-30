import { WebsiteState } from "./constants";

// Function to generate HTML
export const generateHTML = (data: WebsiteState): string => {
  const { 
    businessName, 
    headline, 
    subheadline, 
    features, 
    testimonials, 
    email,
    phone,
    address,
    footerDescription,
    colorTheme,
    socialLinks,
    portfolioImages,
    contactFormEnabled,
    logoImage,
    partnerLogos,
    metaDescription,
    metaKeywords,
    headScripts,
    bodyScripts
  } = data;
    
  // Create placeholder for features section
  const featuresHTML = features.map((feature, index) => `
    <div class="feature-card">
      <div class="feature-icon"><i class="fas ${feature.icon}"></i></div>
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    </div>
  `).join('');
    
  // Create placeholder for testimonials section
  const testimonialsHTML = testimonials.map((testimonial, index) => `
    <div class="testimonial-card">
      <div class="testimonial-image">
        ${testimonial.image ? `<img src="images/testimonial-${index+1}.jpg" alt="${testimonial.name}">` : '<div class="placeholder-image"></div>'}
      </div>
      <p class="testimonial-text">"${testimonial.text}"</p>
      <p class="testimonial-author">- ${testimonial.name}, ${testimonial.role}</p>
    </div>
  `).join('');
    
  // Create placeholder for portfolio/gallery section
  const portfolioHTML = portfolioImages.map((image, index) => `
    <div class="portfolio-item">
      <div class="portfolio-image">
        <img src="images/portfolio-${index+1}.jpg" alt="Portfolio Item ${index+1}">
      </div>
      <div class="portfolio-overlay">
        <h3>${image.title || `Project ${index+1}`}</h3>
        <p>${image.description || 'Click to see more details'}</p>
      </div>
    </div>
  `).join('');
    
  // Create social links HTML
  const socialLinksHTML = socialLinks
    .filter(link => link.url)
    .map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.platform}">
        <i class="fab ${link.icon}"></i>
      </a>
    `).join('');
    
  // Create partner logos HTML
  const partnerLogosHTML = partnerLogos.map((logo, index) => `
    <div class="partner-logo">
      <img src="images/partner-${index+1}.jpg" alt="${logo.name || 'Partner logo'}">
    </div>
  `).join('');

  // Create the complete HTML structure
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${metaDescription || `${businessName} - ${headline}`}">
    <meta name="keywords" content="${metaKeywords || `${businessName}, business, services`}">
    <meta name="author" content="${businessName}">
    <title>${businessName}</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Open Graph meta tags for social sharing -->
    <meta property="og:title" content="${businessName}">
    <meta property="og:description" content="${headline}">
    <meta property="og:type" content="website">
    <!-- Add canonical URL in production -->
    <!-- <meta property="og:url" content="https://www.yourbusiness.com"> -->
    <!-- <link rel="canonical" href="https://www.yourbusiness.com"> -->
    <!-- Favicon -->
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    ${headScripts || ''}
</head>
<body>
    <!-- Navigation -->
    <header>
        <nav class="navbar">
            <div class="container">
                <div class="logo">
                    ${logoImage ? '<img src="images/logo.png" alt="' + businessName + '">' : businessName}
                </div>
                <div class="nav-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#testimonials">Testimonials</a>
                    ${partnerLogos.length > 0 ? '<a href="#partners">Partners</a>' : ''}
                    <a href="#contact" class="btn-primary">Contact Us</a>
                </div>
                <div class="mobile-menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="container">
            <h1>${headline}</h1>
            <p>${subheadline}</p>
            <a href="#contact" class="btn-primary">Get Started</a>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <div class="container">
            <h2>Our Features</h2>
            <div class="features-grid">
                ${featuresHTML}
            </div>
        </div>
    </section>
    <!-- Portfolio Section -->
  ${portfolioImages.length > 0 ? `
  <section id="portfolio" class="portfolio">
      <div class="container">
          <h2>Our Portfolio</h2>
          <div class="portfolio-grid">
              ${portfolioHTML}
          </div>
      </div>
  </section>
  ` : ''}

  <!-- Testimonials Section -->
  <section id="testimonials" class="testimonials">
      <div class="container">
          <h2>What Our Clients Say</h2>
          <div class="testimonials-grid">
              ${testimonialsHTML}
          </div>
      </div>
  </section>

  <!-- Partner Logos Section -->
  ${partnerLogos.length > 0 ? `
  <section id="partners" class="partners">
      <div class="container">
          <h2>Our Partners</h2>
          <div class="partners-grid">
              ${partnerLogosHTML}
          </div>
      </div>
  </section>
  ` : ''}

  <!-- Contact Section -->
  <section id="contact" class="contact">
      <div class="container">
          <h2>Get In Touch</h2>
          <div class="contact-grid">
              <div class="contact-info">
                  <div class="contact-item">
                      <i class="fas fa-envelope"></i>
                      <p>Email: <a href="mailto:${email}">${email}</a></p>
                  </div>
                  ${phone ? `
                  <div class="contact-item">
                      <i class="fas fa-phone"></i>
                      <p>Phone: <a href="tel:${phone.replace(/[^0-9+]/g, '')}">${phone}</a></p>
                  </div>
                  ` : ''}
                  ${address ? `
                  <div class="contact-item">
                      <i class="fas fa-map-marker-alt"></i>
                      <p>Address: ${address}</p>
                  </div>
                  ` : ''}
                  ${socialLinksHTML ? `
                      <div class="contact-social">
                          <h3>Follow Us</h3>
                          <div class="social-links">
                              ${socialLinksHTML}
                          </div>
                      </div>
                      ` : ''}
                  </div>
                  ${contactFormEnabled ? `
                  <div class="contact-form">
                      <form id="contact-form">
                          <div class="form-group">
                              <label for="name">Your Name</label>
                              <input type="text" id="name" name="name" required>
                          </div>
                          <div class="form-group">
                              <label for="email">Your Email</label>
                              <input type="email" id="email" name="email" required>
                          </div>
                          <div class="form-group">
                              <label for="subject">Subject</label>
                              <input type="text" id="subject" name="subject" required>
                          </div>
                          <div class="form-group">
                              <label for="message">Message</label>
                              <textarea id="message" name="message" rows="5" required></textarea>
                          </div>
                          <button type="submit" class="btn-primary">Send Message</button>
                      </form>
                  </div>
                  ` : `
                  <div class="newsletter-form-container">
                      <h3>Join our newsletter</h3>
                      <p>Stay updated with our latest news and offers.</p>
                      <form id="newsletter-form" class="newsletter-form">
                          <input type="email" placeholder="Your email address" required>
                          <button type="submit" class="btn-primary">Subscribe</button>
                      </form>
                  </div>
                  `}
              </div>
          </div>
      </section>
  
      <!-- Footer -->
      <footer>
          <div class="container">
              <div class="footer-content">
                  <div class="footer-section">
                      <h3>${businessName}</h3>
                      <p>${footerDescription || 'Your trusted partner for business solutions.'}</p>
                  </div>
                  <div class="footer-section">
                      <h3>Quick Links</h3>
                      <ul class="footer-links">
                          <li><a href="#home">Home</a></li>
                          <li><a href="#features">Features</a></li>
                          <li><a href="#portfolio">Portfolio</a></li>
                          <li><a href="#testimonials">Testimonials</a></li>
                          <li><a href="#contact">Contact</a></li>
                      </ul>
                  </div>
                  <div class="footer-section">
                  <h3>Contact Us</h3>
                  <p>Email: <a href="mailto:${email}">${email}</a></p>
                  ${phone ? `<p>Phone: <a href="tel:${phone.replace(/[^0-9+]/g, '')}">${phone}</a></p>` : ''}
                  ${address ? `<p>Address: ${address}</p>` : ''}
              </div>
              <div class="footer-section">
                  <h3>Follow Us</h3>
                  <div class="social-links">
                      ${socialLinksHTML}
                  </div>
              </div>
          </div>
          <div class="footer-bottom">
              <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
          </div>
      </div>
  </footer>

  <!-- Mobile menu script -->
  <script>
      document.addEventListener('DOMContentLoaded', function() {
          const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
          const navLinks = document.querySelector('.nav-links');
          
          if (mobileMenuBtn && navLinks) {
              mobileMenuBtn.addEventListener('click', function() {
                  navLinks.classList.toggle('active');
                  mobileMenuBtn.classList.toggle('active');
              });
          }
      });
  </script>
  ${bodyScripts || ''}
</body>
</html>`;
};
