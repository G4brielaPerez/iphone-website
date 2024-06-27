import { rightImg, watchImg } from "../utils"
import VideoCarousel from "./VideoCarousel"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Highlights = () => {
    useGSAP(() => {
        gsap.to('#title', {opacity: 1, y: 0})
        gsap.to('.link', {opacity: 1, y: 0, duration: 1, stagger: 0.25})
    }, [])

  return (
    <div id="highlights" className="w-screen h-full overflow-hidden common-padding bg-zinc">
        <div className="screen-max-width">
            <div className="mb-12 w-full lg:flex items-end justify-between">
                <p id="title" className="section-heading">Get the highlights</p>

                <div className="flex flex-wrap items-end gap-6">
                    <div className="link gap-2">
                        <p>Watch the film</p>
                        <img src={watchImg} alt="watchImg" />
                    </div>

                    <div className="link gap-2">
                        <p>Watch the event</p>
                        <img src={rightImg} alt="rightImg" className="mt-1" />
                    </div>
                </div>
            </div>
        </div>

        <VideoCarousel />
    </div>
  )
}

export default Highlights