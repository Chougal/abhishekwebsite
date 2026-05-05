"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { Check, ArrowLeft, ArrowRight, Package } from "lucide-react"
import { RevealOnScroll } from "@/components/RevealOnScroll"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Extended 24 Products Data with Prices
const allProductsData = [
  { id: 1, title: "E-Commerce Revolution", price: "2,500", description: "Real-time inventory and secure payments for modern retail.", fullDescription: "E-Commerce Revolution is a state-of-the-art platform designed for modern retailers. It features a blazing-fast frontend built with Next.js, a robust backend powered by Supabase, and a serverless architecture for ultimate scalability.", tech: ["Next.js", "TypeScript", "Tailwind", "Supabase"], features: ["Real-time Inventory", "Secure Payment Gateway", "AI Recommendations", "Admin Dashboard"], category: "Web Application", image: "/modern-office-dashboard.png", link: "#" },
  { id: 2, title: "Smart Dairy Analytics", price: "3,000", description: "IoT integrated dashboard for monitoring milk quality.", fullDescription: "Smart Dairy Analytics bridges the gap between traditional farming and modern technology. Using IoT sensors at collection points, it automatically records quality metrics, volume, and temperature.", tech: ["React", "Express", "MongoDB", "Chart.js"], features: ["IoT Integration", "Quality Monitoring", "Farmer Database", "Analytical Reporting"], category: "Enterprise Solution", image: "/modern-dairy-farm.png", link: "#" },
  { id: 3, title: "Jewellery Management Pro", price: "2,000", description: "Inventory and billing system for high-end retail jewellery.", fullDescription: "Jewellery Management Pro is a specialized ERP solution for high-value retail. It handles intricate inventory management including gold weight, stone values, and making charges.", tech: ["Electron", "Node.js", "SQLite"], features: ["Gold Weight Tracking", "Professional Billing", "Hallmark Management", "Local-first Security"], category: "Desktop Application", image: "/jewelry-store-system.png", link: "#" },
  { id: 4, title: "Hospital ERMS", price: "3,000", description: "Electronic Record Management System for Multi-specialty Hospitals.", fullDescription: "Comprehensive healthcare management software streamlining patient flow, appointment scheduling, and electronic health records.", tech: ["React", "Python", "Django", "PostgreSQL"], features: ["Patient Records", "Appointment Booking", "Prescription Gen", "Billing Module"], category: "Web Application", image: "/modern-office-dashboard.png", link: "#" },
  { id: 5, title: "FinTech Wallet API", price: "1,500", description: "Secure, scalable backend infrastructure for mobile wallets.", fullDescription: "A robust API service providing secure transactions, wallet management, and real-time ledger updates for fintech startups.", tech: ["Go", "Redis", "PostgreSQL", "Docker"], features: ["Transaction Ledger", "KYC Verification", "Fraud Detection", "Bank Integration"], category: "Backend Service", image: "/modern-dairy-farm.png", link: "#" },
  { id: 6, title: "Real Estate Portal", price: "2,500", description: "Property listing and management platform with virtual tours.", fullDescription: "Modern real estate platform connecting buyers and sellers with advanced filtering, map integration, and 3D virtual property tours.", tech: ["Next.js", "Prisma", "AWS S3", "Three.js"], features: ["Map Search", "3D Tours", "Agent Dashboard", "Mortgage Calc"], category: "Web Application", image: "/jewelry-store-system.png", link: "#" },
  { id: 7, title: "EduTech LMS", price: "2,000", description: "Learning Management System with live video classes.", fullDescription: "A complete virtual classroom solution with video streaming, assignment submissions, and automated grading.", tech: ["Vue.js", "Node.js", "WebRTC", "MongoDB"], features: ["Live Classes", "Quiz Engine", "Progress Tracking", "Resource Library"], category: "Web Application", image: "/modern-office-dashboard.png", link: "#" },
  { id: 8, title: "Restaurant POS System", price: "1,500", description: "Touch-friendly point of sale for quick service restaurants.", fullDescription: "Streamlined order management for restaurants including kitchen display systems, inventory tracking, and sales analytics.", tech: ["React Native", "Firebase", "Node.js"], features: ["Table Management", "Kitchen Display", "Inventory Alerts", "Sales Reports"], category: "Tablet Application", image: "/modern-dairy-farm.png", link: "#" },
  { id: 9, title: "AgriTech Crop Monitor", price: "2,000", description: "Satellite imagery analysis for crop health forecasting.", fullDescription: "Utilizes remote sensing data to provide farmers with actionable insights on soil moisture, crop health, and optimal harvest times.", tech: ["Python", "TensorFlow", "React", "Google Earth Engine"], features: ["NDVI Mapping", "Weather Forecast", "Disease Detection", "Yield Prediction"], category: "AI Solution", image: "/jewelry-store-system.png", link: "#" },
  { id: 10, title: "Logistics Fleet Tracker", price: "3,000", description: "Real-time GPS tracking and route optimization for delivery fleets.", fullDescription: "Comprehensive logistics software offering live vehicle tracking, fuel monitoring, and automated delivery scheduling.", tech: ["Angular", "Spring Boot", "MySQL", "Google Maps API"], features: ["Live Tracking", "Route Optimization", "Driver App", "Proof of Delivery"], category: "Enterprise Solution", image: "/modern-office-dashboard.png", link: "#" },
  { id: 11, title: "Fitness Tracking App", price: "1,500", description: "Mobile application for workout logging and diet tracking.", fullDescription: "Personalized fitness companion that tracks exercises, sets goals, and integrates with smart wearables.", tech: ["Flutter", "Firebase", "HealthKit/Google Fit"], features: ["Workout Plans", "Calorie Counter", "Wearable Sync", "Community Feed"], category: "Mobile App", image: "/modern-dairy-farm.png", link: "#" },
  { id: 12, title: "Crypto Portfolio Tracker", price: "2,000", description: "Aggregated dashboard for cryptocurrency investments.", fullDescription: "Secure platform to track holdings across multiple exchanges with real-time price updates and tax reporting tools.", tech: ["React", "Next.js", "Tailwind", "CoinGecko API"], features: ["Multi-exchange Sync", "Performance Charts", "Price Alerts", "Tax Export"], category: "Web Application", image: "/jewelry-store-system.png", link: "#" },
  { id: 13, title: "HR & Payroll Software", price: "3,000", description: "Automated payroll processing and employee management.", fullDescription: "Centralized HR solution handling attendance, leave requests, performance reviews, and compliant payroll generation.", tech: ["C#", ".NET Core", "SQL Server", "Angular"], features: ["Biometric Sync", "Tax Calculation", "Leave Management", "Employee Portal"], category: "Enterprise Solution", image: "/modern-office-dashboard.png", link: "#" },
  { id: 14, title: "Smart Home Controller", price: "2,500", description: "Centralized IoT hub interface for smart home devices.", fullDescription: "Unified control panel for lighting, HVAC, security systems, and appliances across different manufacturer protocols.", tech: ["React", "Node.js", "MQTT", "Raspberry Pi"], features: ["Scene Automation", "Energy Monitoring", "Voice Control", "Security Alerts"], category: "IoT Application", image: "/modern-dairy-farm.png", link: "#" },
  { id: 15, title: "Event Ticketing Platform", price: "2,000", description: "End-to-end event management and ticket sales system.", fullDescription: "Robust platform for organizers to create events, manage seating charts, and process ticket sales securely.", tech: ["Next.js", "Stripe API", "PostgreSQL", "Redis"], features: ["Seat Selection", "QR Ticketing", "Organizer Dashboard", "Waitlist Management"], category: "Web Application", image: "/jewelry-store-system.png", link: "#" },
  { id: 16, title: "Freelance Marketplace", price: "1,500", description: "Platform connecting businesses with independent professionals.", fullDescription: "Gig economy platform featuring escrow payments, milestone tracking, and a built-in messaging system.", tech: ["Ruby on Rails", "React", "PostgreSQL", "WebSockets"], features: ["Job Bidding", "Escrow Payments", "Live Chat", "Review System"], category: "Web Application", image: "/modern-office-dashboard.png", link: "#" },
  { id: 17, title: "Inventory Barcode Scanner", price: "1,500", description: "Mobile app for warehouse inventory management.", fullDescription: "Fast, reliable barcode scanning app that syncs directly with central ERP systems for real-time stock updates.", tech: ["React Native", "Zxing", "Node.js"], features: ["Fast Scanning", "Offline Mode", "ERP Sync", "Stock Alerts"], category: "Mobile App", image: "/modern-dairy-farm.png", link: "#" },
  { id: 18, title: "AI Content Generator", price: "2,000", description: "SaaS tool for automated blog and copy generation.", fullDescription: "Leverages large language models to help marketers create SEO-optimized articles, social media posts, and ad copy.", tech: ["Next.js", "OpenAI API", "Tailwind", "Supabase"], features: ["SEO Optimization", "Tone Control", "Plagiarism Check", "Bulk Export"], category: "SaaS Application", image: "/jewelry-store-system.png", link: "#" },
  { id: 19, title: "Virtual Try-On Fashion", price: "3,000", description: "AR application for online clothing stores.", fullDescription: "Enhances e-commerce by allowing users to virtually try on clothes and accessories using their device camera.", tech: ["Unity", "ARCore/ARKit", "React"], features: ["Body Tracking", "Accurate Sizing", "Social Sharing", "Direct Checkout"], category: "AR Application", image: "/modern-office-dashboard.png", link: "#" },
  { id: 20, title: "Legal Document Automation", price: "2,500", description: "Drafting tool for law firms to generate standard contracts.", fullDescription: "Reduces drafting time by using intelligent questionnaires to automatically populate complex legal templates.", tech: ["Python", "Flask", "React", "Docx"], features: ["Template Builder", "Version Control", "E-Signature integration", "Audit Trail"], category: "Enterprise Solution", image: "/modern-dairy-farm.png", link: "#" },
  { id: 21, title: "Local Services Directory", price: "1,500", description: "Directory listing and booking for home services.", fullDescription: "Connects homeowners with local plumbers, electricians, and cleaners with verified reviews and instant booking.", tech: ["Vue.js", "Laravel", "MySQL"], features: ["Provider Verification", "Instant Booking", "Review System", "In-app Chat"], category: "Web Application", image: "/jewelry-store-system.png", link: "#" },
  { id: 22, title: "Cloud Storage Client", price: "2,000", description: "Secure file synchronization and sharing application.", fullDescription: "End-to-end encrypted cloud storage client for personal and enterprise file management.", tech: ["Electron", "React", "AWS S3", "AES-256"], features: ["E2E Encryption", "File Versioning", "Link Sharing", "Folder Sync"], category: "Desktop Application", image: "/modern-office-dashboard.png", link: "#" },
  { id: 23, title: "Podcast Hosting Platform", price: "1,500", description: "Audio hosting and RSS feed generation for podcasters.", fullDescription: "Provides creators with unlimited hosting, detailed listener analytics, and one-click distribution to major platforms.", tech: ["Node.js", "React", "MongoDB", "AWS CloudFront"], features: ["RSS Generation", "Listener Analytics", "Audio Transcription", "Monetization"], category: "Web Application", image: "/modern-dairy-farm.png", link: "#" },
  { id: 24, title: "Customer Support Helpdesk", price: "2,500", description: "Omnichannel ticketing system for customer service teams.", fullDescription: "Unifies email, chat, and social media queries into a single collaborative inbox for support agents.", tech: ["React", "NestJS", "PostgreSQL", "Socket.io"], features: ["Ticket Routing", "SLA Management", "Knowledge Base", "Agent Collision"], category: "SaaS Application", image: "/jewelry-store-system.png", link: "#" }
]

const categories = ["All", "Web Application", "Enterprise Solution", "Desktop Application", "Mobile App", "AI Solution", "SaaS Application", "IoT Application"]

// ===================== PRODUCT CARD =====================
function ProductCard({ product }: { product: any }) {
  const { t } = useLanguage()
  return (
    <Dialog>
      <div className="glass-card group hover-glow" style={{ overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ position: "relative", height: "200px", background: "rgba(0,0,0,0.2)" }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            className="group-hover:scale-110"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", opacity: 0.6 }} />
          
          {/* Price Badge on Image */}
          <div style={{ 
            position: "absolute", 
            top: "1rem", 
            right: "1rem", 
            background: "var(--primary)", 
            color: "white", 
            padding: "0.4rem 0.8rem", 
            borderRadius: "12px", 
            fontWeight: 700,
            fontSize: "0.9rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            zIndex: 2
          }}>
            ₹{product.price}
          </div>

          <div style={{ position: "absolute", bottom: "1rem", left: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
             {product.tech.map((techName: string) => (
                <span key={techName} style={{ 
                  fontSize: "0.65rem", 
                  padding: "2px 8px", 
                  background: "var(--glass)", 
                  borderRadius: "4px", 
                  backdropFilter: "blur(4px)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)"
                }}>{techName}</span>
             ))}
          </div>
        </div>
        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
           <h4 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", fontFamily: "var(--font-space-grotesk), sans-serif" }}>{product.title}</h4>
           <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)", marginBottom: "1.5rem", flex: 1 }}>{product.description}</p>
           
            <DialogTrigger asChild>
             <button className="btn-outline" style={{ 
               width: "100%", 
               padding: "0.6rem", 
               borderWidth: "2px",
               fontWeight: 700
             }}>View Details</button>
           </DialogTrigger>
        </div>
      </div>

      <DialogContent className="sm:max-w-[600px] bg-[var(--background)] border-[var(--border)]">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6c63ff] bg-[#6c63ff]/10 px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xl font-bold text-[var(--primary)]">
              ₹{product.price}
            </span>
          </div>
          <DialogTitle className="text-3xl font-bold text-[var(--foreground)]">
            {product.title}
          </DialogTitle>
          <DialogDescription className="text-[var(--muted-foreground)] mt-2 line-height-relaxed">
            {product.fullDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[var(--foreground)]">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {product.tech.map((t: string) => (
                  <span key={t} className="text-xs bg-[var(--glass)] border border-[var(--border)] px-2 py-1 rounded text-[var(--foreground)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[var(--foreground)]">Key Features</h4>
              <ul className="space-y-1">
                {product.features.map((f: string) => (
                  <li key={f} className="text-xs text-[var(--muted-foreground)] flex items-center gap-2">
                    <Check size={12} className="text-[var(--primary)]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row gap-3">
             <a 
               href={`https://wa.me/9325519485?text=${encodeURIComponent(`Hi Abhishek, I'm interested in purchasing the project: ${product.title} (Price: ₹${product.price})`)}`}
               target="_blank"
               rel="noopener noreferrer"
               className="btn-primary flex-1 justify-center py-3 text-sm"
               style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", borderColor: "#128C7E" }}
             >
                Buy Now via WhatsApp
             </a>
             <a href={product.link} className="btn-outline flex-1 justify-center py-3 text-sm">
                Live Demo
             </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default function ProductsPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = allProductsData.filter(prod => {
    const matchesCategory = activeCategory === "All" || prod.category === activeCategory
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          
          {/* Page Header */}
          <RevealOnScroll>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div 
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "0.5rem",
                  padding: "0.5rem 1rem", 
                  background: "rgba(108, 99, 255, 0.1)", 
                  borderRadius: "50px",
                  border: "1px solid rgba(108, 99, 255, 0.2)",
                  color: "#6c63ff",
                  marginBottom: "1rem"
                }}
              >
                <Package size={16} />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Project Marketplace</span>
              </div>
              
              <h1 style={{ 
                fontSize: "clamp(2.5rem, 5vw, 4rem)", 
                fontWeight: 900, 
                fontFamily: "var(--font-space-grotesk), sans-serif",
                marginBottom: "1rem"
              }}>
                Find Your Perfect <span className="gradient-text">Project</span>
              </h1>
              
              <p style={{ 
                color: "var(--muted-foreground)", 
                fontSize: "1.1rem",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.6
              }}>
                High-quality, ready-to-deploy software solutions for students, developers, and businesses.
              </p>
            </div>
          </RevealOnScroll>

          {/* Search & Filters */}
          <RevealOnScroll delay={100}>
            <div style={{ 
              marginBottom: "3rem", 
              display: "flex", 
              flexDirection: "column", 
              gap: "2rem",
              background: "rgba(255,255,255,0.03)",
              padding: "2rem",
              borderRadius: "24px",
              border: "1px solid var(--border)"
            }}>
              <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto", width: "100%" }}>
                <input 
                  type="text" 
                  placeholder="Search by title or technology (e.g. React, Python)..." 
                  className="contact-input"
                  style={{ paddingLeft: "3rem", borderRadius: "16px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div style={{ position: "absolute", left: "1.2rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }}>
                  <Package size={20} />
                </div>
              </div>

              <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "0.75rem", 
                justifyContent: "center" 
              }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "0.6rem 1.2rem",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      background: activeCategory === cat ? "var(--primary)" : "rgba(255,255,255,0.05)",
                      color: activeCategory === cat ? "white" : "var(--muted-foreground)",
                      border: "1px solid",
                      borderColor: activeCategory === cat ? "var(--primary)" : "var(--border)",
                      cursor: "pointer"
                    }}
                    className={activeCategory === cat ? "" : "hover:bg-white/10"}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Products Grid */}
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
              gap: "2.5rem" 
            }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod, idx) => (
                <RevealOnScroll key={prod.id} delay={Math.min(idx * 50, 400)}>
                   <ProductCard product={prod} />
                </RevealOnScroll>
              ))
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", color: "var(--muted-foreground)" }}>
                <Package size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
                <h3>No projects found matching your criteria.</h3>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="btn-outline" 
                  style={{ marginTop: "1.5rem" }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="orb orb-purple" style={{ width: "400px", height: "400px", top: "10%", left: "-100px" }} />
      <div className="orb orb-cyan" style={{ width: "300px", height: "300px", bottom: "20%", right: "-50px" }} />

      <Footer />
    </div>
  )
}
