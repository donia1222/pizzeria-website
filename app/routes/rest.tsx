import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useAnimation } from "framer-motion";
import { Menu, X, Phone, Clock, Calendar, ShoppingBag, Star, MapPin, Instagram, Facebook, Twitter, Mail, Check, Loader2 } from 'lucide-react';
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from "~/styles/restaurant.module.css";
import { menuItems, testimonials, galleryImages } from "~/data/restaurant-data";
import type { MenuItem, CartItem } from "~/types/restaurant";

export const meta: MetaFunction = () => {
  return [
    { title: "Trattoria Milano - Authentic Italian Restaurant" },
    { name: "description", content: "Experience authentic Italian cuisine at Trattoria Milano" },
  ];
};

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.min(end, duration * 60);
    const counter = setInterval(() => {
      start += 1;
      const progress = start / totalFrames;
      setCount(Math.floor(progress * end));

      if (start === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration, isInView]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

// Rotating Pizza animation component
const RotatingPizza = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      className={styles.rotatingPizza}
      style={{ rotate }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className={styles.pizzaContainer}>
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop"
          alt="Pizza"
          className={styles.pizzaImage}
        />
      </div>
    </motion.div>
  );
};

// Rating stars component
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={styles.ratingStars}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className={styles.starFilled} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className={styles.starEmpty} />
      ))}
    </div>
  );
};

// Food item card component
const FoodItem = ({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) => {
  const [isAdded, setIsAdded] = useState(false);
  const isPizza = item.name.toLowerCase().includes("pizza");
  const controls = useAnimation();

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(item);

    // Animate pizza items when added to cart
    if (isPizza) {
      controls.start({
        rotate: [0, 20, -20, 10, -10, 0],
        scale: [1, 1.1, 1],
        transition: { duration: 0.6 },
      });
    }

    // Reset the button state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      className={`${styles.foodItem} ${isPizza ? styles.pizzaItem : ''}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      animate={controls}
    >
      <div className={styles.foodImageContainer}>
        <img
          src={item.image || "/placeholder.svg?height=200&width=200"}
          alt={item.name}
          className={`${styles.foodImage} ${isPizza ? styles.pizzaImage : ''}`}
        />
        <div className={styles.badgeContainer}>
          {item.popular && (
            <span className={styles.popularBadge}>
              Beliebt
            </span>
          )}
          {item.vegetarian && (
            <span className={styles.vegetarianBadge}>
              Vegetarisch
            </span>
          )}
          {item.vegan && (
            <span className={styles.veganBadge}>
              Vegan
            </span>
          )}
        </div>
      </div>
      <div className={styles.foodDetails}>
        <div className={styles.foodHeader}>
          <h3 className={`${styles.foodTitle} ${isPizza ? styles.pizzaTitle : ''}`}>{item.name}</h3>
          <span className={styles.foodPrice}>${item.price.toFixed(2)}</span>
        </div>
        <p className={styles.foodDescription}>{item.description}</p>
        <motion.button
          onClick={handleAddToCart}
          className={`${styles.addToCartButton} ${
            isAdded
              ? styles.addedButton
              : isPizza
                ? styles.pizzaButton
                : styles.defaultButton
          }`}
          whileTap={{ scale: 0.95 }}
          animate={isAdded ? { x: [0, -5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          disabled={isAdded}
        >
          <ShoppingBag className={`${styles.buttonIcon} ${isAdded ? styles.bounceIcon : ''}`} />
          {isAdded ? "Añadido al carrito" : "Zum Warenkorb hinzufügen"}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Custom Dialog component
const Dialog = ({ 
  open, 
  onClose, 
  children, 
  title, 
  description 
}: { 
  open: boolean; 
  onClose: () => void; 
  children: React.ReactNode; 
  title?: string; 
  description?: string;
}) => {
  if (!open) return null;

  return (
    <div className={styles.dialogOverlay} onClick={onClose}>
      <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
        {(title || description) && (
          <div className={styles.dialogHeader}>
            {title && <h2 className={styles.dialogTitle}>{title}</h2>}
            {description && <p className={styles.dialogDescription}>{description}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

// Custom Tabs component
const Tabs = ({ 
  activeTab, 
  onTabChange, 
  tabs, 
  children 
}: { 
  activeTab: string; 
  onTabChange: (tab: string) => void; 
  tabs: string[]; 
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {children}
      </div>
    </div>
  );
};

export default function RestaurantWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Pizzas");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle reservation submission
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setReservationSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setReservationOpen(false);
        setReservationSuccess(false);
      }, 2000);
    }, 1500);
  };

  // Handle order submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);

      // Reset form and cart after success
      setTimeout(() => {
        setOrderOpen(false);
        setOrderSuccess(false);
        setCartItems([]);
      }, 2000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <RotatingPizza />
      {/* Header */}
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolledHeader : ''}`}
      >
        <div className={styles.headerContainer}>
          <motion.div
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className={styles.logoText}>Trattoria Milano</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <motion.a
              href="#home"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Startseite
            </motion.a>
            <motion.a
              href="#menu"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Speisekarte
            </motion.a>
            <motion.a
              href="#about"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Über uns
            </motion.a>
            <motion.a
              href="#gallery"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Galerie
            </motion.a>
            <motion.a
              href="#contact"
              className={styles.navLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontakt
            </motion.a>
          </nav>

          <div className={styles.headerButtons}>
            <motion.button
              onClick={() => setReservationOpen(true)}
              className={styles.reservationButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className={styles.buttonIcon} />
              <span>Tisch reservieren</span>
            </motion.button>

            <motion.button
              onClick={() => setOrderOpen(true)}
              className={styles.orderButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className={styles.buttonIcon} />
              <span>Jetzt bestellen</span>
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={styles.cartBadge}
                >
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button 
              className={styles.mobileMenuButton} 
              onClick={toggleMobileMenu} 
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileMenuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className={styles.mobileMenuHeader}>
                <h2 className={styles.mobileMenuTitle}>Trattoria Milano</h2>
                <button className={styles.closeButton} onClick={toggleMobileMenu}>
                  <X size={24} />
                </button>
              </div>

              <nav className={styles.mobileNav}>
                <a
                  href="#home"
                  className={styles.mobileNavLink}
                  onClick={toggleMobileMenu}
                >
                  Startseite
                </a>
                <a
                  href="#menu"
                  className={styles.mobileNavLink}
                  onClick={toggleMobileMenu}
                >
                  Speisekarte
                </a>
                <a
                  href="#about"
                  className={styles.mobileNavLink}
                  onClick={toggleMobileMenu}
                >
                  Über uns
                </a>
                <a
                  href="#gallery"
                  className={styles.mobileNavLink}
                  onClick={toggleMobileMenu}
                >
                  Galerie
                </a>
                <a
                  href="#contact"
                  className={styles.mobileNavLink}
                  onClick={toggleMobileMenu}
                >
                  Kontakt
                </a>
              </nav>

              <div className={styles.mobileMenuFooter}>
                <button
                  onClick={() => {
                    setReservationOpen(true);
                    toggleMobileMenu();
                  }}
                  className={styles.mobileReservationButton}
                >
                  <Calendar className={styles.buttonIcon} />
                  Tisch reservieren
                </button>
                <button
                  onClick={() => {
                    setOrderOpen(true);
                    toggleMobileMenu();
                  }}
                  className={styles.mobileOrderButton}
                >
                  <ShoppingBag className={styles.buttonIcon} />
                  Jetzt bestellen
                  {cartItems.length > 0 && (
                    <span className={styles.mobileCartBadge}>
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className={styles.heroSection} ref={heroRef}>
        <motion.div className={styles.heroOverlay} style={{ opacity: heroOpacity }}></motion.div>
        <motion.div className={styles.heroBackground} style={{ scale: heroScale }}>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
            alt="Italienische Küche"
            className={styles.heroImage}
          />
        </motion.div>
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroText}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ y: heroTextY }}
          >
            <h2 className={styles.heroTitle}>Authentische Italienische Küche</h2>
            <p className={styles.heroDescription}>
              Erleben Sie den Geschmack Italiens im Herzen der Stadt. Frische Zutaten, traditionelle Rezepte und eine
              elegante Atmosphäre.
            </p>
            <div className={styles.heroButtons}>
              <button
                onClick={() => setReservationOpen(true)}
                className={styles.heroReservationButton}
              >
                <Calendar className={styles.buttonIcon} />
                Tisch reservieren
              </button>
              <button
                onClick={() => setOrderOpen(true)}
                className={styles.heroOrderButton}
              >
                <ShoppingBag className={styles.buttonIcon} />
                Zum Mitnehmen bestellen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoGrid}>
            <motion.div
              className={styles.infoItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.infoIcon}>
                <Clock className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.infoTitle}>Öffnungszeiten</h3>
                <p className={styles.infoText}>Mo-So: 11:00 - 22:00 Uhr</p>
              </div>
            </motion.div>

            <motion.div
              className={styles.infoItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.infoIcon}>
                <MapPin className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.infoTitle}>Standort</h3>
                <p className={styles.infoText}>123 Pasta Straße, Foodville</p>
              </div>
            </motion.div>

            <motion.div
              className={styles.infoItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.infoIcon}>
                <Phone className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.infoTitle}>Reservierungen</h3>
                <p className={styles.infoText}>+1 (555) 123-4567</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className={styles.menuSection}>
        <div className={styles.menuContainer}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Unsere Speisekarte</h2>
            <div className={styles.titleDivider}></div>
            <p className={styles.sectionDescription}>
              Entdecken Sie unsere sorgfältig zusammengestellte Speisekarte mit authentischen italienischen Gerichten
              aus frischesten Zutaten
            </p>
          </motion.div>

          <Tabs 
            activeTab={activeCategory} 
            onTabChange={setActiveCategory}
            tabs={menuItems.map(category => category.category)}
          >
            {menuItems.map((category) => (
              category.category === activeCategory && (
                <motion.div
                  key={category.category}
                  className={styles.menuGrid}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FoodItem item={item} onAddToCart={addToCart} />
                    </motion.div>
                  ))}
                </motion.div>
              )
            ))}
          </Tabs>

          <div className={styles.menuFooter}>
            <button
              onClick={() => setOrderOpen(true)}
              className={styles.orderNowButton}
            >
              <ShoppingBag className={styles.buttonIcon} />
              Jetzt bestellen
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutGrid}>
            <motion.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.aboutTitle}>Unsere Geschichte</h2>
              <div className={styles.titleDivider}></div>
              <p className={styles.aboutText}>
                Gegründet im Jahr 1985 von der Familie Rossi, bringt Trattoria Milano die authentischen Aromen Italiens
                auf Ihren Tisch. Unsere Rezepte wurden über Generationen weitergegeben und bewahren die traditionellen
                Kochmethoden und Aromen Norditaliens.
              </p>
              <p className={styles.aboutText}>
                Wir beziehen die feinsten Zutaten, darunter importierte italienische Produkte und lokal angebaute
                Bio-Produkte, um Gerichte zu kreieren, die das Wesen der italienischen Küche einfangen. Jede Mahlzeit
                wird mit Leidenschaft und Liebe zum Detail zubereitet.
              </p>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    <AnimatedCounter value={35} />+
                  </div>
                  <p className={styles.statLabel}>Jahre Erfahrung</p>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    <AnimatedCounter value={15000} />+
                  </div>
                  <p className={styles.statLabel}>Zufriedene Kunden</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.aboutImageContainer}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop"
                alt="Koch bei der Zubereitung"
                className={styles.aboutImage}
              />
              <div className={styles.aboutImageOverlay}></div>
              <div className={styles.aboutImageCaption}>
                <h3 className={styles.captionTitle}>Chef Antonio Rossi</h3>
                <p className={styles.captionText}>Chefkoch &amp; Gründer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Was unsere Kunden sagen</h2>
            <div className={styles.titleDivider}></div>
            <p className={styles.sectionDescription}>Hören Sie von unseren zufriedenen Gästen</p>
          </motion.div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.testimonialHeader}>
                  <div className={styles.testimonialAvatar}>
                    <img
                      src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                      alt={testimonial.name}
                      className={styles.avatarImage}
                    />
                  </div>
                  <div>
                    <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                    <RatingStars rating={testimonial.rating} />
                  </div>
                </div>
                <p className={styles.testimonialText}>&quot;{testimonial.text}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={styles.gallerySection}>
        <div className={styles.galleryContainer}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Galerie</h2>
            <div className={styles.titleDivider}></div>
            <p className={styles.sectionDescription}>Werfen Sie einen Blick auf unser Restaurant und unsere Gerichte</p>
          </motion.div>

          <div className={styles.galleryGrid}>
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className={styles.galleryItem}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={image || "/placeholder.svg?height=300&width=300"}
                  alt="Galeriebild"
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Kontaktieren Sie uns</h2>
            <div className={styles.titleDivider}></div>
            <p className={styles.sectionDescription}>Wir freuen uns, von Ihnen zu hören</p>
          </motion.div>

          <div className={styles.contactGrid}>
            <motion.div
              className={styles.contactInfo}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={styles.contactInfoTitle}>Kontaktdaten</h3>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <MapPin className={styles.contactIcon} />
                  <div>
                    <h4 className={styles.contactItemTitle}>Adresse</h4>
                    <p className={styles.contactItemText}>123 Pasta Straße, Foodville, FC 12345</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Phone className={styles.contactIcon} />
                  <div>
                    <h4 className={styles.contactItemTitle}>Telefon</h4>
                    <p className={styles.contactItemText}>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Mail className={styles.contactIcon} />
                  <div>
                    <h4 className={styles.contactItemTitle}>E-Mail</h4>
                    <p className={styles.contactItemText}>info@trattoriamilano.com</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Clock className={styles.contactIcon} />
                  <div>
                    <h4 className={styles.contactItemTitle}>Öffnungszeiten</h4>
                    <p className={styles.contactItemText}>Montag - Sonntag: 11:00 - 22:00 Uhr</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <h4 className={styles.socialTitle}>Folgen Sie uns</h4>
                <div className={styles.socialIcons}>
                  {[
                    <Facebook key="fb" size={20} />,
                    <Instagram key="ig" size={20} />,
                    <Twitter key="tw" size={20} />,
                  ].map((icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className={styles.socialIcon}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.contactForm}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={styles.formTitle}>Senden Sie uns eine Nachricht</h3>

              <form className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Name
                    </label>
                    <input id="name" placeholder="Ihr Name" className={styles.formInput} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      E-Mail
                    </label>
                    <input id="email" type="email" placeholder="Ihre E-Mail" className={styles.formInput} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>
                    Betreff
                  </label>
                  <input id="subject" placeholder="Betreff" className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Nachricht
                  </label>
                  <textarea id="message" placeholder="Ihre Nachricht" rows={4} className={styles.formTextarea} />
                </div>

                <button type="submit" className={styles.submitButton}>Nachricht senden</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reservation Dialog */}
      <Dialog 
        open={reservationOpen} 
        onClose={() => setReservationOpen(false)}
        title="Tisch reservieren"
        description="Füllen Sie das Formular aus, um einen Tisch bei Trattoria Milano zu reservieren."
      >
        {reservationSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <Check className={styles.checkIcon} />
            </div>
            <h3 className={styles.successTitle}>Reservierung bestätigt!</h3>
            <p className={styles.successText}>
              Wir haben eine Bestätigung an Ihre E-Mail gesendet. Wir freuen uns auf Ihren Besuch!
            </p>
          </div>
        ) : (
          <form onSubmit={handleReservationSubmit} className={styles.reservationForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="date" className={styles.formLabel}>
                  Datum
                </label>
                <input id="date" type="date" required className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="time" className={styles.formLabel}>
                  Zeit
                </label>
                <select className={styles.formSelect} required>
                  <option value="">Zeit auswählen</option>
                  {["11:00", "12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"].map((time) => (
                    <option key={time} value={time}>
                      {time} Uhr
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="guests" className={styles.formLabel}>
                Anzahl der Gäste
              </label>
              <select className={styles.formSelect} required>
                <option value="">Anzahl auswählen</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? "Person" : "Personen"}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Name
              </label>
              <input id="name" placeholder="Ihr vollständiger Name" required className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                E-Mail
              </label>
              <input id="email" type="email" placeholder="Ihre E-Mail" required className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>
                Telefon
              </label>
              <input id="phone" placeholder="Ihre Telefonnummer" required className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="special-requests" className={styles.formLabel}>
                Besondere Wünsche (Optional)
              </label>
              <textarea
                id="special-requests"
                placeholder="Besondere Wünsche oder Ernährungsbedürfnisse"
                className={styles.formTextarea}
              />
            </div>

            <div className={styles.formFooter}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className={`${styles.buttonIcon} ${styles.spinIcon}`} />
                    Verarbeitung...
                  </>
                ) : (
                  "Reservierung bestätigen"
                )}
              </button>
            </div>
          </form>
        )}
      </Dialog>

      {/* Order Dialog */}
      <Dialog 
        open={orderOpen} 
        onClose={() => setOrderOpen(false)}
        title="Ihre Bestellung"
        description="Überprüfen Sie Ihre Artikel und schließen Sie Ihre Bestellung ab."
      >
        {orderSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <Check className={styles.checkIcon} />
            </div>
            <h3 className={styles.successTitle}>Bestellung bestätigt!</h3>
            <p className={styles.successText}>
              Wir haben eine Bestätigung an Ihre E-Mail gesendet. Ihr Essen wird in etwa 30 Minuten zur Abholung
              bereit sein.
            </p>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className={styles.orderForm}>
            {cartItems.length === 0 ? (
              <div className={styles.emptyCart}>
                <ShoppingBag className={styles.emptyCartIcon} />
                <h3 className={styles.emptyCartTitle}>Ihr Warenkorb ist leer</h3>
                <p className={styles.emptyCartText}>
                  Fügen Sie einige köstliche Gerichte aus unserem Menü hinzu!
                </p>
                <button onClick={() => setOrderOpen(false)} className={styles.browseMenuButton}>
                  Speisekarte durchsuchen
                </button>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={styles.cartItem}
                    >
                      <div className={styles.cartItemDetails}>
                        <div className={styles.cartItemImage}>
                          <img
                            src={item.image || "/placeholder.svg?height=100&width=100"}
                            alt={item.name}
                            className={styles.itemImage}
                          />
                        </div>
                        <div className={styles.cartItemInfo}>
                          <h4 className={styles.cartItemName}>{item.name}</h4>
                          <p className={styles.cartItemPrice}>${item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className={styles.cartItemActions}>
                        <div className={styles.quantityControls}>
                          <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className={styles.quantityValue}>{item.quantity}</span>
                          <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.cartItemTotal}>
                          <div className={styles.totalPrice}>${(item.price * item.quantity).toFixed(2)}</div>
                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.orderSummary}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Zwischensumme</span>
                    <span className={styles.summaryValue}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Steuer</span>
                    <span className={styles.summaryValue}>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span className={styles.totalLabel}>Gesamtsumme</span>
                    <span className={styles.totalValue}>${(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className={styles.orderOptions}>
                  <div className={styles.optionGroup}>
                    <label className={styles.optionLabel}>Abholung oder Lieferung</label>
                    <div className={styles.radioGroup}>
                      <div className={styles.radioOption}>
                        <input type="radio" name="deliveryType" id="pickup" value="pickup" defaultChecked />
                        <label htmlFor="pickup" className={styles.radioLabel}>
                          Abholung (Fertig in 30 Min.)
                        </label>
                      </div>
                      <div className={styles.radioOption}>
                        <input type="radio" name="deliveryType" id="delivery" value="delivery" />
                        <label htmlFor="delivery" className={styles.radioLabel}>
                          Lieferung (45-60 Min.)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        Name
                      </label>
                      <input id="name" placeholder="Ihr Name" required className={styles.formInput} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Telefon
                      </label>
                      <input id="phone" placeholder="Ihre Telefonnummer" required className={styles.formInput} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      E-Mail
                    </label>
                    <input id="email" type="email" placeholder="Ihre E-Mail" required className={styles.formInput} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.formLabel}>
                      Adresse (für Lieferung)
                    </label>
                    <input id="address" placeholder="Lieferadresse" className={styles.formInput} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="notes" className={styles.formLabel}>
                      Besondere Anweisungen (Optional)
                    </label>
                    <textarea id="notes" placeholder="Besondere Wünsche oder Hinweise" className={styles.formTextarea} />
                  </div>
                </div>

                <div className={styles.formFooter}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className={`${styles.buttonIcon} ${styles.spinIcon}`} />
                        Verarbeitung...
                      </>
                    ) : (
                      "Bestellung aufgeben"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </Dialog>
    </div>
  );
}
