import CustomTable from "@molecules/table/CustomTable"
import { data } from "./data"

const ModeratorsMain = () => {
     const columns = [
          {
               accessorKey: "id",
               header: "#",
               cell: (info: { row: { original: any } }) => info.row.original.id,
          },
          {
               accessorKey: "deviceName",
               header: "Device Name",
               cell: (info: { row: { original: any } }) => info.row.original.deviceName,
          },
          {
               accessorKey: "deviceState",
               header: "Device State",
               cell: (info: { row: { original: any } }) => info.row.original.deviceState,
          },
          {
               accessorKey: "place",
               header: "Place",
               cell: (info: { row: { original: any } }) => info.row.original.place,
          },
     ]

     return (
          <div className="relative mt-20 px-5">
               <CustomTable
                    isLoading={false}
                    isSuccess={true}
                    columns={columns}
                    data={data}
               />
          </div>
     )
}

export default ModeratorsMain