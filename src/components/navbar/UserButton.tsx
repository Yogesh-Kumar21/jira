"use client"

import axios from "axios";
import { CircleUser } from "lucide-react";
import Image from "next/image"
import { useState } from "react";

export default function UserButton({ pic, name, email, business, team }: any) {

    const [hidden, setHidden] = useState<boolean>(true)

    const handleLogout = async () => {
        // const res: any = await axios.get('http://localhost:5000/api/logout')
        // console.log("logout response: ", res)
        // if (res && res.status == 200) {
        //     window.location.href = "/"
        // }
    }

    return (
        <div className="inline-block text-left w-fit">
            <div>
                <button type="button" className="flex flex-row gap-2 text-sm rounded-full w-[30px] h-[30px]" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={() => setHidden(!hidden)}>

                    {
                        <CircleUser size={30} className="font-thin text-gray-600" />
                    }

                </button>
            </div>

            {
                !hidden &&
                <div
                    className="absolute right-4 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/5 focus:outline-none p-2" // Increased shadow, rounded corners, padding
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="flex flex-col py-1">
                        {/* Account Info Section */}
                        <div className="px-3 py-2 border-b border-gray-100 mb-1"> {/* Added padding and subtle border */}
                            <span className="text-gray-700 font-medium text-sm block">Signed in as</span>
                            <span className="text-gray-900 font-semibold text-md block truncate">
                                {name || "Nil"} {/* Dynamically show user name */}
                            </span>
                            <span className="text-gray-500 text-xs block truncate">
                                {email || "Nil"} {/* Dynamically show user email */}
                            </span>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1"> {/* Group menu items */}
                            <a
                                href="#"
                                className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-150 ease-in-out" // Better hover, rounded, padding
                                role="menuitem"
                            >
                                Your Account
                            </a>
                            
                        </div>

                        {/* Separator */}
                        <div className="border-t border-gray-100 my-1"></div> {/* Clear separator */}

                        
                        {/* Logout Button */}
                        <div className="py-1">
                            <button
                                className="block w-full text-left px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-150 ease-in-out" // Distinct logout style
                                role="menuitem"
                                onClick={handleLogout}
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}