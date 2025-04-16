import { Menu } from "@mantine/core";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import useMutate from "@hooks/useMutate";

interface DeleteMainProps {
     id: any;
     refetch: any;
}

const DeleteMain = ({ id, refetch }: DeleteMainProps) => {
     const { mutate } = useMutate({
          endpoint: `user/devices/${id}`,
          mutationKey: ["user/devices"],
          method: "delete",
          onSuccess: () => {
               Swal.fire({
                    title: "deleted!",
                    text: "The item has been deleted successfully.",
                    icon: "success",
                    background: "#fff",
                    color: "#000",
               }); refetch();
          },
     })

     const handleDelete = () => {
          Swal.fire({
               title: "Are you sure?",
               text: "Are you sure you want to delete this item?",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d33",
               cancelButtonColor: "#3085d6",
               confirmButtonText: "Yes, delete it!",
               cancelButtonText: "No, cancel!",
               background: "#fff",
               color: "#000",
          }).then((result) => {
               if (result.isConfirmed) {
                    mutate({});
               }
          });
     };

     return (
          <Menu.Item
               onClick={handleDelete}
               leftSection={<BiTrash size={20} />}
               color="red"
               className="!duration-300"
          >
               <p className="text-base">Delete</p>
          </Menu.Item>
     );
};

export default DeleteMain;
