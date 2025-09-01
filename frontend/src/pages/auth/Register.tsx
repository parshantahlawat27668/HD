import axios from 'axios';
import { useRef, useState } from 'react'
import { PiSpinnerBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';
type Button = "get-otp" | "sign-up";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const otpRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const dobRef = useRef<HTMLInputElement | null>(null);
    const [button, setButton] = useState<Button>("get-otp");

    const getOtp = () => {

        setLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            emailRef.current &&
            !emailRegex.test(emailRef.current.value)
        ) {
            console.log("Invalid email");
            setLoading(false);
            toast.error("Invalid email");
            return;
        }

        if(!dobRef.current?.value){
            setLoading(false);
            toast.error("Please select your Date of Birth");
            return
        }

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/get-signup-otp`,
            {
                name: nameRef.current?.value,
                DOB: dobRef.current?.value,
                email: emailRef.current?.value
            },
            {
                withCredentials: true
            }
        )
        .then((response)=>{
            console.log(response);
            toast.success(response.data.message);
            setLoading(false);
            setButton("sign-up");
        })
        .catch((error)=>{
            toast.error(error.response.data.message);
            setLoading(false);
        });
    }

    const signUp = () => {
        setLoading(true);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            emailRef.current &&
            !emailRegex.test(emailRef.current.value)
        ) {
            setLoading(false);
            console.log("Invalid email");
            return;
        }
        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-signup-otp`
            ,{
                email:emailRef.current?.value,
                otp:otpRef.current?.value
            },
            {
                withCredentials:true
            }
        )
        .then((response)=>{
            toast.success(response.data.message);
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/get-user`,{withCredentials:true})
            .then((response)=>{
                dispatch(setUser(response.data.data.user));
                setLoading(false);
                navigate("/dashboard");  
            })
            .catch((error)=>{
                console.log(error);
            });
        })
        .catch((error)=>{
            toast.error(error.response.data.message);
            setLoading(false);

        })
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='md:border-[#00000070] md:border-[1px] rounded-2xl p-2 flex flex-row'>
                <form>
                    <h1 className='flex items-center gap-1 justify-center md:justify-start mt-2 md:mt-1 font-bold'>
                        <PiSpinnerBold color='#155dfc' size={20} />
                        HD
                    </h1>
                    <div className='p-8 flex flex-col gap-3 w-80 sm:w-100'>
                        <div className=' flex flex-col items-center md:items-start mb-2'>
                            <h2 className='text-2xl font-bold mb-1'>Sign up</h2>
                            <p className='text-xs'>Sign up to enjoy the feature of HD</p>
                        </div>
                        <div className='relative'>
                            <label className='absolute text-[12px] bg-white m-0 p-0 px-[7px] top-[-10px] left-[7px] text-[#00000085]'>
                                Name
                            </label>
                            <input required type='text' className='border-[2px] border-[#00000035]  rounded-md outline-none py-2 px-2 w-full text-xs' ref={nameRef} readOnly={button === "sign-up" ? true: false}>
                            </input>
                        </div>

                        <div className='relative'>
                            <label className='absolute text-[12px] bg-white m-0 p-0 px-[7px] top-[-10px] left-[7px] text-[#00000085]'>Date of Birth</label>
                            <input required type='date' className='border-[2px] border-[#00000035] rounded-md outline-none py-2 px-2 w-full text-xs ' ref={dobRef} readOnly={button === "sign-up" ? true: false}></input>
                        </div>

                        <div className='relative'>
                            <label className='absolute text-[12px] bg-white m-0 p-0 px-[7px] top-[-10px] left-[7px] text-[#00000085]'>Email</label>
                            <input required type='email' className='border-[2px] border-[#00000035] rounded-md outline-none py-2 px-2 w-full text-xs' ref={emailRef}readOnly={button === "sign-up" ? true: false}></input>
                        </div>
                        {
                            button === "sign-up" ?
                                <input required placeholder='OTP' className='border-[2px] border-[#00000035] rounded-md outline-none py-2 px-1 w-full text-xs' ref={otpRef}></input> : ""
                        }

                        {
                            button === "get-otp" ?
                                <button disabled={loading} className='bg-blue-600 text-white p-1 py-[6px] rounded-md text-sm font-semibold cursor-pointer' onClick={getOtp} type='submit'>
                                    {
                                        loading ? 
                                        <ImSpinner9 size={20} className='mx-auto animate-spin' /> :
                                        "Get OTP"
                                    }
                                    </button> :

                                <button disabled={loading} className='bg-blue-600 text-white p-1 py-[6px] rounded-md text-sm font-semibold cursor-pointer' onClick={signUp} type='submit'>
                                    {
                                        loading ? 
                                        <ImSpinner9 size={20} className='mx-auto animate-spin' /> :
                                        "Sign Up"

                                    }
                                    </button>
                        }

                        <p className='text-xs text-center'>Already have an Account?? <Link to="/auth/signin" className='text-blue-500'>Sign in</Link></p>
                    </div>
                </form>
                <img src='/authImage.jpg' className='h-110 w-90 rounded-md object-cover hidden md:block'></img>
            </div>
        </div>
    )
}

export default Register
