import { Blog } from "../hooks"
import { prettifyDate } from "../pages/Blogs"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Appbar context="default"/>
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on {prettifyDate(blog.publishedAt)}
                    </div>
                    <div className="pt-4 pr-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 md:border-l-2 mt-4 pt-2 border-t-2 pl-4">
                    <div className="text-slate-600 text-md">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-[#6b6b6b]">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}