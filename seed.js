import mongoose from 'mongoose';
import { Job } from './backend/models/job.model.js'; // Update with the correct path to your job model

const MONGO_URI = 'mongodb+srv://abhimanyuraj59:Glxm9Ac33zqwF2aJ@cluster0.cxbew.mongodb.net/test'; // Your MongoDB URI

const removeAllJobs = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log('Connected to MongoDB!');

    await Job.deleteMany({});
    // console.log('All previous jobs removed successfully!');
  } catch (error) {
    console.error('Error removing data:', error);
  } finally {
    await mongoose.disconnect();
    // console.log('Disconnected from MongoDB!');
  }
};
// removeAllJobs();

const dummyJobs = [
  // Jobs for Company 1
  {
    title: 'Frontend Developer',
    description: 'Develop web interfaces using React.js.',
    requirements: ['Proficient in React.js', 'Experience with Redux', 'Good understanding of CSS/HTML'],
    salary: 8, // Salary in LPA (Lakhs per annum)
    experienceLevel: 'Mid-Level',
    location: 'Bangalore, India',
    jobType: 'Full-Time',
    position: 1,
    company: '67154d822cb42ac3f5b9f0d9', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },
  {
    title: 'Backend Developer',
    description: 'Design scalable backend systems using Node.js.',
    requirements: ['Proficient in Node.js', 'Experience with MongoDB', 'Familiarity with REST APIs'],
    salary: 12,
    experienceLevel: 'Senior-Level',
    location: 'Delhi, India',
    jobType: 'Full-Time',
    position: 2,
    company: '67154d822cb42ac3f5b9f0d9', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },
  {
    title: 'Full Stack Developer',
    description: 'Build full stack web applications using MERN stack.',
    requirements: ['Proficient in React.js and Node.js', 'Familiarity with MongoDB and Express'],
    salary: 10,
    experienceLevel: 'Mid-Level',
    location: 'Hyderabad, India',
    jobType: 'Full-Time',
    position: 3,
    company: '67154d822cb42ac3f5b9f0d9', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },

  // Jobs for Company 2
  {
    title: 'DevOps Engineer',
    description: 'Manage CI/CD pipelines and infrastructure.',
    requirements: ['Experience with AWS', 'Proficient in Docker and Kubernetes', 'Strong scripting skills'],
    salary: 14,
    experienceLevel: 'Senior-Level',
    location: 'Noida, India',
    jobType: 'Full-Time',
    position: 1,
    company: '67154ec41a7837c212542f8c', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },
  {
    title: 'Cloud Architect',
    description: 'Design and implement cloud-based solutions.',
    requirements: ['Experience with AWS or Azure', 'Understanding of cloud architectures', 'Strong problem-solving skills'],
    salary: 18,
    experienceLevel: 'Senior-Level',
    location: 'Kolkata, India',
    jobType: 'Full-Time',
    position: 2,
    company: '67154ec41a7837c212542f8c', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },
  {
    title: 'Graphic Designer',
    description: 'Create visual content for digital marketing.',
    requirements: ['Proficient in Adobe Suite', 'Creative mindset', 'Portfolio required'],
    salary: 6,
    experienceLevel: 'Entry-Level',
    location: 'Ahmedabad, India',
    jobType: 'Full-Time',
    position: 3,
    company: '67154ec41a7837c212542f8c', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },

  // Additional Jobs
  {
    title: 'Mobile App Developer',
    description: 'Build mobile apps using React Native.',
    requirements: ['Proficient in React Native', 'Experience with mobile app development', 'Strong problem-solving skills'],
    salary: 11,
    experienceLevel: 'Mid-Level',
    location: 'Bangalore, India',
    jobType: 'Full-Time',
    position: 1,
    company: '67154d822cb42ac3f5b9f0d9', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },
  {
    title: 'Database Administrator',
    description: 'Manage databases and ensure data integrity.',
    requirements: ['Experience with SQL and NoSQL databases', 'Database administration experience', 'Attention to detail'],
    salary: 13,
    experienceLevel: 'Senior-Level',
    location: 'Delhi, India',
    jobType: 'Full-Time',
    position: 2,
    company: '67154ec41a7837c212542f8c', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },
  {
    title: 'Business Analyst',
    description: 'Analyze business processes and recommend improvements.',
    requirements: ['Experience with business analysis', 'Strong analytical skills', 'Familiar with data modeling'],
    salary: 10,
    experienceLevel: 'Mid-Level',
    location: 'Hyderabad, India',
    jobType: 'Full-Time',
    position: 3,
    company: '67154ec41a7837c212542f8c', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },

  // More dummy job data
  {
    title: 'Software Tester',
    description: 'Conduct software testing and create test cases.',
    requirements: ['Experience in software testing', 'Knowledge of automation tools', 'Strong attention to detail'],
    salary: 7,
    experienceLevel: 'Mid-Level',
    location: 'Chennai, India',
    jobType: 'Full-Time',
    position: 4,
    company: '67154d822cb42ac3f5b9f0d9', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  },
  {
    title: 'Security Engineer',
    description: 'Monitor and secure IT infrastructure.',
    requirements: ['Knowledge of cybersecurity principles', 'Experience with firewalls and security tools', 'Strong attention to detail'],
    salary: 15,
    experienceLevel: 'Senior-Level',
    location: 'Bangalore, India',
    jobType: 'Full-Time',
    position: 5,
    company: '67154ec41a7837c212542f8c', // Updated company ID
    created_by: '67154d402cb42ac3f5b9f0d1', // Updated recruiter ID
  }
];

const insertJobs = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log('Connected to MongoDB!');

    await Job.insertMany(dummyJobs);
    // console.log('new jobs inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await mongoose.disconnect();
    // console.log('Disconnected from MongoDB!');
  }
};
insertJobs();
