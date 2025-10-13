import React from 'react'


const Contact = () => {
  return (
    <div className='text-white mt-28 w-screen flex flex-col items-center gap-20'>
      <div className='h-[75vh] w-[80vw] grid grid-cols-9 '>
        <div className='col-span-5 col-start-1 border-2 border-r-2 border-yellow-500 shadow-[0_0_10px_2px_rgba(234,179,8,0.6)] rounded-l-[15%] h-full flex flex-col justify-center p-5 gap-5'>
          <h1 className='text-7xl font-extrabold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent'>CONTACT US</h1>
          <p className='ml-3 text-gray-300 text-xl font-medium'>Tell us about your vision, challenges you're facing or a new project idea, or just say hi. We would love to hear you out!</p>
          <div className='ml-3 flex flex-col gap-2'>
            <div className='flex gap-2'>
            <p className='text-gray-300 text-md font-medium'>For admin related info, contact </p>
            <p className='text-yellow-600 font-semibold'>Sivanesan: 412509129502</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-300 text-md font-medium'>For technical info, contact </p>
            <p className='text-yellow-600 font-semibold'>Arjun B K: 412509129502</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-300 text-md font-medium'>For facility related info, contact </p>
            <p className='text-yellow-600 font-semibold'>Alan Prakash: 412509129502</p>
          </div>

          <div className="pt-5 flex items-center gap-5 w-1/2"> <a href="" target="_blank" rel="noopener noreferrer"> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"> <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/> <rect width="4" height="12" x="2" y="9"/> <circle cx="4" cy="4" r="2"/> </svg> </a> <a href="" target="_blank" rel="noopener noreferrer"> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"> <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/> <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/> <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/> </svg> </a> <a href="" target="_blank" rel="noopener noreferrer" className='flex gap-2 items-center'> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-icon lucide-map-pin"> <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/> <circle cx="12" cy="10" r="3"/> </svg> <p className='text-[#808181] whitespace-nowrap' style={{fontWeight: 700}}>SCIEnT, NIT Trichy</p> </a> </div>


          </div>
        </div>  
        <div className='col-start-6 col-span-full border-2 border-l-transparent border-yellow-500 shadow-[0_0_10px_2px_rgba(234,179,8,0.6)]  bg-[#0E121E] rounded-r-[15%] h-full flex flex-col p-5 gap-4'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl text-yellow-500'>What's your name?</h2>
            <input
              className="bg-transparent border-b-2 border-b-gray-500 placeholder:font-mono placeholder-gray-500 placeholder:text-md placeholder:font-medium focus:border-b-yellow-500 outline-none delay-150 transition-colors"
              placeholder="Alan Prakash"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl text-yellow-500'>What's your email?</h2>
            <input
              className="bg-transparent border-b-2 border-b-gray-500 placeholder:font-mono placeholder-gray-500 placeholder:text-md placeholder:font-medium focus:border-b-yellow-500 outline-none delay-150 transition-colors"
              placeholder="Alan_Prakash@gmail.com"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl text-yellow-500'>Subject</h2>
            <input
              className="bg-transparent border-b-2 border-b-gray-500 placeholder:font-mono placeholder-gray-500 placeholder:text-md placeholder:font-medium focus:border-b-yellow-500 outline-none delay-150 transition-colors"
              placeholder="Idea to transform..."
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl text-yellow-500'>What do you want to tell us?</h2>
            <textarea
              className="bg-transparent border-2 border-gray-500 rounded-lg placeholder:font-mono placeholder-gray-500 placeholder:text-md placeholder:font-medium focus:border-yellow-500 outline-none delay-150 transition-colors p-3"
              placeholder="Hey! I'd love to ask you about..."
            ></textarea>
          </div>
          <div className='w-full flex justify-center'>
            <button className='rounded-full w-1/2 bg-yellow-500 text-gray-500'>Submit</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Contact