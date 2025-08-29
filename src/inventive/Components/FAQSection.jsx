import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  const faqs = [
    {
      id: 1,
      question: "Who can apply to INVENTIVE?",
      answer: "INVENTIVE is open to all students at NIT Trichy across all disciplines - engineering, technology, design, social sciences, and more. We welcome diverse perspectives and interdisciplinary collaboration."
    },
    {
      id: 2,
      question: "What kind of projects are suitable for INVENTIVE?",
      answer: "We're looking for innovative ideas that address real-world problems. Projects can range from technological solutions and product designs to social impact initiatives and sustainability projects. The key criteria are usefulness, novelty, ethics, and feasibility."
    },
    {
      id: 3,
      question: "Do I need to have a complete idea to apply?",
      answer: "No! Whether you're just starting out with a rough concept or ready to launch a well-developed idea, INVENTIVE provides the resources and mentorship to help you take the next step. We support projects at all stages of development."
    },
    {
      id: 4,
      question: "What support will I receive during the program?",
      answer: "You'll get access to expert faculty guidance, experienced alumni mentors, state-of-the-art tools, dedicated workspace, workshops for skill development, and assistance with patent filing for worthy projects."
    },
    {
      id: 5,
      question: "Is there any cost to participate in INVENTIVE?",
      answer: "INVENTIVE is designed to be accessible to all students. Specific cost details and any available scholarships or funding support will be provided during the registration process."
    },
    {
      id: 6,
      question: "How are projects selected for the program?",
      answer: "Projects are evaluated based on four key criteria: usefulness (does it solve a real problem?), novelty (is it innovative?), ethics (is it responsible?), and feasibility (can it be realistically developed?). Selected projects will be assigned mentors and resources."
    },
    {
      id: 7,
      question: "What happens at the end of the 12-week program?",
      answer: "The program concludes with a showcase where you'll present your developed project. Outstanding and innovative projects may receive support for patent filing and further development opportunities."
    },
    {
      id: 8,
      question: "Can I work on my project with a team?",
      answer: "Yes! Collaboration is encouraged at INVENTIVE. You can apply as part of a team or join with other participants during the program to work on complementary projects."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="relative w-full bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h2>
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-yellow-400 rounded-full"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Everything you need to know about joining INVENTIVE
          </p>
        </div>

        {/* FAQ Container */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-yellow-500/30 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border-b border-gray-700/50 last:border-b-0 pb-3 sm:pb-4"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between py-2 sm:py-3 text-left focus:outline-none group"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 pr-3 sm:pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 text-yellow-400">
                    {openFAQ === faq.id ? (
                      <ChevronUp className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 transform group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 transform group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                </button>
                
                {/* Answer with smooth animation */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-3 sm:pb-4 pt-1 sm:pt-2">
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4">
            Still have questions? We're here to help!
          </p>
          <button
            onClick={handleClick}
            className="group relative px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-sm sm:text-base md:text-lg rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30"
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-40 left-4 sm:left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-4 sm:right-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
          
          {/* Floating particles */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={`faq-particle-${i}`}
              className="absolute w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-yellow-400 rounded-full opacity-20 animate-bounce hidden md:block"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Decorative shapes */}
          <div className="absolute top-1/4 right-4 sm:right-8 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 border border-yellow-400/30 rotate-45 animate-spin" style={{ animationDuration: '10s' }}></div>
          <div className="absolute bottom-1/3 left-4 sm:left-8 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-yellow-400/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;