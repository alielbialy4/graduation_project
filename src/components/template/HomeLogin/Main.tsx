import { Button } from '@mantine/core'
import homeBG from '/public/assets/home-login.png'
import { useNavigate } from 'react-router'

const HomeLoginMain = () => {
     const navigate = useNavigate()

     return (
          <div className="bg-cover bg-[center_-5rem] min-h-screen flex items-center justify-center px-5 pt-10"
               style={
                    {
                         backgroundImage: `url(${homeBG})`
                    }
               }>
               <div className="container mx-auto min-h-screen flex flex-col justify-center">
                    {/* welcome section */}
                    <div className='text-start'>
                         <p className="text-5xl font-bold text-white">
                              Hi, Atef!
                         </p>
                         <p className=" text-gray-500 mt-4 text-xl">
                              friday, 12th march 2021
                         </p>
                    </div>
                    {/* tow cards section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:mt-20 mt-10">
                         <div className="bg-gray-400 p-4 rounded-xl relative">
                              <p className="text-6xl font-medium text-violet-900 pb-10 max-w-[500px]">
                                   if u want to add a new meter reading
                              </p>
                              <div className='absolute bottom-5 right-5'>
                                   <Button className="text-white p-2 bg-violet-900 hover:bg-violet-950 duration-300 rounded-xl h-12 w-40 mt-10 text-2xl"
                                   onClick={() => navigate('/meter-reading')}
                                   >
                                        Click here
                                   </Button>
                              </div>
                         </div>

                         <div className="bg-violet-900 p-4 rounded-xl relative">
                              <p className="text-6xl font-medium text-white pb-10 max-w-[500px]">
                                   if u want to see your Devices and the bast readings
                              </p>
                              <div className='flex w-full items-end justify-end'>
                                   <Button className="text-violet-900 p-2 bg-white hover:bg-gray-400 duration-300 rounded-xl h-12 w-40 mt-10 text-2xl"
                                   onClick={() => navigate('/devices')}
                                   >
                                        Click here
                                   </Button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default HomeLoginMain