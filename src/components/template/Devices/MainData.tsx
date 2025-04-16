import useFetch from "@hooks/useFetchData";
import useMutate from "@hooks/useMutate";
import { Button } from "@mantine/core";
import BaseInputField from "@molecules/formik-field/BaseInputField";
import SelectField from "@molecules/formik-field/SelectField";
import showNotification from "@utils/notify";
import { Form, Formik } from "formik"
import { useState } from "react"



const MainData = ({ row, setModalOpen, setData, refetch }: any) => {
     const [loading, setLoading] = useState<boolean>(false);
     const { mutate } = useMutate({
          endpoint: "user/devices",
          mutationKey: ["user/devices"],
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
          endpoint: `user/devices/${row.id}`,
          mutationKey: [`user/devices/${row.id}`],
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

     const endpoint = `user/rooms?limit=1000`;
     const { data } = useFetch<any>({
          queryKey: [endpoint],
          endpoint: endpoint,
     });

     // @ts-ignore
     const dataOptions: Option[] = data?.result?.data?.map((item: any) => ({
          value: item.id,
          label: item.name,
     })) || [];

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
                         room_id: row?.room_id || ""
                    }}
                    onSubmit={(values) => handleSubmit(values)}
               >
                    {({ handleSubmit }) => (
                         <Form onSubmit={handleSubmit}>
                              <div className="grid grid-cols-2 gap-4 mt-5">
                                   <BaseInputField name="name" type="text" label={"Name"} required />
                                   <SelectField
                                        name="room_id"
                                        label="Room"
                                        id="room_id"
                                        options={dataOptions}
                                   />
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