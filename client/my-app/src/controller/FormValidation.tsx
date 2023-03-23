import { object, string } from "yup";

const SingupvalidationSchema = object({
    name: string().min(5).max(25).required("Please Enter Name"),
    email: string().email('Invalid email').required('Please Enter Email'),
    password: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please Enter Password'),
});
const LoginvalidationSchema = object({
    email: string().email('Invalid email').required('Please Enter Email'),
    password: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please Enter Password'),
});

export { SingupvalidationSchema, LoginvalidationSchema }