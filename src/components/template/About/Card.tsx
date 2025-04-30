const Card = ({
     title,
     description,
     imageUrl,
     altText,
     className = "w-full h-full",
     onClick,
     onMouseEnter,
     onMouseLeave,
     onFocus,
     onBlur,
     onKeyDown,
}: {
     title: string;
     description: string;
     imageUrl: string;
     altText: string;
     className?: string;
     onClick?: () => void;
     onMouseEnter?: () => void;
     onMouseLeave?: () => void;
     onFocus?: () => void;
     onBlur?: () => void;
     onKeyDown?: (event: React.KeyboardEvent) => void;
}) => {
     return (
          <div
               className={`flex flex-col items-center justify-center p-4 rounded-lg ${className}`}
               onClick={onClick}
               onMouseEnter={onMouseEnter}
               onMouseLeave={onMouseLeave}
               onFocus={onFocus}
               onBlur={onBlur}
               onKeyDown={onKeyDown}
               role="button"
               tabIndex={0}
          >
               <img src={imageUrl} alt={altText} className="w-full h-auto rounded-3xl mb-4" />
               <h2 className="text-xl font-semibold text-gray-300">{title}</h2>
               <p className="text-gray-400">{description}</p>
          </div>
     );
}

export default Card;
