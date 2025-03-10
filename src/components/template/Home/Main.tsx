import { Button } from '@mantine/core'
import heroBg from '/public/assets/hero-bg.png'
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";

const HomeMain = () => {
     const navigate = useNavigate();
     const isLogIn = useSelector((state: any) => state.auth.isLogIn);

     return (
          <div
               className="bg-cover md:bg-[center_-5rem] h-screen flex items-center justify-center"
               style={
                    {
                         backgroundImage: `url(${heroBg})`
                    }
               }
          >
               <div className='container mx-auto px-5 h-full relative'>
                    <div className='flex flex-col justify-end h-[60%] md:max-w-[530px] max-w-[300px]'>
                         <p className='text-white md:text-7xl text-4xl capitalize font-bold leading-[1.2]'>
                              We are here to save earth energy
                         </p>
                    </div>
                    <div className='absolute bottom-32 right-0 p-4'>
                         <Button className='text-white px-4 py-2 !rounded-xl !bg-emerald-500 font-bold text-xl'
                         size='lg'
                         onClick={() => {
                              navigate(
                                   isLogIn ? "home-login" : "login"
                              )
                         }}
                         >
                              Get started
                         </Button>
                    </div>
               </div>
               {/* stars from react icons */}
               <div className='absolute md:bottom-20 bottom-5 left-0 md:left-32 p-4'>
                    <div className='flex items-center gap-2 text-white'>
                         {[...Array(5)].map((_, index) => (
                              <FaStar key={index} className='text-yellow-500' size={30} />
                         ))}
                         <span className='text-3xl font-bold mx-2'>
                              +250K
                         </span>
                    </div>
               </div>
          </div>
     )
}

export default HomeMain