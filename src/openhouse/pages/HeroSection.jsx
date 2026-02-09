import heroBg from "../../assets/hero-bg.jpeg";

const HeroSection = () => {
    return (
        <div className="relative h-screen w-screen">
            {/* Background image */}
            <img
                className="absolute inset-0 h-full w-full object-cover"
                src={heroBg}
                alt="Hero"
            />

            {/* Dark transparent overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-10 px-4 h-full">
                
                {/* Title */}
                <div className="text-5xl laptop:text-9xl desktop:text-9xl font-extrabold text-center">
                    <span className="text-yellow-500">OPEN</span>
                    <span className="text-white">HOUSE</span>
                </div>

                {/* Year divider */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 w-full max-w-xl">
                    <div className="border-2 border-yellow-300 flex-1"></div>
                    <div className="p-2 sm:p-4">
                        <p className="text-4xl sm:text-5xl md:text-7xl font-bold text-yellow-500 text-center">
                            2026
                        </p>
                    </div>
                    <div className="border-2 border-yellow-300 flex-1"></div>
                </div>

                {/* Description */}
                <p className="text-center text-white text-lg mobile:text-xl laptop:text-2xl max-w-2xl">
                    Student Centre for Innovation in Engineering and Technology
                </p>
                <p className="text-center text-white text-lg mobile:text-xl laptop:text-2xl max-w-2xl">
                    In Association with <span className="text-yellow-500 font-bold">Pragyan'26</span> | February 20–21, 2026
                </p>
            </div>
        </div>
    );
};

export default HeroSection;
