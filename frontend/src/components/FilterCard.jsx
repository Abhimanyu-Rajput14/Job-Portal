import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Noida", "Gurugram", "Bangalore", "Hyderabad", "Pune"]
    },
    {
        filterType: "Job Role",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: [
            { label: "1-4 LPA", min: 0, max: 4 },
            { label: "5-9 LPA", min: 5, max: 9 },
            { label: "10-14 LPA", min: 10, max: 14 },
            { label: "15+ LPA", min: 15 }
        ]
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        location: '',
        jobRole: '',
        salary: ''
    });
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const clearFilters = () => {
        setSelectedFilters({ location: '', jobRole: '', salary: '' });
        dispatch(setSearchedQuery(''));  // Reset search query in Redux
    };

    useEffect(() => {
        if (selectedFilters.salary) {
            const salaryFilter = filterData.find(filter => filter.filterType === 'Salary');
            const selectedSalary = salaryFilter?.array.find(item => item.label === selectedFilters.salary);
            
            if (selectedSalary) {
                dispatch(setSearchedQuery({
                    type: 'salary',
                    min: selectedSalary.min,
                    max: selectedSalary.max
                }));
            }
        } else if (selectedFilters.location || selectedFilters.jobRole) {
            const query = selectedFilters.location || selectedFilters.jobRole;
            dispatch(setSearchedQuery(query));  // Dispatch location or job role as search query
        }
    }, [selectedFilters, dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className='max-w-7xl mx-auto px-4'>
                <div className='w-full bg-white p-6 rounded-md shadow-lg'>
                    <h1 className='font-bold text-2xl text-gray-800'>Filter Jobs</h1>
                    <hr className='mt-3 mb-6' />
                    
                    {/* Location Dropdown */}
                    <div className='mb-4'>
                        <label className='block mb-2 font-semibold text-lg text-gray-700'>Location</label>
                        <select
                            className='w-full p-2 border rounded-md'
                            value={selectedFilters.location}
                            onChange={(e) => changeHandler('location', e.target.value)}
                        >
                            <option value="">Select Location</option>
                            {filterData[0].array.map((location, idx) => (
                                <option key={idx} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>

                    {/* Job Role Dropdown */}
                    <div className='mb-4'>
                        <label className='block mb-2 font-semibold text-lg text-gray-700'>Job Role</label>
                        <select
                            className='w-full p-2 border rounded-md'
                            value={selectedFilters.jobRole}
                            onChange={(e) => changeHandler('jobRole', e.target.value)}
                        >
                            <option value="">Select Job Role</option>
                            {filterData[1].array.map((role, idx) => (
                                <option key={idx} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Salary Dropdown */}
                    <div className='mb-4'>
                        <label className='block mb-2 font-semibold text-lg text-gray-700'>Salary (LPA)</label>
                        <select
                            className='w-full p-2 border rounded-md'
                            value={selectedFilters.salary}
                            onChange={(e) => changeHandler('salary', e.target.value)}
                        >
                            <option value="">Select Salary Range</option>
                            {filterData[2].array.map((salary, idx) => (
                                <option key={idx} value={salary.label}>{salary.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Clear Filter Button */}
                    <div className="text-center">
                        <button
                            className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition'
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
