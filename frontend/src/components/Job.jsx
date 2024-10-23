import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Function to calculate how many days ago the job was posted
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    // Function to truncate job description
    const truncateDescription = (description, length) => {
        return description?.length > length ? description.substring(0, length) + '...' : description;
    };

    // Toggle bookmark functionality
    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <div className='p-5 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 md:max-w-lg w-full'>
            <div className='flex items-center justify-between mb-2'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button
                    variant="outline"
                    className={`rounded-full p-2 hover:bg-gray-100 transition-colors duration-300 ${isBookmarked ? 'bg-yellow-400' : ''}`}
                    size="icon"
                    onClick={toggleBookmark}>
                    <Bookmark color={isBookmarked ? 'yellow' : 'black'} />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-2'>
                <Avatar className="w-12 h-12">
                    <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} Logo`} />
                </Avatar>
                <div>
                    <h1 className='font-semibold text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location || "Location not specified"}</p>
                </div>
            </div>

            <div className='mt-3'>
                <h1 className='font-bold text-xl text-gray-800'>{job?.title}</h1>
                {/* <p className='text-sm text-gray-600 mt-2'>
                    {truncateDescription(job?.description, 80)}
                    {job?.description?.length > 80 && <span className="text-blue-500 cursor-pointer ml-1">Read more</span>}
                </p> */}
            </div>

            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-blue-700 font-semibold bg-blue-100' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-red-600 font-semibold bg-red-100' variant="ghost">{job?.experienceLevel}</Badge>
                <Badge className='text-purple-700 font-semibold bg-purple-100' variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-3 mt-5'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors duration-300">
                    Open Details
                </Button>
            </div>
        </div>
    );
};

export default Job;
