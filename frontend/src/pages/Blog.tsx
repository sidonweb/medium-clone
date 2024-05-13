import { useParams } from "react-router-dom";
import {FullBlog} from "../components/FullBlog";
import { useBlog } from "../hooks";
import Appbar from "../components/Appbar";
import Loader from "../components/Loader";

export default function Blog() {
    const { id } = useParams();
    const {loading, blog} = useBlog(id || "");

    if (loading || !blog) {
        return <div>
            <Appbar context="default" />
        
            <div className="h-screen flex flex-col justify-center">
                    <Loader />
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}