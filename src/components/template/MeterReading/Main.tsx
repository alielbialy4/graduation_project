import { useState } from 'react';
import Swal from 'sweetalert2';
import homeBG from '/public/assets/home-login.png';
import { FaCamera } from 'react-icons/fa';

const MeterReadingMain = () => {
     const [meterReading, setMeterReading] = useState('');
     const [photo, setPhoto] = useState(null);

     const handlePhotoUpload = (event: any) => {
          const file = event.target.files[0];
          if (file) {
               setPhoto(URL.createObjectURL(file));
          }
     };

     const handleSubmit = (e: any) => {
          e.preventDefault();
          console.log('Meter Reading:', meterReading);
          console.log('Uploaded Photo:', photo);
          // Show success message
          Swal.fire({
               title: 'Success!',
               text: 'Saved successfully!',
               icon: 'success',
               confirmButtonText: 'OK'
          });
     };

     return (
          <div className="bg-cover bg-center min-h-screen flex items-center justify-center text-white px-4 py-20 md:py-0"
               style={{ backgroundImage: `url(${homeBG})` }}>
               <div className="container mx-auto h-screen flex flex-col justify-center relative">
                    <div className="text-start md:max-w-3xl max-w-[300px] w-full">
                         <p className="md:text-5xl text-2xl font-bold text-violet-800 capitalize">
                              this is the page where you add the last meter reading and we calculate the usage of electricity for you
                         </p>
                         <p className="text-gray-100 mt-10 text-2xl md:text-xl sm:text-lg capitalize">
                              please add the last meter reading number here.
                         </p>
                    </div>
                    <div className="p-8 rounded-lg w-full max-w-xl">
                         <form onSubmit={handleSubmit} className="space-y-4">
                              <input
                                   type="number"
                                   value={meterReading}
                                   onChange={(e) => setMeterReading(e.target.value)}
                                   placeholder="12345678"
                                   className="w-full p-3 border rounded-full text-black text-lg"
                                   required
                              />
                              <label className="flex flex-col sm:flex-row items-center justify-center gap-3 cursor-pointer text-purple-300">
                                   <div className="bg-purple-700 p-4 rounded-full">
                                        <FaCamera className="text-2xl" />
                                   </div>
                                   <span className="text-xl capitalize">Insert a photo</span>
                                   <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                              </label>
                              {photo && <img src={photo} alt="Uploaded Preview" className="mt-4 max-h-32 max-w-full mx-auto rounded" />}
                              <button
                                   type="submit"
                                   className="bg-purple-700 hover:bg-purple-800 text-white p-3 w-32 rounded-full text-lg absolute md:bottom-10 bottom-3 right-10">
                                   Submit
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default MeterReadingMain;
