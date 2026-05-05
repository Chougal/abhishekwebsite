"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function VoiceAssistant() {
  const { language } = useLanguage()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis)
    }
  }, [])

  const getIntroText = () => {
    switch (language) {
      case "mr":
        return "अभिषेक चौगुले यांच्या पोर्टफोलिओ आणि प्रोजेक्ट मार्केटप्लेसमध्ये आपले स्वागत आहे. येथे आपण उच्च-दर्जाचे सॉफ्टवेअर सोल्यूशन्स आणि प्रोफेशनल डेव्हलपमेंट सेवा पाहू शकता."
      case "hi":
        return "अभिषेक चौगुले के पोर्टफोलियो और प्रोजेक्ट मार्केटप्लेस में आपका स्वागत है। यहाँ आप उच्च-गुणवत्ता वाले सॉफ्टवेयर समाधान और पेशेवर विकास सेवाओं का पता लगा सकते हैं।"
      default:
        return "Welcome to Abhishek Chougale's portfolio and project marketplace. Here you can explore high-quality software solutions and professional development services."
    }
  }

  const speak = () => {
    if (!synth) return

    if (isSpeaking) {
      synth.cancel()
      setIsSpeaking(false)
      return
    }

    const text = getIntroText()
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Get all available voices
    const voices = synth.getVoices()
    
    // Define preferred language codes for each mode
    let langCodes = ["en-US", "en-GB"]
    if (language === "hi") langCodes = ["hi-IN", "hi_IN"]
    if (language === "mr") langCodes = ["mr-IN", "hi-IN", "hi_IN"] // Fallback to Hindi for Marathi if needed
    
    // Find the best matching voice
    const voice = voices.find(v => langCodes.some(code => v.lang.replace("_", "-").startsWith(code)))
    
    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang
    } else {
      utterance.lang = langCodes[0]
    }
    
    utterance.rate = 0.85 // Slightly slower for better clarity
    utterance.pitch = 1.0

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (e) => {
      console.error("Speech error:", e)
      setIsSpeaking(false)
    }

    setIsSpeaking(true)
    synth.speak(utterance)
  }

  return (
    <button
      onClick={speak}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "7rem", // Positioned to the left of the WhatsApp button
        width: "60px",
        height: "60px",
        backgroundColor: "var(--primary)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px var(--primary-glow)",
        zIndex: 9999,
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        border: "none",
        color: "white"
      }}
      className={`hover:scale-110 hover:shadow-[0_8px_30px_var(--primary-glow)] ${isSpeaking ? "animate-pulse" : ""}`}
      aria-label="Listen to website introduction"
    >
      {isSpeaking ? <VolumeX size={28} /> : <Volume2 size={28} />}
      
      {/* Tooltip */}
      <span style={{
        position: "absolute",
        bottom: "100%",
        marginBottom: "1rem",
        backgroundColor: "var(--card)",
        color: "var(--foreground)",
        padding: "0.5rem 1rem",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        border: "1px solid var(--border)",
        pointerEvents: "none",
        opacity: 0,
        transition: "all 0.3s ease",
        left: "50%",
        transform: "translateX(-50%)"
      }} className="hidden md:block group-hover:opacity-100">
        {isSpeaking ? (language === "mr" ? "थांबा" : language === "hi" ? "रुकें" : "Stop") : (language === "mr" ? "ऐका" : language === "hi" ? "सुनिए" : "Listen")}
      </span>

      {/* Pulse effect when speaking */}
      {isSpeaking && (
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          opacity: 0.4,
          zIndex: -1,
        }} className="animate-ping" />
      )}
    </button>
  )
}
