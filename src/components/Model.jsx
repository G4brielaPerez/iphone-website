import { animateWithGSAPTimeline } from "../utils/animations"
import { useEffect, useRef, useState } from "react"
import { models, sizes } from "../constants"
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { useGSAP } from "@gsap/react"
import { yellowImg } from "../utils"
import ModelView from "./ModelView"
import * as THREE from "three"
import gsap from "gsap"

const Model = () => {
    const [size, setSize] = useState("small")
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg,
    })
    
    const cameraControlSmall = useRef()
    const cameraControlLarge = useRef()
    
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    const [smallRotation, setSmallRotation] = useState(0)
    const [largeRotation, setLargeRotation] = useState(0)

    const tl = gsap.timeline()

    useEffect(() => {
        if (size === "large") {
            animateWithGSAPTimeline(tl, small, smallRotation, "#view1", "#view2", {
                transform: "translateX(-100%)",
                duration: 2 
            })
        }

        if (size === "small") {
            animateWithGSAPTimeline(tl, large, largeRotation, "#view2", "#view1", {
                transform: "translateX(0)",
                duration: 2 
            })
        }
    }, [size])

    useGSAP(() => {
        gsap.to('#heading', {opacity: 1, y: 0})
    }, [])

  return (
    <div className="common-padding">
        <div className="screen-max-width">
            <p className="section-heading" id="heading">Take a closer look</p>

            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView 
                        index={1}
                        groupRef={small}
                        gsapType="view1"
                        controlRef={cameraControlSmall}
                        setRotation={setSmallRotation}
                        item={model}
                        size={size}
                    />

                    <ModelView 
                        index={2}
                        groupRef={large}
                        gsapType="view2"
                        controlRef={cameraControlLarge}
                        setRotation={setLargeRotation}
                        item={model}
                        size={size}
                    />

                    <Canvas 
                        className="w-full h-full"
                        style={{position: "fixed", top: 0, left: 0, bottom: 0, right: 0, overflow: "hidden"}}
                        eventSource={document.getElementById("root")}
                    >
                        <View.Port />
                    </Canvas>
                </div>

                <div className="mx-auto w-full">
                    <p className="text-sm font-light text-center mb-5">{model.title}</p>

                    <div className="flex-center">
                        <div className="color-container">
                            {models.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="size-6 rounded-full mx-2 cursor-pointer"
                                    style={{backgroundColor: item.color[0]}}
                                    onClick={() => setModel(item)} 
                                />
                            ))}
                        </div>

                        <div className="size-btn-container">
                            {sizes.map(({ label, value }) => (
                                <span 
                                    key={label} 
                                    className="size-btn cursor-pointer" 
                                    style={{backgroundColor: size === value ? "white" : "transparent", color: size === value ? "black" : "white"}}
                                    onClick={() => setSize(value)}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Model