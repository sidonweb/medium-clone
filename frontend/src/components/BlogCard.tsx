import { Link } from "react-router-dom";

interface BlogCardProps {
    author: string;
    publishDate: string;
    title: string;
    content: string;
    id: string;
}

export default function BlogCard({
    id,
    author,
    publishDate,
    title,
    content

}: BlogCardProps) {
    return (
        <Link to={`/blog/${id}`}>
            <div className=" mb-0 mt-10 pt-4 mx-5  md:mx-64  border-b border-gray-200 pb-4 cursor-pointer">
                <div className="flex">
                <Avatar name={author} />
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{author}</div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{publishDate}</div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 200)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}


export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-black rounded-full ${size === "small" ? "size-6" : "size-8"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-lg"} font-extralight text-gray-300`}>
        {name[0]}
    </span>
</div>
}