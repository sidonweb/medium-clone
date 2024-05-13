// import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";
import logo from "../assets/medium.png";
import { Link } from "react-router-dom";





export default function Appbar({ context }: { context: string }) {
    const [isOpen, setIsOpen] = useState(false);



    return (

        <nav className="bg-white border-b border-gray-200">
            <div className=" mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Left side */}
                    <div className="flex">
                        {/* Company name */}
                        
                        <div className="flex-shrink-0 flex items-center">
                        <Link to={"/blogs"}>
                            <img src={logo} className="size-10" alt="medium logo" />
                            </Link>
                        </div>
                        
                        {/* Search bar */}

                        <div className="ml-6 flex items-center max-sm:hidden  bg-[#f2f2f2] rounded-3xl focus:outline-none focus:border-blue-500 p-5 m-3">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-6 h-6 mr-2 text-gray-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z"
                                    fill="currentColor"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent focus:outline-none"
                            />
                        </div>

                    </div>

                    {/* Right side */}

                    <div className="flex items-center">
                        {context === "default" && (
                            <Link to={"/publish"}>
                                <button className="py-2 px-4 flex items-center gap-2 rounded-md text-[#6b6b6b] hover:text-black mr-4 invisible md:visible">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write">
                                        <path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path>
                                        <path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path>
                                    </svg>
                                    <div>Write</div>
                                </button>
                            </Link>
                        )}
                        
                        {/* <Link to={"/publish"}>
                            <button className=" py-2 px-4 flex items-center gap-2 rounded-md text-[#6b6b6b] hover:text-black mr-4 invisible md:visible">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
                                <div>Write</div>
                            </button>
                        </Link> */}

                        <div className="pr-5 text-[#6b6b6b] hover:text-black">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Notifications"><path d="M15 18.5a3 3 0 1 1-6 0" stroke="currentColor" strokeLinecap="round"></path><path d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z" stroke="currentColor" strokeLinejoin="round"></path></svg>
                        </div>

                        {/* Avatar dropdown */}
                        <div className="relative p-2">
                            <button
                                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div className="h-8 w-8 rounded-full bg-[#f2f2f2] flex items-center justify-center"> <Avatar size={"big"} name="Siddharth" /> </div>
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <div className="py-1">
                                        <a
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            href="/"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}