import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "", // Changed to experienceLevel
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#d5dbdb', minHeight: '100vh' }}>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form
                    onSubmit={submitHandler}
                    className='py-4 px-8 max-w-4xl w-full bg-white border border-gray-100 rounded-lg shadow-lg' // Adjusted padding
                >

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number" // Changed to number type for salary
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Select onValueChange={(value) => setInput({ ...input, jobType: value })}>
                                <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40">
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Select onValueChange={(value) => setInput({ ...input, experience: value })}>
                                <SelectTrigger className="w-full border border-gray-300 rounded-md hover:shadow-lg hover:shadow-indigo-500/40">
                                    <SelectValue placeholder="Select Experience Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Entry-Level">Entry-Level</SelectItem>
                                        <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                                        <SelectItem value="Senior-Level">Senior-Level</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 focus-visible:border-indigo-500 my-1 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div>
                                    <Label>Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full border border-gray-300 rounded-md hover:shadow-lg hover:shadow-indigo-500/40">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem key={company._id} value={company.name.toLowerCase()}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-500/40">
                                Post New Job
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default PostJob;
