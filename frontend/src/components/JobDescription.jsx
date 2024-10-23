import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-4 mt-2'>
                        <Badge className='text-blue-700 font-bold bg-blue-100' variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className='text-red-700 font-bold bg-red-100' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-purple-700 font-bold bg-purple-100' variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-4 py-2 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 text-white'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className='border-b-2 border-gray-300 text-lg font-medium py-4 mt-6'>Job Details</h1>

            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <h1 className='font-bold text-gray-700 mb-2'>Role:</h1>
                    <p className='text-gray-600'>{singleJob?.title}</p>
                </div>

                <div>
                    <h1 className='font-bold text-gray-700 mb-2'>Location:</h1>
                    <p className='text-gray-600'>{singleJob?.location || 'Not Specified'}</p>
                </div>

                <div>
                    <h1 className='font-bold text-gray-700 mb-2'>Experience Level:</h1>
                    <p className='text-gray-600'>{singleJob?.experienceLevel ? `${singleJob?.experienceLevel}` : 'Not Specified'}</p>
                </div>

                <div>
                    <h1 className='font-bold text-gray-700 mb-2'>Salary:</h1>
                    <p className='text-gray-600'>{singleJob?.salary} LPA</p>
                </div>

                <div>
                    <h1 className='font-bold text-gray-700 mb-2'>Total Applicants:</h1>
                    <p className='text-gray-600'>{singleJob?.applications?.length || '0'}</p>
                </div>

                <div>
                    <h1 className='font-bold text-gray-700 mb-2'>Posted Date:</h1>
                    <p className='text-gray-600'>{singleJob?.createdAt?.split("T")[0] || 'Unknown'}</p>
                </div>

                <div>
                    <h1 className='font-bold text-gray-700 mb-2'>Description:</h1>
                    <p className='text-gray-600'>{singleJob?.description || 'No description provided.'}</p>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
