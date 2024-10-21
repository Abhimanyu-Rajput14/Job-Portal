import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full-Stack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="bg-white p-10" style={{ backgroundColor: '#d5dbdb' }}>{/* Apply background and padding to the container */}
            <h2 className="text-4xl font-bold text-center mb-8 text-[#59c1d3]">Explore Categories</h2>
            <Carousel className="w-full max-w-4xl mx-auto" style={{ maxHeight: '200px' }}>
                <CarouselContent>
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={index} className="flex justify-center">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="bg-white border border-[#F83002] shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg px-4 py-2 text-lg font-semibold text-[#4a1205] hover:bg-[#1b41294e] hover:text-white transform hover:scale-105"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition duration-300" style={{ width: '40px', height: '40px' }} />
                <CarouselNext className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition duration-300" style={{ width: '40px', height: '40px' }} />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
