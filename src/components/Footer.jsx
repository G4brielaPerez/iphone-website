import { footerLinks } from "../constants"


const Footer = () => {
  return (
    <div className="py-5 sm:px-10 px-5">
        <div className="screen-max-width">
            <div>
                <p className="font-semibold text-gray text-xs">
                    More ways to shop: <span className="underline text-blue cursor-pointer">Find an Apple Store</span>
                    {' '}or <span className="underline text-blue cursor-pointer">other retailer</span> near you.
                </p>

                <p className="font-semibold text-gray text-xs">
                    Or call 000800-040-1966
                </p>
            </div>

            <div className="bg-neutral-700 my-5 h-[1px] w-full"></div>

            <div className="flex md:flex-row flex-col md:items-center justify-between">
                <p className="font-semibold text-gray text-xs">
                    Copyright © 2024 Apple Inc. All rights reserved.
                </p>
                <div className="flex">
                    {footerLinks.map((item, index) => (
                        <div key={index} className="flex items-center font-semibold text-xs text-gray">
                            <p className="cursor-pointer hover:text-white">{item}</p>
                            {index !== footerLinks.length - 1 && <span className="mx-2"> | </span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer