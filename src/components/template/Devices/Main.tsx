import CustomTable from "@molecules/table/CustomTable"
import { Button, Menu } from "@mantine/core";
import { Divider } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import useFetch from "@hooks/useFetchData";
import ModalComponent from "@molecules/Modal"
import { useState } from "react";
import MainData from "./MainData";
import DeleteMain from "./DeleteMain";
import homeBG from '/public/assets/home-login.png'
import { BiShow } from "react-icons/bi";
import SwitchActive from "@tamplate/DevicesReport/SwitchActive";

const ModeratorsMain = () => {
     const [modalOpen, setModalOpen] = useState(false);
     const [ShowModalOpen, setShowModalOpen] = useState(false);
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
               accessorKey: "room",
               header: "Room",
               cell: (info: { row: { original: any } }) => info.row.original.room.name || "N/A",
          },
          {
               accessorKey: "created_at",
               header: "Created At",
               cell: (info: { row: { original: any } }) => info.row.original.created_at,
          },
          {
               header: "is Active",
               cell: ({ row }: { row: { original: { id: number; is_active: boolean; room?: { id: number; name: string } } } }) => {
                    return (
                         <div className="flex items-center gap-2">
                              <SwitchActive
                                   id={row?.original?.id}
                                   isActive={row?.original?.is_active}
                                   roomId={row?.original?.room?.id}
                                   name={row?.original?.room?.name || "N/A"}
                              />
                         </div>
                    );
               },
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
                              <Menu.Item
                                   onClick={() => {
                                        setShowModalOpen(true)
                                        setData(row.original);
                                   }}
                                   leftSection={<BiShow size={22} />}
                                   className="text-black hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 !duration-300 !w-full"
                              >
                                   <p className="text-base">
                                        Show
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
          endpoint: `user/devices`,
          queryKey: ["user/devices"]
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
                         Add Devices
                    </Button>
               </div>
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

               <ModalComponent
                    isOpen={ShowModalOpen}
                    onClose={() => { setShowModalOpen(false); setData({}) }}
                    title={"Show Device"}
               >
                    {/* show data */}
                    <div className="grid grid-cols-2 gap-2 mt-5">
                         <p className="text-sm font-semibold">Name: {dataToEdit?.name}</p>
                         <p className="text-sm font-semibold">Room: {dataToEdit?.room?.name}</p>
                         <p className="text-sm font-semibold">Measure: {Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111} K.W</p>
                         <p className="text-sm font-semibold">Created At: {dataToEdit?.created_at}</p>

                    </div>
               </ModalComponent>

          </div>
     )
}

export default ModeratorsMain