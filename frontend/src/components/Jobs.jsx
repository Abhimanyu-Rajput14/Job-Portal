import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [filterJobs, setFilterJobs] = useState(allJobs);

    const handleClearFilter = () => {
        dispatch(setSearchedQuery(null)); // Clears the searchedQuery state in Redux
    };

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                // Check if the searchedQuery is for salary
                if (typeof searchedQuery === 'object' && searchedQuery.type === "salary") {
                    const [min, max] = searchedQuery.range; // Destructure min and max from the range
                    return job.salary >= min && (max === Infinity ? true : job.salary <= max);
                } else {
                    // Other filters (location, industry, etc.)
                    return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchedQuery.toLowerCase());
                }
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-1/5">
                        <FilterCard />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-5">
                            <h1 className="font-bold text-xl">Filter Jobs</h1>
                            <button
                                onClick={handleClearFilter}
                                className="text-purple-700 bg-purple-100 px-3 py-1 rounded-md shadow hover:bg-purple-200 transition"
                            >
                                Clear Filter
                            </button>
                        </div>
                        {
                            filterJobs.length <= 0 ? (
                                <div className="flex items-center justify-center h-[88vh]">
                                    <motion.span
                                        className="text-xl text-gray-600 font-semibold bg-red-100 p-4 rounded-md shadow-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        Sorry, no jobs match your criteria. Please try a different search!
                                    </motion.span>
                                </div>
                            ) : (
                                <div className="h-[88vh] overflow-y-auto pb-5">
                                    <div className="grid grid-cols-3 gap-4">
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}
                                                >
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
