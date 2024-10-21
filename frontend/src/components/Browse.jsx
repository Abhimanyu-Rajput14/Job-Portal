import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div style={{ backgroundColor: '#d5dbdb', minHeight: '100vh' }}>
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="font-bold text-2xl mb-6 text-center">
                    Search Results ({allJobs.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    ) : (
                        <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-600">
                            No jobs found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Browse;
