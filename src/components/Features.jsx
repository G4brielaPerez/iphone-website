import { explore1Img, explore2Img, exploreVideo } from "../utils"
import { animateWithGSAP } from "../utils/animations"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"

const Features = () => {
    const videoRef = useRef()

    useGSAP(() => {
        gsap.to('#exploreVideo', {
            scrollTrigger: {
              trigger: '#exploreVideo',
              toggleActions: "play pause reverse restart",
              start: "-10% bottom"
            },
            onComplete: () => {
                videoRef.current.play()
            }
        })

        animateWithGSAP('#explore', {opacity: 1, y: 0})
        animateWithGSAP('.g-grow', {scale: 1, opacity: 1, ease: "power1"}, {scrub: 5.5})
        animateWithGSAP('.g-text', {opacity: 1, y: 0, ease: "power2.inOUt", duration:1})
    }, [])
    
  return (
    <div className="h-full common-padding bg-zinc relative overflow-hidden">
        <div className="screen-max-width">
            <div className="mb-12 w-full">
                <p id="explore" className="section-heading">Explore the full story</p>
            </div>

            <div className="flex flex-col justify-center items-center overflow-hidden">
                <div className="my-32 mb-24 pl-24">
                    <p className="text-5xl lg:text-7xl font-semibold">iPhone</p>
                    <p className="text-5xl lg:text-7xl font-semibold">Forged in titanium</p>
                </div>
            </div>

            <div className="flex-center flex-col px-10">
                <div className="relative h-[50vh] w-full flex items-center">
                    <video 
                        src={exploreVideo}
                        ref={videoRef} 
                        id="exploreVideo"
                        className="size-full object-cover object-center"
                        type="video/mp4"
                        preload="none"
                        playsInline
                        autoPlay
                        muted
                    />
                </div>
            </div>

            <div className="flex flex-col px-10 relative mt-5">
                <div className="feature-video-container">
                    <div className="overflow-hidden flex-1 h-[50vh]">
                        <img 
                            src={explore1Img} 
                            alt="titanium" 
                            className="feature-video g-grow" 
                        />
                    </div>

                    <div className="overflow-hidden flex-1 h-[50vh]">
                        <img 
                            src={explore2Img} 
                            alt="titanium-2" 
                            className="feature-video g-grow" 
                        />
                    </div>
                </div>

                <div className="feature-text-container">
                    <div className="flex-1 flex-center">
                        <p className="feature-text g-text">
                            iPhone 15 Pro is <span className="text-white">the first iPhone to feature an aerospace-grade titanium design, </span>
                            using the same alloy that spacecrafts use ofr missions to Mars.
                        </p>
                    </div>
                    <div className="flex-1 flex-center">
                        <p className="feature-text g-text">
                            Titanium has one of the best strength-to-weight rations of nay metal, making these our
                            <span className="text-white"> lightest Pro models ever</span>. You'll notice the difference the moment you pick one up.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features