"use client"

import React, { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaJira } from "react-icons/fa";
import Spinner from "@/components/utils/Spinner";

const schema = z.object({
    name: z.string().min(1, 'Text field cannot be empty'),
    email: z.string().email('Invalid email address').trim(),
    password: z.string().min(8, 'Password must contain atleast 8 characters').max(13),
    confirmPassword: z.string().min(8, 'Password must contain atleast 8 characters').max(13)
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
})

const SignupForm = () => {

    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    // useEffect(() => {
    //     // const checkLoggedIn = async () => {
    //     //     const res = await isLoggedIn();
    //     //     if (res && res.status == true) {
    //     //         router.push("/")
    //     //     }
    //     // }

    //     // checkLoggedIn()

    //     const googleAuth = async () => {
    //         try {
    //             const urlParams = new URLSearchParams(window.location.search);
    //             const code = urlParams.get('code');
    //             console.log(code)
    //             if (code) {

    //                 const res: any = await axios.post('/api/cookieauth', {
    //                     code: code
    //                 })
    //                 console.log("res: ", res)
    //                 if (res.data.data.message === 'success') {
    //                     router.push("/")
    //                 }
    //                 else {
    //                     setError("Google Authentication failed. Please try again!")
    //                 }
    //             }
    //         }
    //         catch (err) {
    //             console.error(err)
    //         }
    //     }

    //     googleAuth()
    // }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    // const handleGoogleAuth = async () => {
    //     const GOOGLE_OAUTH_SCOPES = [
    //         "https%3A//www.googleapis.com/auth/userinfo.email",
    //         "https%3A//www.googleapis.com/auth/userinfo.profile",
    //     ];
    //     const state = "some_state";
    //     const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    //     const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    //     window.open(GOOGLE_OAUTH_CONSENT_SCREEN_URL, "_self")
    // }

    const sendRequest = async (data: any) => {
        const res: any = await axios.post('https://jira-backend-knkxrdn1e-yogesh-kumar21s-projects.vercel.app/auth/signup', {
            name: data.name,
            email: data.email,
            password: data.password
        }).catch(err => {
            setError(err)
            console.log("Signup Error:", err)
        })

        console.log("Signup response: ", res)
        const _data = await res.data
        return _data
    }

    const onSubmit = async (data: any) => {
        setLoading(true)
        setError(null)
        try {
            let res = await sendRequest(data)
            console.log("Signup response: ", res)
            if (res && res.status(201)) {
                router.push('/login')
            }
        } catch (err: any) {
            setError(err.message)
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     if (verifyOTP) {
    //         // if (otp.join("") !== "" && otp.join("") !== correctOTP) {
    //         //     setOtpError("❌ Wrong OTP Please Check Again")
    //         // } else {
    //         //     setOtpError(null)
    //         // }
    //     }
    // }, [otp]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-4">

                <span className="flex items-center gap-1 self-center text-3xl whitespace-nowrap">
                    <FaJira color="blue" />
                    <span className="text-blue-600 font-semibold">JIRA</span>
                </span>

                <>
                    <div className="flex justify-center mt-2">
                        <span className="text-medium text-black">Sign up</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 w-[350px] text-base text-gray-700"
                        >
                            <input id="name" type="text" placeholder="Name" className="bg-white border border-gray-400 p-1" {...register('name')} />
                            <input id="email" type="email" placeholder="E-mail" className="bg-white border border-gray-400 p-1" {...register('email')} />
                            <input id="password" type="password" placeholder="Password" className="bg-white border border-gray-400 p-1" {...register('password')} />
                            <input id="confirmPassword" type="password" className="bg-white border border-gray-400 p-1" placeholder="Confirm Password" {...register('confirmPassword')} />
                            {
                                errors && Object.keys(errors).length > 0 && <div className="flex flex-col">
                                    {Object.keys(errors).map((key) => (
                                        <span key={key} className="text-[12px] text-red-600">{error}</span>
                                    ))}
                                </div>
                            }
                            <span
                                className="text-sm text-gray-700 bg-blue-50"
                            >
                                By clicking submit, you agree to jira's
                                <a href="" className="font-semibold"> User Agreement, </a>
                                <a href="" className="font-semibold"> Privacy Policy, </a>
                                and
                                <a href="" className="font-semibold"> Cookie Policy.</a>
                            </span>
                            <button
                                type="submit"
                                className="flex justify-center bg-blue-700 text-white p-1 rounded-md"
                            >
                                {
                                    loading == true ?
                                        <Spinner />
                                        :
                                        "Signup"
                                }
                            </button>
                        </form>
                        <span className="text-base text-gray-700 ml-auto mr-auto">
                            Already have an account?
                            <a
                                href="/login"
                                className="text-blue-600"
                            >
                                {" "}Log in
                            </a>
                        </span>
                        <div className="flex w-full p-2 bg-red-100">
                            <span className="text-sm text-red-500 ml-auto mr-auto">{error}</span>
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className="flex flex-row w-full mt-2">
                            <div className="flex flex-row gap-2 w-fit ml-auto mr-auto">
                                <button onClick={() => { }}>
                                    <FcGoogle size={40} className="border border-gray-400 p-2" />
                                </button>
                                <button onClick={() => { }}>
                                    <IoLogoFacebook size={40} color="blue" className="border border-gray-400 p-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default SignupForm