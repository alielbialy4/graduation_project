import Card from './Card'
import homeBG from '/public/assets/home-login.png'

const AboutMain = () => {
     return (
          <div
               className="relative bg-cover bg-[center_-5rem] min-h-screen px-5 pt-28"
               style={
                    {
                         backgroundImage: `url(${homeBG})`
                    }
               }
          >
               <div className='container mx-auto flex flex-col justify-center gap-5'>
                    <h1 className="text-4xl max-w-[50%] font-bold text-gray-400">
                         the team how worked on this project and the time and energy on it.
                    </h1>

                    <div className='flex items-center gap-5 mt-24'>
                         <Card
                              title="John Doe"
                              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                              imageUrl="https://placehold.co/500x600"
                              altText="John Doe"
                              className="w-1/4 h-1/4"
                              onClick={() => console.log("Card clicked")}
                         />
                         <Card
                              title="Jane Smith"
                              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                              imageUrl="https://placehold.co/500x600"
                              altText="Jane Smith"
                              className="w-1/4 h-1/4"
                              onClick={() => console.log("Card clicked")}
                         />
                         <Card
                              title="Alice Johnson"
                              description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                              imageUrl="https://placehold.co/500x600"
                              altText="Alice Johnson"
                              className="w-1/4 h-1/4"
                              onClick={() => console.log("Card clicked")}
                         />
                         <Card
                              title="Bob Brown"
                              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                              imageUrl="https://placehold.co/500x600"
                              altText="Bob Brown"
                              className="w-1/4 h-1/4"
                              onClick={() => console.log("Card clicked")}
                         />
                         <Card
                              title="Charlie Black"
                              description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
                              imageUrl="https://placehold.co/500x600"
                              altText="Charlie Black"
                              className="w-1/4 h-1/4"
                              onClick={() => console.log("Card clicked")}
                         />
                    </div>
               </div>
          </div>
     )
}

export default AboutMain