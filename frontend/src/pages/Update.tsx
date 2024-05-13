import Appbar from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useBlog } from "../hooks";

export const Update = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { loading, blog } = useBlog(id);
    
    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        }
    }, [blog]);

    

    return <div>
        <Appbar context="publish" />
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full  text-gray-900 text-5xl rounded-lg  focus:outline-none  block p-2.5" value={title} />

                <TextEditor onChange={(e) => {
                    setContent(e.target.value)
                }} content={content}/>
                <button onClick={async () => {
                    try {
                        const response = await axios.patch(`${BACKEND_URL}/api/v1/blog/${id}`, {
                            title,
                            content
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                        navigate(`/blog/${response.data.id}`)
                    } catch (error) {
                        console.log(error)
                        alert("Error while publishing!")
                    }
                    
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-3xl focus:ring-4 focus:ring-blue-200  hover:bg-green-800">
                    Save
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange, content }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, content: string}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={0} className="focus:outline-none block w-full px-0 text-2xl text-gray-800 bg-white pl-2" value={content} required />
            </div>
        </div>
       </div>
    </div>
    
}