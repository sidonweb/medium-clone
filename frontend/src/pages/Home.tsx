import { Link } from "react-router-dom";
import HomeAppbar from "../components/HomeAppbar";

export default function Home() {
    return (
        <div className="h-screen overflow-hidden">
            <HomeAppbar />
            <div className="bg-yellow-500 h-3/4 grid grid-cols-1 lg:grid-cols-2 px-10 md:px-20 pt-20">
                <div className="">
                    <div className="lg:text-8xl text-4xl font-semibold md:text-6xl  mb-5">
                        Stay curious.
                    </div>
                    <div className="mb-5 text-xl font-normal ">
                        Discover stories, thinking, and expertise from writers on any topic.
                    </div>
                    <Link to={"/signup"}>
                        <button className="py-2 bg-black font-semibold rounded-full px-4 flex items-center gap-2 text-[#ffffff] mr-4">
                            <div>Start Reading</div>
                        </button>
                    </Link>
                </div>
                <div className=" invisible lg:visible pt-8 lg:pt-0 flex justify-center items-center  pl-5">
                    <img className="h-50" src="https://media.giphy.com/media/1RAKGFJviyUKjgVSxG/giphy.gif" alt="" />
                </div>

            </div>
            <div className="border-t flex justify-center h-1/4 border-black">
                <div className="pt-8">Made by <a className="underline" href="https://sidonweb.com">Siddharth 👽</a></div>
            </div>
        </div>
    )
}