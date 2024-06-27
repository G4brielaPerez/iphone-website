import { useEffect, useRef, useState } from "react"
import { pauseImg, playImg, replayImg } from "../utils"
import { hightlightsSlides } from "../constants"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const VideoCarousel = () => {
    gsap.registerPlugin(ScrollTrigger)

    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])
    
    const [loadedData, setloadedData] = useState([])
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 *videoId}%)`,
            duration: 2,
            ease: "power2.inOut",
        })
        
        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((prevVideo) => ({
                    ...prevVideo, startPlay: true, isPlaying: true
                }))
            }
        })
    }, [isEnd, videoId])

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    const handleLoadedMetadata = (i, e) => {
        setloadedData((prevData) => [...prevData, e])
    }

    useEffect(() => {
        let currentProgress = 0
        let span = videoSpanRef.current

        if (span[videoId]) {
            //animete the progress of the video
            let animation = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(animation.progress() * 100)

                    if (progress != currentProgress) {
                        currentProgress = progress

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? "10vW" 
                                : window.innerWidth < 1200 ? "10vW" : "4vW",
                        })
    
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white"
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px"
                        })

                        gsap.to(span[videoId], {
                            backgroundColor: "#AFAFAF"
                        })
                    }
                }
            })

            if (videoId === 0) {
                animation.restart()
            }
            const animationUpdate = () => {
                animation.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
    
            if (isPlaying) {
                gsap.ticker.add(animationUpdate)
            } else {
                gsap.ticker.remove(animationUpdate)
            }
        }
    }, [videoId, startPlay])

    const handleProcess = (type, index) => {
        switch (type) {
            case "end":
                setVideo((prevVideo) => ({
                    ...prevVideo, isEnd: true, videoId: index + 1
                }))
                break;
            case "last":
                setVideo((prevVideo) => ({
                    ...prevVideo, isLastVideo: true
                }))
                break;
            case "reset":
                setVideo((prevVideo) => ({
                    ...prevVideo, isLastVideo: false, videoId: 0
                }))
                break;
            case "togglePlay":
                setVideo((prevVideo) => ({
                    ...prevVideo, isPlaying: !prevVideo.isPlaying
                }))
                break;
            default:
                return video;
        }
    }

  return (
    <>
    <div className="flex items-center">
        {hightlightsSlides.map((item, index) => (
            <div key={item.id} id="slider" className="sm:pr-20 pr-10">
                <div className="video-carousel-container">
                    <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                        <video 
                            src={item.video} 
                            id="video" 
                            type="video/mp4" 
                            preload="auto"
                            className={`pointer-events-none ${item.id === 2 && "translate-x-44"}`} 
                            playsInline 
                            muted
                            ref={(e) => videoRef.current[index] = e} 
                            onEnded={() => index !== 3 ?
                                handleProcess("end", index) 
                                : handleProcess("last")
                            }
                            onPlay={() => {
                                setVideo((prevVideo) => ({
                                    ...prevVideo, isPlaying: true
                                }))
                            }}
                            onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                        />
                    </div>

                    <div className="absolute top-10 left-[5%] z-10">
                        {item.textLists.map((text) => (
                            <p key={text} className="md:text-2xl text-xl font-medium">
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>

    <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300  rounded-full">
            {videoRef.current.map((_, index) => (
                <div 
                    key={index} 
                    ref={(e) => videoDivRef.current[index] = e} 
                    className="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer"
                >
                    <span 
                        ref={(e) => videoSpanRef.current[index] = e}
                        className="absolute size-full rounded-full" 
                    />
                </div>
            ))}
        </div>

        <button className="control-btn">
            <img 
                src={isLastVideo ? replayImg : 
                    !isPlaying ? playImg : pauseImg
                } 
                alt="control-btn" 
                onClick={
                    isLastVideo ? () => handleProcess("reset") 
                    : () => handleProcess("togglePlay") 
                }
            />
        </button>
    </div>
    </>
  )
}

export default VideoCarousel