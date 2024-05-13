import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { SignupInput } from "@sidonweb/medium-clone-zod";

export default function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        name: "",
        password: ""
    })

    async function sendRequest () {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            localStorage.setItem("token", response.data.jwt);
            navigate("/blogs");
        } catch (error) {
            console.log(error);
            alert("Error while signing up");
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 text-center">
                        <div className="text-3xl mb-3 font-extrabold">{type === "signin" ? "Welcome Back" : "Create an account"}</div>
                        <div className="text-gray-400">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign Up" : "Sign In"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        <UserLabelInput label="Email" type="text" placeholder="jhondoe@email.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        {type === "signup" ? <UserLabelInput label="Full name" type="text" placeholder="JhonDoe" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <UserLabelInput label="Password" type="password" placeholder="********" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={sendRequest} type="button" className="bg-black text-white w-full rounded-lg p-2.5 mt-4">{type === "signup" ? "Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

interface LabelInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

function UserLabelInput({ label, placeholder, onChange, type}: LabelInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}