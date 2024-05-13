import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface ProfileCardProps {
    // author: string;
    // publishDate: string;
    title: string;
    content: string;
    id: string;
}

export default function ProfileCard({
    id,
    title,
    content

}: ProfileCardProps) {
    const navigate = useNavigate();
    return (
        
            <div className=" mb-0 mt-10 pt-4 mx-5  md:mx-64  border-b border-gray-200 pb-4 cursor-pointer">
                <Link to={`/blog/${id}`}>
                <div className="text-2xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-lg font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                </Link>
                <div className="flex justify-between">
                    <div className="text-slate-500 text-md font-thin pt-4">
                        {`${Math.ceil(content.length / 200)} minute(s) read`}
                    </div>
                    <div>
                        <div>
                            <button onClick={async () => {
                                try {
                                    const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                        }
                                    });
                                    navigate(`/blogs`)
                                } catch (error) {
                                    console.log(error)
                                    alert("Error while deleting!")
                                }

                            }} type="submit" className="mt-4 inline-flex m-2 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-800 rounded-3xl focus:ring-4 focus:ring-blue-200  hover:bg-red-900">
                                Delete
                            </button>
                            <Link to={`/update/${id}`}>
                            
                            
                            <button  className="mt-4 inline-flex items-center m-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-3xl focus:ring-4 focus:ring-blue-200  hover:bg-green-800">
                                Edit
                            </button>
                            </Link>

                        </div>

                    </div>
                </div>

            </div>
    )
}
