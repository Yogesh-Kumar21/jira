import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex flex-col gap-8 lg:px-36 px-4">
            <div className="flex w-full">

                <div className="flex flex-col md:flex-row gap-4 w-full">

                    {/* Left Column: 40% */}
                    <div className="flex flex-col gap-6 w-full md:w-[40%]">
                        <span className="flex w-full text-6xl font-medium leading-tight text-black">Where your teams and AI come together</span>
                        <div className="flex flex-col gap-2">
                            <span className="text-black text-sm font-semibold">Work email</span>
                            <input type="email" className="rounded-full border border-gray-400 px-4 py-2 text-base bg-white text-gray-700" placeholder="you@company.com" />
                            <span className="text-xs text-gray-600">
                                Using a work email helps find teammates and boost collaboration.
                            </span>
                        </div>
                        <a href="/signup" className="rounded-full w-full px-2 py-2 bg-blue-700 text-white font-medium">
                            Sign up
                        </a>

                        <div className="flex ml-auto mr-auto gap-1">
                            <span className="text-black text-sm">Trying to access Jira?</span>
                            <a href="/login" className="text-sm text-blue-600 underline">Log in</a>
                        </div>
                    </div>

                    {/* Right Column: 60% */}
                    <div className="flex flex-col items-center justify-center w-full md:w-[60%]">
                        <Image
                            alt="hero"
                            src={'/images/hero.jpg'}
                            width={600}
                            height={600}
                            className="flex object-cover" 
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}