'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

export const DynamicInput = dynamic(() => import("@nextui-org/react").then((mod) => mod.Input));
export const DynamicButton = dynamic(() => import("@nextui-org/react").then((mod) => mod.Button));
export const DynamicCheckbox = dynamic(() => import("@nextui-org/react").then((mod) => mod.Checkbox));

import logo from "@/public/logo.svg";
import EyeFilledIcon from "@/public/components/login/EyeFilledIcon.svg";
import EyeSlashFilledIcon from "@/public/components/login/EyeSlashFilledIcon.svg";
import UserIcon from "@/public/components/login/user.svg";
import Pass1Icon from "@/public/components/login/pass1.svg";
import EmailIcon from "@/public/components/login/email.svg";

export default function page() {
    const [isVisible, setIsVisible] = useState(false);
    const [isForm, setIsForm] = useState({ username: '', password: '', email: '' });
    const [isFormError, setIsFormError] = useState({ username: '', password: '', email: '' });
    const [IsChack, setIsChack] = useState(false);
    const router = useRouter()

    const handleChange = (e) => {
        if (e.target.value) {
            setIsFormError({ ...isFormError, [e.target.name]: '' });
        }
        setIsForm({ ...isForm, [e.target.name]: e.target.value });
    };

    const formsubmit = (e) => {
        e.preventDefault();
        let issubmit = true;

        if (!isForm.username) {
            isFormError.username = "Please enter a username";
            setIsFormError({ ...isFormError })
            issubmit = false;
        }
        if (!isForm.password) {
            isFormError.password = "Please enter a password";
            setIsFormError({ ...isFormError })
            issubmit = false;
        }
        if (!IsChack) {
            toast.info('Plase Chack privacy policy & terms & condition')
            issubmit = false;
        }

        if (issubmit) {
            alert('login')
        }
    }

    return (
        <div className="h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-5 h-full bg-[#F4F4F4]">
                <div className="col-span-2 m-auto flex lg:flex-col my-8">
                    <Image src={logo} alt="Logo" className="m-auto w-[180px]" />
                </div>
                <div className="col-span-3 bg-[#ffffff] p-2 h-full align-middle grid drop-shadow-xl">
                    <div className="m-auto w-full sm:w-[490px]">
                        <form className="my-8 mx-4 sm:mx-0" onSubmit={formsubmit}>
                            <h1 className="text-2xl text-back font-bold mb-1">Sing up</h1>
                            <p className="text-back text-lg font-normal text-gray-500">Please sign in to continue.</p>
                            <div className="my-4 flex flex-col gap-2">
                                <DynamicInput type="email" name='email'
                                    placeholder="Enter Email*"
                                    variant="bordered" size="sm"
                                    radius="lg"
                                    className="!bg-[#fff]"
                                    defaultValue={isForm.username} onChange={handleChange}
                                    isInvalid={isFormError.username}
                                    errorMessage={isFormError.username}
                                    startContent={
                                        <Image src={EmailIcon} alt="user" />
                                    }
                                />
                                <DynamicInput type="text" name='username'
                                    placeholder="Enter username*"
                                    variant="bordered" size="sm"
                                    radius="lg"
                                    className="!bg-[#fff]"
                                    defaultValue={isForm.username} onChange={handleChange}
                                    isInvalid={isFormError.username}
                                    errorMessage={isFormError.username}
                                    startContent={
                                        <Image src={UserIcon} alt="user" />
                                    }
                                />
                                <DynamicInput
                                    type={isVisible ? "text" : "password"}
                                    name='password'
                                    value={isForm.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password*"
                                    variant="bordered" size="sm"
                                    radius="lg"
                                    className="!bg-[#fff]"
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                                            {isVisible ? (
                                                <Image src={EyeSlashFilledIcon} alt="eye" width={20} height={20} />
                                            ) : (
                                                <Image src={EyeFilledIcon} alt="eye" width={20} height={20} />
                                            )}
                                        </button>
                                    }
                                    startContent={
                                        <Image src={Pass1Icon} alt="user" />
                                    }
                                    isInvalid={isFormError.password}
                                    errorMessage={isFormError.password}
                                />
                            </div>
                            <div className="mb-9">
                                <DynamicCheckbox onValueChange={setIsChack}>I agree with <b> privacy policy & terms & condition</b></DynamicCheckbox>
                            </div>
                            <div className="text-center">
                                <DynamicButton type="submit" radius="full" className="w-[75%] bg-[#171717] text-[#fff] text-lg hover:bg-[#fff] hover:text-[#171717] hover:font-semibold hover:border-2" size="lg">Login</DynamicButton>
                            </div>
                            <div className='text-center mt-3'>
                                <span>Already have an account? </span>
                                <Link href='/login' className='font-semibold'><u>Sign in here.</u></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
