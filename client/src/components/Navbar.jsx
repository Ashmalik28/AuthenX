import logo from "../../images/AuthenXLogo.png"
import Button from "./Button"
import { RiAdminFill } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";


const NavbarItem = ({title , classprops}) => {
    return (
        <li className={`mx-4 cursor-pointer hover ${classprops}`}>
            {title}
        </li>
    )
}
const DropdownItem = ({title , subtitle , classprops , icon}) => {
    return (
        <li className={`px-2 py-2 m-3 cursor-pointer group/item hover:bg-gray-100 flex items-center gap-4 rounded-xl transition-colors duration-200 ${classprops}`}>
          <span className="bg-gray-100 group-hover/item:text-blue-500 group-hover/item:bg-white transition duration-200 ease-in-out p-5 rounded-lg">
            {icon}
          </span> 
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-medium group-hover/item:text-blue-500">{title}</span>
            <span className="text-sm text-[#566072]">{subtitle}</span> 
          </div> 
        </li>
    )
}

const services = [
  { title: "Register as Admin", subtitle: "Manage platform access & oversee document workflows" ,icon: <RiAdminFill size={20} /> },
  { title: "Register as Organization" , subtitle: "Get verified to issue trusted blockchain documents" , icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
  </svg>
 },
  { title: "Issue Document", subtitle: "Create and publish tamper-proof certificates" , icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
  <path fill-rule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
 </svg>
},
  { title: "Help & Support", subtitle: "Get assistance with registration, issuing, or verification" , icon: <MdSupportAgent size={20} />},
];


const Navbar = () => {
    return (
       <nav className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto flex justify-between items-center mt-4 ">
        <div className="flex-initial pl-20 justify-center items-center">
            <img src={logo} alt="AuthenXLogo" className="w-40 cursor-pointer" />
        </div>
        <ul className="flex text-[#343434] list-none flex-row justify-between items-center flex-initial font-medium text-base">
            {["Home"].map((item , index)=> (
                <NavbarItem key={item + index} title={item} classprops={`hover:text-blue-500`} />
            ))}
            <li className="mx-4 relative group cursor-pointer hover:text-blue-500">
              <button className="flex items-center justify-center gap-1.5 ">
                Services
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 transition-transform duration-300 group-hover:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <ul className="absolute left-0 mt-2 top-full w-125 text-black scale-95 group-hover:scale-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out bg-white shadow-lg z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex-col border border-gray-300 rounded-2xl">
              {services.map((service, index) => (
              <DropdownItem
               key={service.title + index}
               title={service.title}
               icon={service.icon}
               subtitle={service.subtitle}
              />
               ))}

              </ul>
            </li>
            {["Verify","Dashboard" , "About" ].map((item , index)=> (
                <NavbarItem key={item + index} title={item} classprops={`hover:text-blue-500`} />
            ))}
        </ul>
        <div className="pr-20">
            <Button variant="primary" size="md" className="before:bg-white  outline-blue-400 flex gap-2 items-center">
                Connect
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                </svg>

            </Button>
        </div>
       </nav>
    )

}

export default Navbar;