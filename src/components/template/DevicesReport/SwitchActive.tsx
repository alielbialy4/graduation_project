import useMutate from "@hooks/useMutate"
import SwitchField from "@molecules/formik-field/SwitchField"
import { Form, Formik } from "formik"

const SwitchActive = ({id, isActive, roomId, name}: {
     id: number | string,
     isActive: boolean,
     roomId: any,
     name: string
}) => {
     const { mutate} = useMutate({
          endpoint: `user/devices`,
          mutationKey: ["user/devices"],
          onSuccess: (data) => {
               console.log("Success: ", data)
          },
          onError: (error) => {
               console.error("Error: ", error)
          },
     })

     return (
          <div>
               <Formik
                    initialValues={
                         {
                              switch: Number(isActive) === 1 ? true : false,
                         }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                         console.log("Form values: ", values)
                    }}
               >
                    <Form>
                         <SwitchField
                              name="switch"
                              color="blue"
                              disabled={false}
                              onChange={(checked) => {
                                   mutate({ id: id, is_active: checked ? 1 : 0, room_id: roomId, name: name })
                              }}
                         />
                    </Form>
               </Formik>
          </div>
     )
}

export default SwitchActive