import logo from '../../images/logowhite.png'

const Footer = () => {
    return (
        <div className="bg-blend-color bg-black w-screen h-96">
            <div className="w-[1440px] flex mx-auto h-96 justify-between">
                <div className='mt-5 w-1/4'>
                    <div>
                        <img src={logo} alt="logo"  className='w-40 cursor-pointer'/>
                    </div>
                    <div className='text-gray-300 mt-4'>Secure, Transparent, and Blockchain-Powered Platform for Trusted Document Verification.</div>
                </div>
                <div>
                <div className='mt-5 flex flex-col'>
                <div className='flex flex-col gap-2'>
                <span className='text-gray-500 font-semibold'>Solutions</span> 
                <ul className='text-gray-300 space-y-2 text-sm '>
                <li><a href="#">Document Verification</a></li>
                <li><a href="#">Identity Authentication</a></li>
                <li><a href="#">API Integrations</a></li>
                <li><a href="#">Enterprise Solutions</a></li>
                </ul> 
                </div>  
                <div className='mt-5 flex flex-col gap-2'>
                <span className='text-gray-500 font-semibold'>Resources</span> 
                <ul className='text-gray-300 space-y-1.5 text-sm'>
                <li><a href="#">How AuthenX Works</a></li>
                <li><a href="#">Blog & Insights</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">FAQ</a></li>
                </ul> 
                </div>  
                </div>

                </div>
                <div>
                <div className='mt-5 flex flex-col'>
                <div className='flex flex-col gap-2'>
                <span className='text-gray-500 font-semibold'>Developers</span> 
                <ul className='text-gray-300 space-y-2 text-sm '>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">Integration Guides</a></li>
                <li><a href="#">SDKs & Tools</a></li>
                <li><a href="#">Open Source Contributions</a></li>
                </ul> 
                </div>  
                <div className='mt-5 flex flex-col gap-2'>
                <span className='text-gray-500 font-semibold'>Company</span> 
                <ul className='text-gray-300 space-y-1.5 text-sm'>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                </ul> 
                </div>  
                </div>

                </div>
                <div>
                <div className='mt-5 flex flex-col'>
                <div className='flex flex-col gap-2'>
                <span className='text-gray-500 font-semibold'>Legal</span> 
                <ul className='text-gray-300 space-y-2 text-sm '>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Compliance</a></li>
                </ul> 
                </div>  
                <div className='mt-5 flex flex-col gap-2'>
                <span className='text-gray-500 font-semibold'>Contact</span> 
                <ul className='text-gray-300 space-y-1.5 text-sm'>
                <li><a href="#">📧 Email: support@authenx.com</a></li>
                <li><a href="#">🐦 Twitter: @AuthenXHQ</a></li>
                <li><a href="#">💼 LinkedIn: linkedin.com/company/authenx</a></li>
                <li><a href="#">🌐 Website: www.authenx.org</a></li>
                </ul> 
                </div>  
                </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;