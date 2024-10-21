import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Noida", "Gurugram", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Kolkata", "Chennai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div style={{ backgroundColor: '#d5dbdb', minHeight: '100vh', paddingTop: '2rem' }}> {/* Applying the background color */}
            <div className='max-w-7xl mx-auto p-4'> {/* Centered and responsive container */}
                <div className='w-full bg-white p-5 rounded-md shadow-lg'>
                    <h1 className='font-bold text-xl'>Filter Jobs</h1>
                    <hr className='mt-3 mb-5' />
                    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                        {fitlerData.map((data, index) => (
                            <div key={index}>
                                <h1 className='font-bold text-lg mb-3'>{data.fitlerType}</h1>
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
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
