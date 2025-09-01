import axios from 'axios';
import { useRef, useState } from 'react'
import { PiSpinnerBold } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { ImSpinner9 } from "react-icons/im";
import toast from 'react-hot-toast';

type Button = "get-otp" | "sign-in";

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [button, setButton] = useState<Button>("get-otp");
    const emailRef = useRef<HTMLInputElement | null>(null);
    const otpRef = useRef<HTMLInputElement | null>(null);


    const getOpt = () => {
        setLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRef.current && !emailRegex.test(emailRef.current?.value)) {
            toast.error("Invalid email");
            setLoading(false);
            return
        }
        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/auth/get/signin/otp`, { email: emailRef.current?.value }, { withCredentials: true })
            .then((response) => {
                toast.success(response.data.message);
                setLoading(false);
                setButton("sign-in");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setLoading(false);

            })
    }

    const signIn = () => {
        setLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRef.current?.value || !emailRegex.test(emailRef.current.value)) {
            toast.error("Invalid email");
            setLoading(false); // loading off
        }
        
        console.log(emailRef.current?.value);
        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify/signin/otp`, { email: emailRef.current?.value, otp: otpRef.current?.value }, { withCredentials: true })
            .then((response) => {
                toast.success(response.data.message);
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/get/user`, { withCredentials: true })
                    .then((response) => {
                        dispatch(setUser(response.data.data.user));
                        setLoading(false);
                        navigate("/dashboard");
                    })
                    .catch();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

            });
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center '>
            <div className=' rounded-2xl p-2 flex flex-row md:border-[1px] md:border-[#00000070] '>
                <form className=''>
                    <h1 className='flex items-center gap-1  justify-center md:justify-start mt-2 md:mt-1 font-bold '>
                        <PiSpinnerBold color='#155dfc' size={20} />
                        HD
                    </h1>
                    <div className='p-8 flex flex-col gap-3 w-80 sm:w-100'>
                        <div className=' flex flex-col gap-1 mb-2 items-center sm:items-start bg'>
                            <h2 className='text-2xl font-bold'>Sign in</h2>
                            <p className='text-xs'>Please login to continue to your account</p>
                        </div>


                        <div className='relative '>
                            <label className='absolute text-[12px] bg-white m-0 p-0 px-[7px] top-[-10px] left-[7px]'>Email</label>
                            <input required type='email' className='border-[2px] border-[#00000035] rounded-md outline-none py-2 px-2 w-full text-xs' ref={emailRef} readOnly={button === "sign-in" ? true: false}></input>
                        </div>

                        {
                            button === "sign-in" ?
                                <div>
                                    <input required placeholder='OTP' className='border-[2px] border-[#00000035] rounded-md outline-none py-2 px-1 w-full text-xs' type="number" ref={otpRef}></input>
                                    <p className='text-blue-600 underline text-sm mt-2'>Resent OTP</p>
                                </div> : ""
                        }
                        {
                            button === "get-otp" ?
                                <button disabled={loading} className='bg-blue-600 text-white p-1 py-[6px] rounded-md text-sm font-semibold cursor-pointer' onClick={getOpt} type='submit'>
                                    {
                                        loading ?
                                            <ImSpinner9 size={20} className='mx-auto animate-spin' /> :
                                            "Get OTP"
                                    }
                                </button> :
                                button === "sign-in" ?
                                    <button disabled={loading} className='bg-blue-600 text-white p-1 py-[6px] rounded-md text-sm font-semibold cursor-pointer' onClick={signIn} type='submit'>
                                        {
                                            loading ?
                                                <ImSpinner9 size={20} className='mx-auto animate-spin' /> :
                                                "Sign in"
                                        }
                                    </button> : ""
                        }

                        <p className='text-xs text-center mt-3'>Need an account?? <Link to="/auth/signup" className='text-blue-500'>Create one</Link></p>
                    </div>
                </form>
                <img src='/authImage.jpg' className='h-110 w-90 rounded-md object-cover hidden md:block'></img>
            </div>
        </div>
    )
}

export default Login
