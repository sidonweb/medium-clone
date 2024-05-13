import Appbar from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import Loader from "../components/Loader";
import ProfileCard from "../components/ProfileCard";
import { useGetProfileData } from "../hooks";

export default function Profile(){
    const { loading, profile } = useGetProfileData();
    
    if(loading){
        return <div>
            <Loader />
        </div>
    }
    return (
        <div>
            <Appbar context="default" />
            <div className="text-black text-5xl font-semibold pl-20 pt-10">
                
                {profile?.name}
                </div>
            {profile?.posts.map(blog => <ProfileCard
            key={blog.id}
            title={blog.title} 
            content={blog.content}
            id={blog.id}/> )}
        </div>
    )
}
