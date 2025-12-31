"use client"

import React, { useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"
import Spinner from "@/components/utils/Spinner";
import { FaJira } from "react-icons/fa";
import { login } from "@/utilities/client_utils";

const schema = z.object({
    email: z.string().email('Invalid email address').trim(),
    password: z.string()
})

const LoginForm = () => {

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const sendRequest = async (data: any, url: string, type: string) => {
        let _data;
        _data = {
            email: data.email,
            password: data.password
        }
        const res: any = await axios.post(url, _data).catch(err => {
            if (err.response.status == 404) {
                console.log("404")
                setError(err.response.data.message)
            }
        })

        return res
    }

    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            setError(null)

            console.log("Submitted Data: ", data)
            const res: any = await login(data.email, data.password)
            if (res && res.status == 200) {
                router.push('/')
            }
            else {
                setError("Error logging in. Please try again.")
            }
        }
        catch (err: any) {
            console.error(err)
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="flex flex-col w-full gap-8">

                <span className="flex items-center gap-1 self-center text-3xl whitespace-nowrap">
                    <FaJira color="blue" />
                    <span className="text-blue-600 font-semibold">JIRA</span>
                </span>

                <div className="flex flex-row justify-center gap-2">
                    <span className="text-2xl text-black">Log in to continue</span>
                </div>
                <div className="flex flex-col gap-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 w-[350px] text-base text-gray-800"
                    >
                        <input id="email" type="email" placeholder="E-mail" className="w-full bg-white border border-gray-400 px-2 py-1" {...register('email')} />
                        <input id="password" type="password" placeholder="Password" className="w-full bg-white border border-gray-400 px-2 py-1" {...register('password')} />
                        <span className="ml-auto">
                            <a href="" className="text-blue-600 text-sm">Forgot Password?</a>
                        </span>
                        {
                            error &&
                            <span className="ml-auto mr-auto">
                                <a href="" className="text-red-600 text-sm">{error}</a>
                            </span>
                        }
                        <button
                            type="submit"
                            className="flex justify-center bg-blue-700 text-white p-1"
                        >
                            {
                                loading ? <Spinner /> : "Login"
                            }
                        </button>
                    </form>
                    <span className="text-base text-gray-700 ml-auto mr-auto">
                        Don't have an account?
                        <a
                            href="/signup"
                            className="text-blue-600"
                        >
                            {" "}Sign Up
                        </a>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default LoginForm