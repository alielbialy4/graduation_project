import { Button, Group, Text } from '@mantine/core';
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash, FaTwitter } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import useMutate from "@hooks/useMutate";
import showNotification from "@utils/notify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "src/Store/userAthe";
import { AppDispatch } from "src/Store";

const SignUpMain = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const dispatch = useDispatch<AppDispatch>();
     const navigate = useNavigate();

     const { mutate } = useMutate<any>({
          endpoint: "user/register",
          mutationKey: ["user/register"],
          onSuccess: (data) => {
               const token = data?.result?.data?.token;
               setLoading(false);
               if (token) {
                    Cookies.set("access_token", token, { expires: 1 });
                    dispatch(fetchUserProfile(token));
                    dispatch({ type: "auth/setIsLogIn", payload: true });
                    navigate("/", { replace: true });
                    showNotification("Logged in successfully", "success");
               }
          },
          onError: () => {
               setLoading(false);
          },
     });

     // Validation Schema using Yup
     const validationSchema = Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          first_name: Yup.string().required('First Name is required'),
          last_name: Yup.string().required('Last Name is required'),
          password: Yup.string().required('Password is required'),
          // @ts-ignore
          confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
          terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
     });

     // Initial Values for Formik
     const initialValues = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password: '',
          terms: false,
     };

     // Handle Form Submission
     // @ts-expect-error
     const onSubmit = (values) => {
          setLoading(true)
          mutate(
               {
                    first_name: values?.first_name,
                    last_name: values?.last_name,
                    email: values?.email,
                    password: values?.password,
                    password_confirmation: values?.confirm_password
               }
          )
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
                              {() => (
                                   <Form className="space-y-4">
                                        <div className='flex flex-col gap-4'>
                                             <div>
                                                  <Field
                                                       name="first_name"
                                                       type="text"
                                                       placeholder="First Name.."
                                                       className="border rounded-md p-2 h-12 w-full"
                                                  />
                                                  <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
                                             </div>

                                             <div>
                                                  <Field
                                                       name="last_name"
                                                       type="text"
                                                       placeholder="Last Name.."
                                                       className="border rounded-md p-2 h-12 w-full"
                                                  />
                                                  <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
                                             </div>

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
                                             <div className='relative'>
                                                  <Field
                                                       name="confirm_password"
                                                       type={showPassword ? "text" : "password"}
                                                       placeholder="Confirm Password.."
                                                       className="border rounded-md p-2 h-12 w-full"
                                                  />
                                                  <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-sm mt-1" />

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
                                        <div className="flex items-center justify-center">
                                             <Field type="checkbox" name="terms" className="mr-2" />
                                             <Text className="text-sm">I have read and agreed to the terms</Text>
                                        </div>
                                        <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />

                                        {/* Submit Button */}
                                        <Button
                                             type="submit"
                                             className="bg-purple-700 text-white hover:bg-purple-800 p-2 flex justify-center w-full rounded-lg text-xl"
                                             loading={loading}
                                        >
                                             {loading ? 'Submitting...' : 'Submit'}
                                        </Button>
                                   </Form>
                              )}
                         </Formik>

                         {/* Sign Up Link */}
                         <Text className="mt-4 text-gray-600">
                              already have an account.. <Link to="/login" className="text-blue-600 cursor-pointer">Sign in</Link>
                         </Text>
                    </div>
               </div>
          </div>
     );
};

export default SignUpMain;
