import { Button, Group, Text } from '@mantine/core';
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash, FaTwitter } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';

const LoginMain = () => {
     const [showPassword, setShowPassword] = useState(false);

     // Validation Schema using Yup
     const validationSchema = Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().required('Password is required'),
          terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
     });

     // Initial Values for Formik
     const initialValues = {
          email: '',
          password: '',
          terms: false,
     };

     // Handle Form Submission
     // @ts-expect-error
     const onSubmit = (values, { setSubmitting }) => {
          console.log('Form values:', values);
          setSubmitting(false);
          // Add your login logic here
     };

     return (
          <div className='relative'>
               <Link to="/" className="text-purple-700 cursor-pointer absolute top-10 left-10 flex items-center gap-2">
                    <FaArrowLeft className="text-2xl" />
                    <span className='text-lg'>
                         Back
                    </span>
               </Link>
               <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                         {/* Login with Social Icons */}
                         <div className="text-center mb-6">
                              <h2 className="text-3xl font-semibold mb-4 text-purple-700">Log in with:</h2>
                              <Group className="flex justify-center gap-5">
                                   <FaFacebook className="text-blue-600 text-2xl cursor-pointer" />
                                   <FaGoogle className="text-red-500 text-2xl cursor-pointer" />
                                   <FaTwitter className="text-blue-400 text-2xl cursor-pointer" />
                              </Group>
                         </div>

                         {/* Formik Form */}
                         <Formik
                              initialValues={initialValues}
                              validationSchema={validationSchema}
                              onSubmit={onSubmit}
                         >
                              {({ isSubmitting, errors, touched }) => (
                                   <Form className="space-y-4">
                                        <div className='flex flex-col gap-4'>
                                             {/* Email Input */}
                                             <div>
                                                  <Field
                                                       name="email"
                                                       type="email"
                                                       placeholder="Email.."
                                                       className="border rounded-md p-2 h-12 w-full"
                                                  />
                                                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                             </div>

                                             {/* Password Input */}
                                             <div className='relative'>
                                                  <Field
                                                       name="password"
                                                       type={showPassword ? "text" : "password"}
                                                       placeholder="Password.."
                                                       className="border rounded-md p-2 h-12 w-full"
                                                  />
                                                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />

                                                  {/* Toggle Password Visibility */}
                                                  {showPassword ? (
                                                       <FaRegEyeSlash
                                                            className="absolute top-[35%] right-3 text-gray-500 cursor-pointer"
                                                            onClick={() => setShowPassword(false)}
                                                       />
                                                  ) : (
                                                       <FaRegEye
                                                            className="absolute top-[35%] right-3 text-gray-500 cursor-pointer"
                                                            onClick={() => setShowPassword(true)}
                                                       />
                                                  )}
                                             </div>
                                        </div>

                                        {/* Terms & Conditions Checkbox */}
                                        <div className="flex items-center">
                                             <Field type="checkbox" name="terms" className="mr-2" />
                                             <Text className="text-sm">I have read and agreed to the terms</Text>
                                        </div>
                                        <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />

                                        {/* Submit Button */}
                                        <Button
                                             type="submit"
                                             className="bg-purple-700 text-white hover:bg-purple-800 p-2 flex justify-center w-full rounded-lg text-xl"
                                             disabled={isSubmitting}
                                        >
                                             {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </Button>
                                   </Form>
                              )}
                         </Formik>

                         {/* Sign Up Link */}
                         <Text className="mt-4 text-gray-600">
                              I don't have an account.. <Link to="/sign-up" className="text-blue-600 cursor-pointer">Sign up</Link>
                         </Text>
                    </div>
               </div>
          </div>
     );
};

export default LoginMain;
