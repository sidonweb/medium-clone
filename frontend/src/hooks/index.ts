import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
    }
    publishedAt: string;
}

export interface Profile {
    name: string;
    blogs: Omit<Blog, "author">[];
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);



    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }

        };
        fetchBlogs();
    }, []);

    return { loading, blogs };
}

export const useBlog = (id: string | undefined) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBlog(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id]);

    return { loading, blog };
}

export const useGetProfileData = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setProfile(response.data);
                setLoading(false);
            } catch (error: any) {
                console.error("Error fetching profile:", error.message);
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);
    return {loading, profile};
}