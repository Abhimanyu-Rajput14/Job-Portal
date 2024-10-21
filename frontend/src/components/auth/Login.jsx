import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import {
    LoadCanvasTemplate,
    loadCaptchaEnginge,
    validateCaptcha
} from 'react-simple-captcha';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        loadCaptchaEnginge(6);
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div style={{ backgroundColor: '#d5dbdb', minHeight: '100vh' }}>
            <Navbar />
            <div className='flex items-center justify-center w-full my-9'>
                <form
                    onSubmit={submitHandler}
                    className='py-4 px-6 max-w-lg w-full bg-white border border-gray-100 rounded-lg shadow-lg'
                >
                    <h1 className='font-bold text-xl text-center mb-5'>Login</h1> {/* Centered Login text */}

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                        />
                    </div>

                    <div className='flex flex-col items-center justify-center my-4'> {/* Centering radio buttons */}
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <LoadCanvasTemplate />
                    <Input
                        type="text"
                        id="user_captcha_input"
                        placeholder="Enter Captcha"
                        className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                    />

                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40">
                            Login
                        </Button>
                    )}

                    <span className='text-sm'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-blue-600'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
