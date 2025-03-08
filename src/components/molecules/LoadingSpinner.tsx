import { Loader } from "@mantine/core"

const LoadingSpinner = ({color, className}: {
     color?: string
     className?: string
}) => {
     return (
          <div className={`flex justify-center items-center h-screen dark:bg-darkLight bg-lightDark ${className}`}>
               <Loader
                    height={400}
                    width={400}
                    color={color || "#875a7b"}                   
               />
          </div>
     )
}

export default LoadingSpinner