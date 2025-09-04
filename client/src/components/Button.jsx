

const Button = ({children , variant , size , onClick , className}) => {

    const variants = {
        primary : "bg-blue-500 text-white hover:bg-white hover:text-blue-500",
        secondary : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white "
    };
    const sizes = {
        sm : "px-3 py-1 text-sm" ,
        md : "px-5 py-2 text-base" ,
        lg : "px-7 py-3 text-lg"
    };

    return (
      <button className={`rounded-lg font-medium cursor-pointer outline-2 overflow-hidden transition-all duration-1000 ease-in-out hover:scale-110 
        before:content-[''] before:absolute before:left-[-50px] before:top-0
        before:h-full before:w-0 before:-skew-x-12 
        before:-z-10 before:transition-all before:duration-1000
        hover:before:w-[250%] ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
        {children}
      </button>
    )
}

export default Button;