import { MdGroups } from "react-icons/md"
import UserButton from "./UserButton"
import { FaJira } from "react-icons/fa";

const Navbar = async ({ isLoggedIn, user }: any) => {

    return (
        <nav className="text-black bg-white border-gray-100 border-b-2 sticky lg:px-36 px-4">
            <div className="flex flex-row w-full items-center justify-between mx-auto py-4 md:gap-8">
                <a href="https://jira-yogesh-kumar21s-projects.vercel.app/" className="">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                    <span className="flex items-center gap-1 self-center text-3xl whitespace-nowrap">
                        <FaJira color="blue" />
                        Jira
                    </span>
                </a>

                <div className="hidden md:flex md:w-fit md:order-1 md:items-end" id="navbar-user">
                    <ul className="flex flex-col ml-auto font-medium p-2 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">

                        {
                            isLoggedIn == false &&
                            <li>
                                <a href="/login" className="block hover:underline py-2 px-3 text-black rounded" aria-current="page">Login</a>
                            </li>
                        }

                    </ul>
                </div>

                {
                    isLoggedIn == true && <>
                        <div className="flex lg:gap-8 md:gap-4 sm:gap-2 items-center md:order-2 space-x-6 md:space-x-0 md:mr-2 rtl:space-x-reverse">


                            {user && user.data &&
                                <UserButton
                                    pic={user && user.data ? user.data.logo : null}
                                    name={user.data.name ? user.data.name : null}
                                    email={user.data.email ? user.data.email : null}
                                />
                            }
                        </div>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar