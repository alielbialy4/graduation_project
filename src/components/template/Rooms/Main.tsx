import CustomTable from "@molecules/table/CustomTable"
import { Button, Menu } from "@mantine/core";
import { Divider } from "@mantine/core";
import DeleteMain from "./DeleteMain";
import { BsThreeDots } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import useFetch from "@hooks/useFetchData";
import ModalComponent from "@molecules/Modal"
import { useState } from "react";
import MainData from "./MainData";
import homeBG from '/public/assets/home-login.png'

const RoomsMain = () => {
     const [modalOpen, setModalOpen] = useState(false);
     const [dataToEdit, setData] = useState<any>({});

     const columns = [
          {
               accessorKey: "id",
               header: "#",
               cell: (info: { row: { original: any } }) => info.row.original.id,
          },
          {
               accessorKey: "name",
               header: "Name",
               cell: (info: { row: { original: any } }) => info.row.original.name,
          },
          {
               accessorKey: "created_at",
               header: "Created At",
               cell: (info: { row: { original: any } }) => info.row.original.created_at,
          },
          {
               header: "Actions",
               accessorKey: "actions",
               cell: ({ row }: { row: { original: { id: string; name: string; created_at: string } } }) => (
                    <Menu shadow="md" width={200}>
                         <Menu.Target>
                              <Button className="!bg-[#10b981] !px-3">
                                   <BsThreeDots size={22} />
                              </Button>
                         </Menu.Target>
                         <Menu.Dropdown
                              className="dark:!bg-darkLight !flex !flex-col !items-start !justify-center"
                         >
                              <Menu.Item
                                   onClick={() => {
                                        setModalOpen(true)
                                        setData(row.original);
                                   }}
                                   leftSection={<BiEdit size={22} />}
                                   className="text-black hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 !duration-300 !w-full"
                              >
                                   <p className="text-base">
                                        Edit
                                   </p>
                              </Menu.Item>
                              <Divider my="sm" label="Danger Zone" labelPosition="center" color="dark" />
                              <DeleteMain id={row.original.id} refetch={refetch} />
                         </Menu.Dropdown>
                    </Menu>
               ),
          },
     ]

     const { data, isLoading, isError, error, refetch } = useFetch<any>({
          endpoint: `user/rooms`,
          queryKey: ["rooms"]
     })

     return (
          <div className="relative bg-cover bg-[center_-5rem] min-h-screen px-5 pt-28"
               style={
                    {
                         backgroundImage: `url(${homeBG})`
                    }
               }
          >
               {/* add button */}
               <div className="flex items-center justify-end px-5 mb-5">
                    <Button className="!bg-[#10b981] !px-3"
                         radius={"md"}
                         onClick={() => {
                              setModalOpen(true)
                         }}
                    >
                         <IoIosAddCircleOutline className="mx-2" />
                         Add Room
                    </Button>
               </div>

               {/* table */}
               <CustomTable
                    isLoading={isLoading}
                    isSuccess={true}
                    // @ts-ignore
                    columns={columns}
                    data={data?.result?.data || []}
                    isError={isError}
                    errorMessage={(error as any)?.response?.data?.message || "Failed to load data."}
               />
               <ModalComponent
                    isOpen={modalOpen}
                    onClose={() => { setModalOpen(false); setData({}) }}
                    title={dataToEdit?.id ? "Edit" : "Add"}
               >
                    <MainData row={dataToEdit} setData={setData} setModalOpen={setModalOpen} refetch={refetch} />
               </ModalComponent>

          </div>
     )
}

export default RoomsMain