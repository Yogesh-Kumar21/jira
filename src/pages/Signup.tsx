import LoginForm from "@/forms/LoginForm";
import SignupForm from "@/forms/SignupForm";

export default function Signup() {
    return (
        <div className="flex w-full h-full items-center justify-center"
        style={{ 
            backgroundImage: `url('doodle.png')`
        }}
        >
            <div className="flex flex-col bg-white w-[95%] md:w-[50%] lg:w-[30%] h-fit py-8 px-8 border border-gray-300 shadow-lg rounded-lg">
                <SignupForm />
            </div>
        </div>
    )
}