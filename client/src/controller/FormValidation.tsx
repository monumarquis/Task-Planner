import { object, string } from "yup";

const SingupvalidationSchema = object({
    name: string().min(4, 'Too Short!').max(25).required("Please Enter Name"),
    email: string().email('Invalid email').required('Please Enter Email'),
    password: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please Enter Password'),
});

const LoginvalidationSchema = object({
    email: string().email('Invalid email').required('Please Enter Email'),
    password: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please Enter Password'),
});

const TaskvalidationSchema = object({
    title: string().min(4, 'Too Short!').max(25).required("Please Enter Task Title"),
    sprint: string().required('Please Select Sprint'),
    status: string().required('Please Select status'),
    desc: string().min(2, 'Too Short!').max(250, 'Too Long!').required('Please Enter Desc'),
    assignTo: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please Enter Select assignee'),
});

const sprintvalidationSchema = object({
    title: string().min(4, 'Too Short!').max(25).required("Please Enter Task Title"),
    endDate: string().required('Please Select Start date'),
    desc: string().min(2, 'Too Short!').max(250, 'Too Long!').required('Please Enter Desc'),
    startDate: string().required('Please Select Start date'),
});

export { SingupvalidationSchema, LoginvalidationSchema, TaskvalidationSchema, sprintvalidationSchema }