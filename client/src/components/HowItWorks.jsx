import loginimage from "../../images/HowItWorks/login.png"
import uploadimage from "../../images/HowItWorks/upload.png"
import blockchainimage from "../../images/HowItWorks/BVerify.png"
import happyimg from "../../images/HowItWorks/happy.png"
import { useRef, useState } from "react"

const HowItWorksCard = ({cardNo , image , heading , subheading}) => {
    return (
        <div className="min-w-80 h-96 shadow-2xl bg-white rounded-xl flex flex-col items-center p-4">
            <span className="text-blue-500 text-xl font-bold w-7 h-7 rounded-full outline-2 outline-blue-500 flex justify-center items-center">{cardNo}</span>
            <div className="max-w-45 h-45 flex justify-center items-center">{image}</div>
            <span className="text-xl mt-2 text-black font-bold">{heading}</span>
            <span className="text-base mt-2 text-black text-center">{subheading}</span>
        </div>
    )
}

const HowItWorksData = [
    {cardNo : "1" , image : <img src={loginimage} alt="login" /> , heading : "Connect Wallet" , subheading : "Start by connecting your MetaMask wallet to AuthenX. This ensures secure access and links your identity with blockchain verification."},
    {cardNo : "2" , image : <img className="w-45 h-40" src={uploadimage} alt="upload" /> , heading : "Upload Document" , subheading : "Upload your digital document directly to the platform for verification."} ,
    {cardNo : "3" , image : <img src={blockchainimage} alt="verify" /> , heading : "Blockchain Verification" ,  subheading : "AuthenX matches the document’s unique digital fingerprint (hash) with blockchain records to ensure authenticity."},
    {cardNo : "4" , image : <img src={happyimg} alt="happy" /> , heading : "Instant Results" , subheading : "Get immediate confirmation of your document’s authenticity, ensuring trust and protection from fraud"}
]
const HowItWorksOrgData = [
    {cardNo : "1" , image : <img src={loginimage} alt="login" /> , heading : "Connect Wallet" , subheading : "Start by connecting your MetaMask wallet to AuthenX. This ensures secure access and links your identity with blockchain verification."},
    {cardNo : "2" , image : <img className="w-45 h-40" src={uploadimage} alt="upload" /> , heading : "Upload Document" , subheading : "Upload your digital document directly to the platform for verification."} ,
    {cardNo : "3" , image : <img src={blockchainimage} alt="verify" /> , heading : "Blockchain Verification" ,  subheading : "AuthenX matches the document’s unique digital fingerprint (hash) with blockchain records to ensure authenticity."},
    {cardNo : "4" , image : <img src={happyimg} alt="happy" /> , heading : "Instant Results" , subheading : "Get immediate confirmation of your document’s authenticity, ensuring trust and protection from fraud"},
     {cardNo : "4" , image : <img src={happyimg} alt="happy" /> , heading : "Instant Results" , subheading : "Get immediate confirmation of your document’s authenticity, ensuring trust and protection from fraud"},
]


const HowItWorks = () => {
    const carouselUserRef = useRef(null);
    const carouselOrgRef = useRef(null);
    const cardWidth = 340;
    const [activeUserIndex , setActiveUserIndex] = useState(2);
    const [activeOrgIndex, setActiveOrgIndex] = useState(2);  

    const handleNext = (ref , setActive , active , length) => {
        if(ref.current){
            ref.current.scrollBy({left : cardWidth , behavior : "smooth"});
            setActive(Math.min(active+1 , length-1));
        }
    }
    const handlePrev = (ref , setActive , active ) => {
        if(ref.current){
            ref.current.scrollBy({left: -cardWidth , behavior : "smooth"});
            setActive(Math.max(active-1 , 0));
        }
    }
    return (
        <div className="w-full bg-blue-500 flex justify-center">
            <div className="w-[1440px] 2xl:w-[1800px] flex flex-col items-center">
            <div className="flex flex-col items-center">
            <span className="mt-4 text-white text-5xl font-bold">How AuthenX Works ??</span>
            <span className="mt-3 text-white text-xl w-2/3 text-center">Tailored solutions for individuals verifying documents and organizations issuing and managing them with blockchain-powered trust.</span>
            <span className="mt-6 text-3xl text-white font-bold">For End Users</span>
            </div>
            <div className="text-white flex justify-center items-center max-w-[1440px] mt-10 pl-20 pr-20">
                <div className="flex justify-center pr-15">
                <button onClick={() => handlePrev(carouselUserRef , setActiveUserIndex , activeUserIndex )}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
                <div ref={carouselUserRef} className="flex gap-5 max-w-[1120px] overflow-hidden">
                    {HowItWorksData.map((data , index) => (
                    <HowItWorksCard
                    key={data.cardNo + index}
                    cardNo={data.cardNo}
                    image={data.image}
                    heading={data.heading}
                    subheading={data.subheading} />
                ))}
                </div>
                <div className="flex justify-center pl-15">
                <button onClick={() => handleNext(carouselUserRef , setActiveUserIndex , activeUserIndex , HowItWorksData.length)} className="flex justify-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
            {HowItWorksData.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeUserIndex ? "bg-black" : "bg-white"
              }`}
            ></span>
          ))}
            </div>
            <div className=" mt-6 text-3xl text-white font-bold">For Organizations</div>
            <div className="text-white flex justify-center items-center max-w-[1440px] mt-10 pl-20 pr-20 ">
                <div className="flex justify-center pr-15">
                <button onClick={() => handlePrev(carouselOrgRef , setActiveOrgIndex ,activeOrgIndex)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
                <div ref={carouselOrgRef} className="flex gap-5 max-w-[1120px] overflow-hidden">
                    {HowItWorksOrgData.map((data , index) => (
                    <HowItWorksCard
                    key={data.cardNo + index}
                    cardNo={data.cardNo}
                    image={data.image}
                    heading={data.heading}
                    subheading={data.subheading} />
                ))}
                </div>
                <div className="flex justify-center pl-15">
                <button onClick={() => handleNext(carouselOrgRef , setActiveOrgIndex , activeOrgIndex , HowItWorksOrgData.length)} className="flex justify-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
            </div>
             <div className="flex justify-center gap-1.5 mt-4 mb-10">
            {HowItWorksOrgData.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeOrgIndex ? "bg-black" : "bg-white"
              }`}
            ></span>
          ))}
            </div>
            </div>
        </div>
    )
}

export default HowItWorks;