import React from "react";

const Contact = () => {
  return (
    <div className='text-white mt-10 laptop:mt-24 mb-24 w-full flex flex-col items-center px-4 mobile:px-6 laptop:px-12'>
      <div className='w-full max-w-6xl grid grid-cols-1 laptop:grid-cols-2 gap-8 laptop:gap-0 items-stretch'>
        {/* Left Card - Info */}
        <div className="
          w-full
          border-2 border-yellow-500
          shadow-[0_0_15px_2px_rgba(234,179,8,0.4)]
          bg-[#0A0D16]
          rounded-2xl laptop:rounded-r-none laptop:rounded-l-3xl
          flex flex-col justify-between p-6 mobile:p-8 gap-6
        ">
          <div className="flex flex-col gap-4">
            <h1 className='text-3xl mobile:text-4xl laptop:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent'>
              CONTACT US
            </h1>
            <p className='text-gray-300 text-sm mobile:text-base laptop:text-lg font-medium leading-relaxed'>
              Tell us about your vision, challenges you're facing or a new project idea, or just say hi. We would love to hear you out!
            </p>
          </div>

          <div className='flex flex-col gap-3 py-2'>
            <div className='flex flex-wrap items-center gap-1.5 text-xs mobile:text-sm laptop:text-base'>
              <span className='text-gray-300 font-medium'>For admin related info, contact:</span>
              <span className='text-yellow-500 font-semibold'>Sivanesan (9092559610)</span>
            </div>
            <div className='flex flex-wrap items-center gap-1.5 text-xs mobile:text-sm laptop:text-base'>
              <span className='text-gray-300 font-medium'>For technical info, contact:</span>
              <span className='text-yellow-500 font-semibold'>Arjun B K (8610450988)</span>
            </div>
            <div className='flex flex-wrap items-center gap-1.5 text-xs mobile:text-sm laptop:text-base'>
              <span className='text-gray-300 font-medium'>For facility related info, contact:</span>
              <span className='text-yellow-500 font-semibold'>Alan (9360845683), Alok (7408092857)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center gap-6"> 
            <a href="https://www.linkedin.com/company/scientnitt/mycompany/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg> 
            </a> 
            <a href="https://www.instagram.com/scient_nitt/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg> 
            </a>
            <a href="#map" className='flex gap-2 items-center hover:opacity-80 transition-opacity' aria-label="Location"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg> 
              <span className='text-sm laptop:text-base text-gray-300 font-semibold'>SCIEnT, NIT Trichy</span> 
            </a> 
          </div>
        </div>  

        {/* Right Card - Form */}
        <div className="
          w-full
          border-2 border-yellow-500 laptop:border-l-0
          shadow-[0_0_15px_2px_rgba(234,179,8,0.4)]
          bg-[#0E121E]
          rounded-2xl laptop:rounded-l-none laptop:rounded-r-3xl
          flex flex-col justify-between p-6 mobile:p-8 gap-5
        ">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div className='flex flex-col gap-1.5'>
              <label className='text-lg font-semibold text-yellow-500'>Name</label>
              <input
                type="text"
                aria-label="Name"
                className="bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 text-sm mobile:text-base focus:border-yellow-500 outline-none py-1.5 transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-lg font-semibold text-yellow-500'>Email</label>
              <input
                type="email"
                aria-label="Email"
                className="bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 text-sm mobile:text-base focus:border-yellow-500 outline-none py-1.5 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-lg font-semibold text-yellow-500'>Subject</label>
              <input
                type="text"
                aria-label="Subject"
                className="bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 text-sm mobile:text-base focus:border-yellow-500 outline-none py-1.5 transition-colors"
                placeholder="Subject of your message"
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-lg font-semibold text-yellow-500'>What do you want to tell us?</label>
              <textarea
                rows={3}
                aria-label="Message"
                className="bg-transparent border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 text-sm mobile:text-base focus:border-yellow-500 outline-none p-3 transition-colors resize-none"
                placeholder="Hey! I'd love to ask you about..."
              ></textarea>
            </div>
            <div className='w-full flex justify-center pt-2'>
              <button 
                type="submit"
                className='rounded-full w-full mobile:w-2/3 laptop:w-1/2 bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold py-2.5 px-6 transition-all duration-200 shadow-md hover:shadow-yellow-500/50 cursor-pointer'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact;