import { Link } from "react-router-dom"
import logo from "../assets/medium.png"
export default function HomeAppbar() {
    return (
        <div>
            <nav className="bg-yellow-500 border-b border-black">
                <div className=" mx-auto px-4 py-2">
                    <div className="flex justify-between h-16">
                        {/* Left side */}
                        <div className="flex">
                            {/* Company name */}

                            <div className="flex-shrink-0 flex items-center">
                                <Link to={"/blogs"}>
                                    <img src={logo} className="size-10" alt="logo" />
                                </Link>
                            </div>
                            <div>
                                
                            </div>



                        </div>

                        {/* Right side */}

                        <div className="flex items-center">
                            <Link className="invisible md:visible" to={""}>
                                <button className="py-2 rounded-full px-2 flex items-center gap-2 text-black mr-4">
                                    <div>Our story</div>
                                </button>
                            </Link>
                            <Link className="invisible md:visible" to={"/signin"}>
                                <button className="py-2 rounded-full px-2 flex items-center gap-2 text-black mr-4">
                                    <div>Sign in</div>
                                </button>
                            </Link>
                            <Link to={"/signup"}>
                                <button className="py-2 bg-black rounded-full px-4 flex items-center gap-2 text-[#ffffff] mr-4">
                                    <div className="text-xs md:text-base">Get started</div>
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}