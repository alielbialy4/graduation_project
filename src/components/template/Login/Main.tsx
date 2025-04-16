import { Button, Group, Text } from "@mantine/core";
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash, FaTwitter } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import useMutate from "@hooks/useMutate";
import showNotification from "@utils/notify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "src/Store/userAthe";
import { AppDispatch } from "src/Store";

const LoginMain = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const dispatch = useDispatch<AppDispatch>();
     const navigate = useNavigate();

     const validationSchema = Yup.object({
          email: Yup.string().email("Invalid email address").required("Email is required"),
          password: Yup.string().required("Password is required"),
     });

     const { mutate } = useMutate<any>({
          endpoint: "user/login",
          mutationKey: ["user/login"],
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

     const initialValues = {
          email: "",
          password: "",
     };

     const onSubmit = (values: any) => {
          setLoading(true);
          mutate({
               email: values.email,
               password: values.password,
          });
     };

     return (
          <div className="relative">
               <Link to="/" className="text-purple-700 cursor-pointer absolute top-10 left-10 flex items-center gap-2">
                    <FaArrowLeft className="text-2xl" />
                    <span className="text-lg">Back</span>
               </Link>
               <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                         <div className="text-center mb-6">
                              <h2 className="text-3xl font-semibold mb-4 text-purple-700">Log in with:</h2>
                              <Group className="flex justify-center gap-5">
                                   <FaFacebook className="text-blue-600 text-2xl cursor-pointer" />
                                   <FaGoogle className="text-red-500 text-2xl cursor-pointer" />
                                   <FaTwitter className="text-blue-400 text-2xl cursor-pointer" />
                              </Group>
                         </div>

                         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                              {() => (
                                   <Form className="space-y-4">
                                        <div className="flex flex-col gap-4">
                                             <div>
                                                  <Field name="email" type="email" placeholder="Email.." className="border rounded-md p-2 h-12 w-full" />
                                                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                             </div>
                                             <div className="relative">
                                                  <Field
                                                       name="password"
                                                       type={showPassword ? "text" : "password"}
                                                       placeholder="Password.."
                                                       className="border rounded-md p-2 h-12 w-full"
                                                  />
                                                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
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

                                        <Button
                                             type="submit"
                                             className="bg-purple-700 text-white hover:bg-purple-800 p-2 flex justify-center w-full rounded-lg text-xl"
                                             loading={loading}
                                        >
                                             {loading ? "Submitting..." : "Submit"}
                                        </Button>
                                   </Form>
                              )}
                         </Formik>

                         <Text className="mt-4 text-gray-600">
                              I don't have an account.. <Link to="/sign-up" className="text-blue-600 cursor-pointer">Sign up</Link>
                         </Text>
                    </div>
               </div>
          </div>
     );
};

export default LoginMain;