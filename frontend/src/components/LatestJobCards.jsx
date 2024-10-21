import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { HiLocationMarker, HiOutlineBriefcase } from 'react-icons/hi'; // Importing icons

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-lg shadow-lg bg-white border border-gray-200 transition-transform transform hover:scale-105 cursor-pointer hover:bg-gray-100'
        >
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-xl'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 flex items-center'>
                    <HiLocationMarker className='mr-1' /> India
                </p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-gray-800'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-blue-700 font-bold flex items-center' variant="ghost">
                    <HiOutlineBriefcase className='mr-1' /> {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobCards;
