import { useState, useEffect } from "react"
import { heroVideo, smallHeroVideo } from "../utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 640 ? smallHeroVideo : heroVideo)

    const handleSetVideo = () => {
        setVideoSrc(window.innerWidth < 640 ? smallHeroVideo : heroVideo)
    }

    useEffect(() => {
        window.addEventListener('resize', handleSetVideo)

        return () => {
            window.removeEventListener('resize', handleSetVideo)
        }
    }, [])

    useGSAP(() => {
        gsap.to('.hero-title', {opacity: 1, delay: 2})
        gsap.to('#cta', {opacity: 1, y: -40, delay: 2})
    }, [])

  return (
    <div className="w-full h-screen">
        <div className="h-full w-full flex-center flex-col">
            <p className="hero-title">iPhone 15 Pro</p>

            <div className="w-9/12 py-6">
                <video 
                    className="pointer-events-none"
                    typeof="video/mp4" 
                    src={videoSrc} 
                    key={videoSrc} 
                    playsInline 
                    autoPlay 
                    muted 
                />
            </div>

            <div id="cta" className="flex flex-col items-center opacity-0">
                <div className="btn font-semibold">Buy</div>
                <p className="text-xl">From $199/month or $999</p>
            </div>
        </div>
    </div>
  )
}

export default Hero