import CustomTable from '@molecules/table/CustomTable'
import homeBG from '/public/assets/home-login.png'
import useFetch from '@hooks/useFetchData'
import SwitchActive from './SwitchActive'

const DevicesReportMain = () => {
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
               header: "Measure",
               cell: () => {
                    return (
                         <div className="flex items-center gap-2">
                              {Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111} K.W
                         </div>
                    );
               },
          },
          // active and inactive to
          {
               header: "is_active",
               cell: ({ row }: { row: { original: { id: number; is_active: boolean } } }) => {
                    return (
                         <div className="flex items-center gap-2">
                              <SwitchActive id={row.original.id} isActive={row.original.is_active} />
                         </div>
                    );
               },
          },
     ]

     const { data, isLoading, isError, error } = useFetch<any>({
          endpoint: `user/devices`,
          queryKey: ["user/devices"]
     })

     return (
          <div
               className="relative bg-cover bg-[center_-5rem] min-h-screen px-5 pt-28"
               style={
                    {
                         backgroundImage: `url(${homeBG})`
                    }
               }
          >
               <CustomTable
                    isLoading={isLoading}
                    isSuccess={true}
                    // @ts-ignore
                    columns={columns}
                    data={data?.result?.data || []}
                    isError={isError}
                    errorMessage={(error as any)?.response?.data?.message || "Failed to load data."}
               />
          </div>
     )
}

export default DevicesReportMain