
import image from '../../images/heroleft.png'
import Button from './Button';
const HeroSection = () => {
    return (
        <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto flex justify-between p-2 ">
            <div className='flex flex-col items-start justify-center pl-20 mt-26 mb-10'>
            <span className="flex justify-center cursor-pointer items-center rounded-3xl border-1 border-[#343434] px-1.5 gap-1 text-[#343434] h-12 2xl:mt-25 mt-22 hover:shadow-md hover:shadow-blue-500">
                <span className='bg-blue-500 h-9 text-white font-semibold flex items-center justify-start rounded-3xl pl-2 pr-2'>Blockchain-Powered </span>Solution for Secure, Verified Certificates Worldwide
                <span className='text-blue-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                </span>
            </span>
            <h1 className="text-6xl 2xl:text-7xl font-bold text-black mt-12 gap-2.5 flex flex-col items-start">
            <div className=" border-slate-900 dark:border-white">
            Verify any document,
            </div>
            <div className="text-5xl 2xl:text-6xl mt-3 gap-2 flex">
            <div className='text-black'>Anywhere ,</div><span className='text-white bg-black rounded-md px-0.5'>Instantly.</span> 
            </div>
            <div className='text-gray-500 text-base 2xl:text-xl mt-4 2xl:mt-5 w-[70%] '>
                AuthenX uses blockchain to make academic, legal, and professional documents tamper-proof and easy to verify across institutions
            </div>
            </h1>
            <div className='flex items-start mt-9 ml-1 gap-7'>
                <Button variant="primary" size="lg" className="before:bg-white  outline-blue-400 flex gap-2 items-center">
                Get Started
                </Button>
                <Button variant="secondary" size="lg" className="before:bg-blue-500  outline-blue-400 flex gap-2 items-center">
                Learn More
                </Button>
            </div>
            </div>
            
            <div className='flex flex-col justify-start items-center mt-38 pr-20 '>
                <img className='max-w-lg 2xl:max-w-2xl' src={image} alt="hero" />
            </div>

        </div>
    )
}
export default HeroSection;