import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import Loader from "../components/Loader";
import { useBlogs } from "../hooks"
export default function Blogs() {
    const {loading, blogs} = useBlogs();
    if(loading){
        return <div>
            <Loader />
        </div>
    }
    return (
        <div>
            <Appbar context="default"/>
            {blogs.map(blog => <BlogCard
            key={blog.id} 
            author={blog.author.name}
            publishDate={prettifyDate(blog.publishedAt)} 
            title={blog.title} 
            content={blog.content}
            id={blog.id}/> )}
            
        </div>
    )
}



export const prettifyDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

