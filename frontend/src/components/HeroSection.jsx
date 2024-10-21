import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    };

    return (
        <div
            className='text-center bg-cover bg-center py-24'
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className='flex flex-col gap-5 my-10 p-6'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-300 text-[#F83002] font-medium shadow-md'>
                    Discover Your Next Opportunity
                </span>
                <h1 className='text-5xl font-bold text-[#8240d3eb]'>
                    Unleash Your Potential: <br />
                    Find and Land Your <span className='text-[#b61f08]'>Dream Job</span>
                </h1>
                <p className='text-[#ffffffe8]'>
                    Join thousands of professionals who have transformed their careers. Start your journey to success today!
                </p>
                <div className='flex w-[90%] md:w-[40%] shadow-lg border border-gray-200 rounded-full items-center gap-0 mx-auto transition-transform duration-300 hover:scale-105 h-12'>
                    <input
                        type="text"
                        placeholder='What job are you looking for?'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-4 py-2 rounded-l-full h-full'
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] text-white transition-colors duration-300 hover:bg-[#5b30a6] h-full"
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
