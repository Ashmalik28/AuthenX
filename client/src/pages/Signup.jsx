import logo from "../../images/AuthenXLogo.png"
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const Signup = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full flex border-b-1 border-gray-300">
                <div className="flex min-w-[1440px] mx-auto justify-between pb-2">
                <div onClick={() => navigate("/home") } className="flex-initial justify-center items-center cursor-pointer pt-3">
                    <img src={logo} alt="logo" className="w-40" />
                </div>
                <div className="pt-3 flex items-center  font-semibold">
                Have an account ? <span className="pl-3"><Button onClick={() => navigate("/signin")} variant="secondary" size="sm" className="before:bg-blue-500 rounded-lg outline-blue-400 flex gap-2 items-center">
                Login
                </Button></span>
                </div>

            </div>

            </div>
            <div className="flex-1 flex">
            <div className="w-1/2 bg-gray-200">
            <div className="w-full h-full rounded-r-4xl bg-blue-500">

            </div>

            </div>
            <div className="flex w-1/2 bg-gray-200 justify-center items-center">
              <span className=" w-3/4 bg-white border-gray-400 rounded-3xl shadow-blue-300 shadow-[-2px_4px_51px_20px_rgba(0,_0,_0,_0.1)] flex flex-col p-10">
              <span className="flex justify-start text-3xl font-bold">Create Your AuthenX Account</span>
              <span className="mt-3 text-base">Join AuthenX to verify documents securely or issue them with complete trust.</span>

              <div className="w-full">
                <div className="flex justify-center text-xl font-bold mt-3 border-1 p-2 border-gray-400">Join As </div>
                <div className="w-full flex mt-5 bg-gray-100 rounded-xl ">
                    <div className="w-1/2 flex justify-center p-2 rounded-xl text-white text-lg bg-blue-500">
                    Verifier 
                    </div>
                    <div className="w-1/2 flex justify-center items-center text-lg">
                    Organization
                    </div>

                </div>
              </div>
              <div className="flex justify-between mt-5">
                <div>
                    <div className="font-semibold text-gray-600 mb-1">
                     First Name
                    </div>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-50 outline-none mt-0" type="text" placeholder="First Name" />
                    <span className="flex w-3 justify-end text-gray-400">*</span>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-gray-600 mb-1">
                     Last Name
                    </div>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-50 outline-none mt-0" type="text" placeholder="Last Name" />
                    <span className="flex w-3 justify-end text-gray-400">*</span>
                    </div>
                </div>
              </div>
              <div>
                    <div className="font-semibold text-gray-600 mb-1 mt-2">
                     Email
                    </div>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-full outline-none mt-0" type="email" placeholder="youremail@gmail.com" />
                    <span className="flex w-3 justify-end text-gray-400">*</span>
                    </div>
              </div>
              <div>
                    <div className="font-semibold text-gray-600 mb-1 mt-2">
                     Password
                    </div>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-full outline-none mt-0" type="password" placeholder="Enter your Password" />
                    <span className="flex w-3 justify-end text-gray-400">*</span>
                    </div>
              </div>
              <span className="w-full flex items-center mt-4 flex-col">
                <Button variant="primary" size="md" className="before:bg-white rounded-full w-1/2 justify-center text-lg  outline-blue-400 flex gap-2 items-center">
                Sign Up
                </Button>
                <div className="mt-2 text-sm w-2/3 text-center">
                    By signing up, you agree to our Terms & Conditions and Privacy Policy.
                </div>
              </span>
              </span>
            </div>  
            </div>
        </div>
    )
}

export default Signup;