import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                let matchesLocation = true;
                let matchesJobRole = true;
                let matchesSalary = true;

                // Filter by Location
                if (searchedQuery.location) {
                    matchesLocation = job.location.toLowerCase() === searchedQuery.location.toLowerCase();
                }

                // Filter by Job Role
                if (searchedQuery.jobRole) {
                    matchesJobRole = job.title.toLowerCase() === searchedQuery.jobRole.toLowerCase();
                }

                // Filter by Salary
                if (searchedQuery.salary) {
                    const jobSalary = job.salary || 0;
                    const selectedSalaryRange = filterData[2].array.find(salaryRange => salaryRange.label === searchedQuery.salary);
                    if (selectedSalaryRange) {
                        matchesSalary = jobSalary >= selectedSalaryRange.min && 
                                        (selectedSalaryRange.max ? jobSalary <= selectedSalaryRange.max : true);
                    }
                }

                return matchesLocation && matchesJobRole && matchesSalary;
            });

            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <div className='flex-1 flex items-center justify-center'>
                                <h2 className="text-3xl font-bold text-red-600">
                                    Oops! We couldn't find any jobs matching your criteria.
                                </h2>
                            </div>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;
