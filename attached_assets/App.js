import React, { useState } from 'react';
import { Save, Download, Upload, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, GitHub } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Color themes presets
const COLOR_THEMES = {
  modern: {
    name: 'Modern Blue',
    primary: '#1a73e8',
    secondary: '#4285f4',
    accent: '#fbbc05',
    text: '#202124',
    background: '#ffffff',
    lightBg: '#f8f9fa'
  },
  nature: {
    name: 'Natural Green',
    primary: '#34a853',
    secondary: '#178038',
    accent: '#fbbc05',
    text: '#3c4043',
    background: '#ffffff',
    lightBg: '#f1f3f4'
  },
  elegant: {
    name: 'Elegant Purple',
    primary: '#673ab7',
    secondary: '#512da8',
    accent: '#ff9800',
    text: '#212121',
    background: '#ffffff',
    lightBg: '#f5f5f5'
  },
  vibrant: {
    name: 'Vibrant Red',
    primary: '#ea4335',
    secondary: '#c5221f',
    accent: '#4285f4',
    text: '#202124',
    background: '#ffffff',
    lightBg: '#f8f9fa'
  },
  minimal: {
    name: 'Minimal Gray',
    primary: '#5f6368',
    secondary: '#3c4043',
    accent: '#1a73e8',
    text: '#202124',
    background: '#ffffff',
    lightBg: '#f8f9fa'
  },
  dark: {
    name: 'Dark Mode',
    primary: '#4285f4',
    secondary: '#1a73e8',
    accent: '#fbbc05',
    text: '#e8eaed',
    background: '#202124',
    lightBg: '#303134'
  }
};

// Social media platforms
const SOCIAL_PLATFORMS = [
  { name: 'Facebook', icon: 'fa-facebook-f', component: Facebook },
  { name: 'Twitter', icon: 'fa-twitter', component: Twitter },
  { name: 'Instagram', icon: 'fa-instagram', component: Instagram },
  { name: 'LinkedIn', icon: 'fa-linkedin-in', component: Linkedin },
  { name: 'GitHub', icon: 'fa-github', component: GitHub }
];

// Function to generate HTML
const generateHTML = (data) => {
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
      partnerLogos
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
      <meta name="description" content="${businessName} - ${headline}">
      <meta name="keywords" content="${businessName}, business, services">
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

    <script src="js/main.js"></script>
</body>
</html>`;
};

// Function to generate CSS
const generateCSS = (data) => {
    const { colorTheme } = data;
    const theme = COLOR_THEMES[colorTheme];
    
    return `/* Global Styles */
  :root {
    --primary-color: ${theme.primary};
    --secondary-color: ${theme.secondary};
    --accent-color: ${theme.accent};
    --text-color: ${theme.text};
    --background-color: ${theme.background};
    --light-background: ${theme.lightBg};
    --transition: all 0.3s ease;
    --border-radius: 8px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Account for fixed header */
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    line-height: 1.3;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
  }
  
  h2:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: var(--primary-color);
  }
  
  h3 {
    font-size: 1.5rem;
  }
    p {
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: var(--transition);
}

a:hover {
  color: var(--secondary-color);
}

ul {
  list-style: none;
}

.btn-primary {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: var(--transition);
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--box-shadow);
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--background-color);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  display: flex;
  align-items: center;
}

.logo img {
  max-height: 40px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: var(--text-color);
  font-weight: 500;
}

.nav-links a:hover {
  color: var(--primary-color);
}
  .mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background-color: var(--text-color);
  transition: var(--transition);
}

/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../images/hero-bg.jpg') no-repeat center center/cover;
  color: white;
  text-align: center;
  padding-top: 80px;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Features Section */
.features {
  padding: 100px 0;
  background-color: var(--light-background);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background-color: var(--background-color);
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 20px;
}
  /* Portfolio Section */
.portfolio {
  padding: 100px 0;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.portfolio-item {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  height: 250px;
  box-shadow: var(--box-shadow);
}

.portfolio-image {
  width: 100%;
  height: 100%;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  transform: translateY(100%);
  transition: var(--transition);
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.05);
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-overlay h3 {
  margin-bottom: 5px;
}

.portfolio-overlay p {
  font-size: 0.9rem;
  margin-bottom: 0;
}

/* Partners Section */
.partners {
  padding: 80px 0;
  background-color: var(--light-background);
}

.partners-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
  .partner-logo {
  flex: 0 0 150px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: var(--transition);
}

.partner-logo:hover {
  filter: grayscale(0);
  opacity: 1;
}

.partner-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Testimonials Section */
.testimonials {
  padding: 100px 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background-color: var(--light-background);
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
  transition: var(--transition);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.testimonial-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 3px solid var(--primary-color);
}

.testimonial-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 50%;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 15px;
}

.testimonial-author {
  font-weight: bold;
  color: var(--primary-color);
}
  /* Contact Section */
.contact {
  padding: 100px 0;
  background-color: var(--light-background);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-item i {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.contact-social h3 {
  margin-bottom: 15px;
}

.contact-form {
  background-color: var(--background-color);
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
}
  .newsletter-form-container {
  background-color: var(--background-color);
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 20px auto 0;
}

.newsletter-form input {
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.newsletter-form input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.newsletter-form button {
  border: none;
  background-color: var(--primary-color);
  color: white;
  padding: 0 25px;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  cursor: pointer;
  font-weight: bold;
}

/* Footer */
footer {
  background-color: #333;
  color: white;
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h3 {
  color: white;
  margin-bottom: 20px;
  position: relative;
}

.footer-section h3:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 50px;
  height: 2px;
  background-color: var(--primary-color);
}
  .footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: #ddd;
}

.footer-links a:hover {
  color: white;
  padding-left: 5px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: var(--transition);
}

.social-links a:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Accessibility Styles */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus Styles */
a:focus, button:focus, input:focus, textarea:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Animation classes */
.animate {
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  /* Responsive Styles */
@media screen and (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--background-color);
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
  }
  
  .nav-links.show {
    transform: translateY(0);
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-menu-btn.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .mobile-menu-btn.active span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-btn.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.2rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    margin-bottom: 10px;
  }
  
  .newsletter-form button {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    width: 100%;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
}`;
};

// Function to generate JS
const generateJS = (data) => {
  const { contactFormEnabled } = data;
  
  return `// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      this.classList.toggle('active');
    });
  }
    // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          mobileMenuBtn.classList.remove('active');
        }
      }
    });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Here you would normally send this data to your backend
      console.log('Newsletter signup:', email);
      
      // Show success message
      alert('Thank you for subscribing to our newsletter!');
      emailInput.value = '';
    });
  }
    // Contact form submission
  if (contactFormEnabled) {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;
        
        // Here you would normally send this data to your backend
        console.log('Contact form submission:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you shortly.');
        this.reset();
      });
    }
  }
  
  // Animate elements when they come into view
  const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .portfolio-item, .partner-logo');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
};

// Function to create a downloadable zip file
const createAndDownloadZip = async (data) => {
  // Generate content for files
  const htmlContent = generateHTML(data);
  const cssContent = generateCSS(data);
  const jsContent = generateJS(data);
  
  // Create a new JSZip instance
  const zip = new JSZip();
  
  // Add files to the zip
  zip.file("index.html", htmlContent);
  
  // Create folders and add files
  const css = zip.folder("css");
  css.file("styles.css", cssContent);
  
  const js = zip.folder("js");
  js.file("main.js", jsContent);
  
  // Create images folder
  const images = zip.folder("images");
  
  // Add favicon placeholder
  const faviconImage = "data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
  images.file("favicon.ico", faviconImage.split('base64,')[1], {base64: true});
  
  // Add placeholder for hero background
  // In a real implementation, you would add the actual uploaded images
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkZGQiLz48dGV4dCB4PSI5NjAiIHk9IjU0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+UGxhY2Vob2xkZXIgSW1hZ2U8L3RleHQ+PC9zdmc+";

  images.file("hero-bg.jpg", placeholderImage.split('base64,')[1], {base64: true});
  
  // If logo image exists, add a placeholder
  if (data.logoImage) {
    const logoPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSIxMDAiIHk9IjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM0NDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5Mb2dvPC90ZXh0Pjwvc3ZnPg==";
    images.file("logo.png", logoPlaceholder.split('base64,')[1], {base64: true});
  }
  
  // Add testimonial placeholder images
  data.testimonials.forEach((testimonial, index) => {
    if (testimonial.image) {
      const testimonialImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5QZXJzb248L3RleHQ+PC9zdmc+";
images.file("testimonial-" + (index+1) + ".jpg", testimonialImage.split('base64,')[1], {base64: true});
    }
  });
  
  // Add portfolio placeholder images
  data.portfolioImages.forEach((item, index) => {
    if (item.image) {
      const portfolioImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iMzAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgZmlsbD0iIzU1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiPlBvcnRmb2xpbyBJdGVtICR7aW5kZXgrMX08L3RleHQ+PC9zdmc+";
images.file("portfolio-" + (index+1) + ".jpg", portfolioImage.split('base64,')[1], {base64: true});
    }
  });
  
  // Add partner logo placeholder images
  data.partnerLogos.forEach((logo, index) => {
    if (logo.image) {
      const logoImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iMTUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNzc3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+UGFydG5lciBMb2dvPC90ZXh0Pjwvc3ZnPg==";
images.file("partner-" + (index+1) + ".jpg", logoImage.split('base64,')[1], {base64: true});
    }
  });
  
  // Generate zip file
  const content = await zip.generateAsync({type: "blob"});
  
  // Download the zip file
saveAs(content, data.businessName.replace(/\s+/g, '-').toLowerCase() + '-website.zip');
  
  // Return file contents for preview
  return {
    html: htmlContent,
    css: cssContent,
    js: jsContent
  };
};

function WebsiteBuilder() {
  // State for form inputs
  const [businessName, setBusinessName] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [footerDescription, setFooterDescription] = useState('');
  const [colorTheme, setColorTheme] = useState('modern');
  const [heroImage, setHeroImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [contactFormEnabled, setContactFormEnabled] = useState(true);
  
  // Features state
  const [features, setFeatures] = useState([
    { icon: 'fa-star', title: '', description: '' },
    { icon: 'fa-rocket', title: '', description: '' },
    { icon: 'fa-shield', title: '', description: '' }
  ]);
  
  // Testimonials state
  const [testimonials, setTestimonials] = useState([
    { name: '', role: '', text: '', image: null },
    { name: '', role: '', text: '', image: null }
  ]);
  
  // Portfolio images state
  const [portfolioImages, setPortfolioImages] = useState([
    { title: '', description: '', image: null },
    { title: '', description: '', image: null },
    { title: '', description: '', image: null }
  ]);
  
  // Partner logos state
  const [partnerLogos, setPartnerLogos] = useState([
    { name: '', image: null },
    { name: '', image: null }
  ]);
  
  // Social links state
  const [socialLinks, setSocialLinks] = useState(
    SOCIAL_PLATFORMS.map(platform => ({
      platform: platform.name,
      icon: platform.icon,
      url: ''
    }))
  );
  
  // State for the preview
  const [previewFiles, setPreviewFiles] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  // Generic handler function for array state updates
  const handleArrayItemChange = (stateSetter, stateArray, index, field, value) => {
    const updatedArray = [...stateArray];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    stateSetter(updatedArray);
  };
  
  // Specific handler functions using the generic handler
  const handleFeatureChange = (index, field, value) => {
    handleArrayItemChange(setFeatures, features, index, field, value);
  };
  
  const handleTestimonialChange = (index, field, value) => {
    handleArrayItemChange(setTestimonials, testimonials, index, field, value);
  };
  
  const handlePortfolioChange = (index, field, value) => {
    handleArrayItemChange(setPortfolioImages, portfolioImages, index, field, value);
  };
  
  const handlePartnerLogoChange = (index, field, value) => {
    handleArrayItemChange(setPartnerLogos, partnerLogos, index, field, value);
  };
  
  const handleSocialLinkChange = (index, field, value) => {
    handleArrayItemChange(setSocialLinks, socialLinks, index, field, value);
  };
  
  // Functions to add new items to arrays
  const addFeature = () => {
    setFeatures([...features, { icon: 'fa-lightbulb', title: '', description: '' }]);
  };
  
  const addTestimonial = () => {
    setTestimonials([...testimonials, { name: '', role: '', text: '', image: null }]);
  };
  
  const addPortfolioItem = () => {
    setPortfolioImages([...portfolioImages, { title: '', description: '', image: null }]);
  };
  
  const addPartnerLogo = () => {
    setPartnerLogos([...partnerLogos, { name: '', image: null }]);
  };
  
  // Functions to remove items from arrays
  const removeItem = (array, setArray, index) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
  };

  // Function to generate the website
  const generateWebsite = async () => {
    // Validate required fields
    if (!businessName || !headline || !email) {
      alert('Please fill in all required fields: Business Name, Headline, and Email.');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Create data object for the website generator
      const websiteData = {
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
        logoImage: logoImage ? true : false,
        partnerLogos
      };
      
      // Generate files
      const files = await createAndDownloadZip(websiteData);
      setPreviewFiles(files);
      setIsDownloadReady(true);
    } catch (error) {
      console.error('Error generating website:', error);
      alert('There was an error generating your website. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Function to handle image upload
  const handleImageUpload = (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    
    switch (type) {
      case 'hero':
        setHeroImage(file);
        break;
      case 'logo':
        setLogoImage(file);
        break;
      case 'testimonial':
        if (index !== null) {
          handleTestimonialChange(index, 'image', file);
        }
        break;
      case 'portfolio':
        if (index !== null) {
          handlePortfolioChange(index, 'image', file);
        }
        break;
      case 'partner':
        if (index !== null) {
          handlePartnerLogoChange(index, 'image', file);
        }
        break;
      default:
        console.log('Unsupported image type');
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Professional Website Generator</h1>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-sm max-w-2xl">
              <p className="font-medium">Fill in the details below to generate your professional business website. Required fields are marked with *</p>
            </div>
          </div>
          
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">1</span>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition-all" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your Business Name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Logo Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-all cursor-pointer">
                  <input 
                    type="file" 
                    id="logo-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-700">
                      {logoImage ? logoImage.name : "Upload your logo"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <Mail className="text-gray-500 mr-2 h-5 w-5" />
                  <input 
                    type="email" 
                    className="w-full p-3 border rounded-lg" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@yourbusiness.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <Phone className="text-gray-500 mr-2 h-5 w-5" />
                  <input 
                    type="tel" 
                    className="w-full p-3 border rounded-lg" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Address
                </label>
                <div className="flex items-center">
                  <MapPin className="text-gray-500 mr-2 h-5 w-5 flex-shrink-0" />
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Business St, City"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Headline <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-lg" 
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Your Compelling Headline"
                required
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Subheadline
              </label>
              <input 
                type="text" 
                className="w-full p-3 border rounded-lg" 
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                placeholder="A brief description of your business"
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Footer Description
              </label>
              <textarea 
                className="w-full p-3 border rounded-lg" 
                value={footerDescription}
                onChange={(e) => setFooterDescription(e.target.value)}
                placeholder="A brief description for your website footer"
                rows="2"
              ></textarea>
            </div>
          </div>
          {/* Color Theme Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">2</span>
              Color Theme
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {Object.keys(COLOR_THEMES).map(theme => (
                <div 
  key={theme}
  className={"cursor-pointer rounded-lg p-4 transition-all " + (colorTheme === theme ? "ring-2 ring-blue-500 shadow-lg scale-105" : "border hover:shadow-md")}
  onClick={() => setColorTheme(theme)}
>
  
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-full h-8 rounded-t" 
                      style={{ backgroundColor: COLOR_THEMES[theme].primary }}
                    ></div>
                    <div 
                      className="w-full h-4 rounded-b" 
                      style={{ backgroundColor: COLOR_THEMES[theme].secondary }}
                    ></div>
                    <span className="mt-2 text-sm font-medium">{COLOR_THEMES[theme].name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Image Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">3</span>
              Hero Image
            </h2>
            
            <div className="mb-4">
              <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg hover:bg-gray-50 transition-all">
                <p className="text-gray-500 mb-2">Drag and drop your hero image here, or click to select file</p>
                <p className="text-xs text-gray-400 mb-4">Recommended: 1920x1080px (JPG, PNG)</p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="hero-image"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'hero')}
                />
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  onClick={() => document.getElementById('hero-image').click()}
                >
                  Select Image
                </button>
              </div>
              {heroImage && (
                <div className="mt-2 flex items-center">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {heroImage.name} selected
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Features Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">4</span>
              Features
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 border rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-lg">Feature {index + 1}</h3>
                    {features.length > 2 && (
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeItem(features, setFeatures, index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Icon</label>
                      <select 
                        className="w-full p-3 border rounded-lg bg-white"
                        value={feature.icon}
                        onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                      >
                        <option value="fa-star">Star</option>
                        <option value="fa-rocket">Rocket</option>
                        <option value="fa-shield">Shield</option>
                        <option value="fa-lightbulb">Lightbulb</option>
                        <option value="fa-chart-line">Graph</option>
                        <option value="fa-cog">Gear</option>
                        <option value="fa-users">Users</option>
                        <option value="fa-globe">Globe</option>
                        <option value="fa-check">Checkmark</option>
                        <option value="fa-bolt">Lightning</option>
                        <option value="fa-heart">Heart</option>
                        <option value="fa-code">Code</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Title</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border rounded-lg" 
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        placeholder="Feature Title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Description</label>
                      <textarea 
                        className="w-full p-3 border rounded-lg" 
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        placeholder="Feature Description"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium"
                onClick={addFeature}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Feature
              </button>
            </div>
          </div>
          {/* Portfolio Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">5</span>
              Portfolio Gallery
            </h2>
            
            <p className="mb-4 text-gray-600">Showcase your best work with images and descriptions.</p>
            
            <div className="grid grid-cols-1 gap-6">
              {portfolioImages.map((item, index) => (
                <div key={index} className="bg-white p-6 border rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-lg">Portfolio Item {index + 1}</h3>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(portfolioImages, setPortfolioImages, index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Portfolio Image</label>
                      <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50">
                        <input 
                          type="file" 
                          className="hidden" 
                          id={"portfolio-image-" + index}
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'portfolio', index)}
                        />
                        <button 
                          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 flex flex-col items-center"
onClick={() => document.getElementById("portfolio-image-" + index).click()}
                        >
                          <Upload className="h-8 w-8 mb-2" />
                          <span>{item.image ? item.image.name : "Select Image"}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium">Title</label>
                        <input 
                          type="text" 
                          className="w-full p-3 border rounded-lg" 
                          value={item.title}
                          onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                          placeholder="Project Title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Description</label>
                        <textarea 
                          className="w-full p-3 border rounded-lg" 
                          value={item.description}
                          onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                          placeholder="Brief description of this project"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium"
                onClick={addPortfolioItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Portfolio Item
              </button>
            </div>
          </div>
          {/* Partner Logos Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">6</span>
              Partner Logos
            </h2>
            
            <p className="mb-4 text-gray-600">Display logos of companies you've partnered with.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnerLogos.map((logo, index) => (
                <div key={index} className="bg-white p-4 border rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Partner {index + 1}</h3>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(partnerLogos, setPartnerLogos, index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Logo</label>
                      <div className="border rounded-lg p-3 flex flex-col items-center justify-center bg-gray-50">
                        <input 
                          type="file" 
                          className="hidden" 
                          id={"partner-logo-${index}"}
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'partner', index)}
                        />
                        <button 
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 flex flex-col items-center"
                          onClick={() => document.getElementById("partner-logo-${index}").click()}
                        >
                          <Upload className="h-6 w-6 mb-1" />
                          <span className="text-sm">{logo.image ? logo.image.name : "Select Logo"}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Partner Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border rounded-lg" 
                        value={logo.name}
                        onChange={(e) => handlePartnerLogoChange(index, 'name', e.target.value)}
                        placeholder="Partner Company Name"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium col-span-full"
                onClick={addPartnerLogo}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Partner Logo
              </button>
            </div>
          </div>
          {/* Testimonials Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">7</span>
              Testimonials
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 border rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-lg">Testimonial {index + 1}</h3>
                    {testimonials.length > 1 && (
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeItem(testimonials, setTestimonials, index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Client Photo</label>
                      <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50">
                        <input 
                          type="file" 
                          className="hidden" 
                          id={"testimonial-image-${index}"}
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'testimonial', index)}
                        />
                        <button 
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 flex flex-col items-center"
                          onClick={() => document.getElementById("testimonial-image-${index}").click()}
                        >
                          <Upload className="h-8 w-8 mb-2" />
                          <span>{testimonial.image ? testimonial.image.name : "Select Photo"}</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Name</label>
                          <input 
                            type="text" 
                            className="w-full p-3 border rounded-lg" 
                            value={testimonial.name}
                            onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                            placeholder="Client Name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Role/Company</label>
                          <input 
                            type="text" 
                            className="w-full p-3 border rounded-lg" 
                            value={testimonial.role}
                            onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                            placeholder="CEO, Company Inc."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 font-medium">Testimonial Text</label>
                      <textarea 
                        className="w-full p-3 border rounded-lg h-full min-h-[150px]" 
                        value={testimonial.text}
                        onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
                        placeholder="What they said about your business"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium"
                onClick={addTestimonial}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Testimonial
              </button>
            </div>
          </div>
          {/* Social Media Links */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">8</span>
              Social Media Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => {
                const SocialIcon = SOCIAL_PLATFORMS.find(p => p.name === link.platform)?.component || null;
                
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    {SocialIcon && <SocialIcon className="h-5 w-5 text-gray-600" />}
                    <div className="flex-grow">
                      <label className="block text-gray-700 mb-1 text-sm font-medium">
                        {link.platform} URL
                      </label>
                      <input 
                        type="url" 
                        className="w-full p-2 border rounded-lg text-sm" 
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
placeholder={"https://" + link.platform.toLowerCase() + ".com/yourbusiness"}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Contact Form Options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2 text-sm">9</span>
              Contact Options
            </h2>
            
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg mb-1">Contact Form</h3>
                  <p className="text-gray-600 text-sm">Enable a contact form for visitors to reach you directly</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={contactFormEnabled}
                    onChange={(e) => setContactFormEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          {/* Generate Button */}
          <div className="text-center mt-12 mb-6">
            <button 
              className={"px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 flex items-center justify-center mx-auto text-lg font-medium transition-all " + (isGenerating ? "opacity-50 cursor-not-allowed" : "hover:scale-105")}
              onClick={generateWebsite}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Your Website...
                </>
              ) : (
                <>
                  <Save className="mr-3" size={22} />
                  Generate Professional Website
                </>
              )}
            </button>
            
            <p className="mt-2 text-gray-500 text-sm">
              All required fields must be filled before generating
            </p>
          </div>
          
          {/* Preview section */}
          {previewFiles && (
            <div className="mt-8 p-6 border rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold mb-6">Generated Website Preview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* HTML Preview */}
                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="bg-gray-800 text-white p-3 font-mono text-sm flex items-center justify-between">
                    <span>index.html</span>
                    <span className="text-xs px-2 py-1 bg-blue-500 rounded">HTML</span>
                  </div>
                  <div className="p-4 h-64 overflow-auto">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap">{previewFiles.html.substring(0, 500)}...</pre>
                  </div>
                </div>
                
                {/* CSS Preview */}
                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="bg-gray-800 text-white p-3 font-mono text-sm flex items-center justify-between">
                    <span>styles.css</span>
                    <span className="text-xs px-2 py-1 bg-green-500 rounded">CSS</span>
                  </div>
                  <div className="p-4 h-64 overflow-auto">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap">{previewFiles.css.substring(0, 500)}...</pre>
                  </div>
                </div>
                {/* JS Preview */}
                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="bg-gray-800 text-white p-3 font-mono text-sm flex items-center justify-between">
                    <span>main.js</span>
                    <span className="text-xs px-2 py-1 bg-yellow-500 rounded">JavaScript</span>
                  </div>
                  <div className="p-4 h-64 overflow-auto">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap">{previewFiles.js.substring(0, 500)}...</pre>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 flex items-center justify-center transition-all hover:scale-105"
                    onClick={() => {
                      const previewWindow = window.open();
                      previewWindow.document.write(previewFiles.html);
                      previewWindow.document.close();
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Preview Website
                  </button>
                  
                  <button 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-105"
                    onClick={() => generateWebsite()}
                  >
                    <Download className="mr-2" size={20} />
                    Download ZIP
                  </button>
                </div>
                
                <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 rounded shadow-sm">
                  <h3 className="font-medium text-lg mb-2">Next Steps:</h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Download the ZIP file containing your website files</li>
                    <li>Extract the files to your computer</li>
                    <li>Upload them to your web hosting provider</li>
                    <li>Configure your domain to point to your new website</li>
                  </ol>
                  <p className="mt-3 text-sm">Need help with hosting? Most web hosting providers offer simple tools to upload your website files.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 mb-6 text-center text-gray-600 text-sm">
          <p>Professional Website Generator &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}

export default WebsiteBuilder;