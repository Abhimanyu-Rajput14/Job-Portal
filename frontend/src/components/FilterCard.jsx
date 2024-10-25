import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location", // Corrected typo
        array: ["Delhi", "Noida", "Gurugram", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Kolkata", "Chennai"]
    },
    {
        filterType: "Job Role",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: [
            { label: "0-3 Lakhs", value: [0, 3] },
            { label: "3-5 Lakhs", value: [3, 5] },
            { label: "5 Lakhs and above", value: [5, Infinity] }
        ]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        if (Array.isArray(selectedValue)) {
            // Send the selected salary range to the Redux store
            dispatch(setSearchedQuery({ type: "salary", range: selectedValue }));
        } else {
            dispatch(setSearchedQuery(selectedValue));
        }
    }, [selectedValue, dispatch]);

    return (
        <div style={{ backgroundColor: '#d5dbdb', minHeight: '100vh', paddingTop: '2rem' }}>
            <div className='max-w-7xl mx-auto p-4'>
                <div className='w-full bg-white p-5 rounded-md shadow-lg'>
                    <h1 className='font-bold text-xl'>Filter Jobs</h1>
                    <hr className='mt-3 mb-5' />
                    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                        {filterData.map((data, index) => (
                            <div key={index}>
                                <h1 className='font-bold text-lg mb-3'>{data.filterType}</h1>
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item.value || item} id={itemId} />
                                            <Label htmlFor={itemId}>{item.label || item}</Label>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
