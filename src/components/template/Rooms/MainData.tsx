import useMutate from "@hooks/useMutate";
import { Button } from "@mantine/core";
import BaseInputField from "@molecules/formik-field/BaseInputField";
import showNotification from "@utils/notify";
import { Form, Formik } from "formik"
import { useState } from "react"



const MainData = ({ row, setModalOpen, setData, refetch }: any) => {
     const [loading, setLoading] = useState<boolean>(false);
     const { mutate } = useMutate({
          endpoint: "user/rooms",
          mutationKey: ["user/rooms"],
          method: "post",
          onSuccess: () => {
               refetch();
               setModalOpen(false);
               setLoading(false);
               setData && setData({});
               showNotification("Room add success", "success")
          },
          onError: () => {
               showNotification("error", "error")
               setLoading(false);
          },
          formData: true,
     })

     const { mutate: update } = useMutate({
          endpoint: `user/rooms/${row.id}`,
          mutationKey: [`user/rooms/${row.id}`],
          method: "put",
          onSuccess: () => {
               refetch();
               setModalOpen(false);
               setLoading(false);
               setData && setData({});
          },
          onError() {
               showNotification("error", "error")
               setLoading(false);
          },
     })

     const handleSubmit = (values: any) => {
          setLoading(true);
          const dataToSend = {
               ...values,
          };
          row.id ? update(dataToSend) : mutate(dataToSend);
     }

     return (
          <div className="h-full p-10">
               <Formik
                    initialValues={{
                         name: row?.name || "",
                    }}
                    onSubmit={(values) => handleSubmit(values)}
               >
                    {({ handleSubmit }) => (
                         <Form onSubmit={handleSubmit}>
                              <div className="grid grid-cols-1 gap-4 mt-5">
                                   <BaseInputField name="name" type="text" label={"Name"} required />
                              </div>
                              <Button
                                   className="mt-4"
                                   color="#10b981"
                                   loading={loading}
                                   disabled={loading}
                                   type="submit"
                              >
                                   {row.id ? "Update" : "Create"}
                              </Button>
                              <Button
                                   className="mt-4 mx-2"
                                   variant="outline"
                                   color="#10b981"
                                   onClick={() => setModalOpen(false)}
                                   disabled={loading}
                              >
                                   {"Cancel"}
                              </Button>
                         </Form>
                    )}
               </Formik>
          </div>
     )
}

export default MainData