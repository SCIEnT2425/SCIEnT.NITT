import heroBg from "../../assets/hero-bg.jpeg";

const HeroSection = () => {
    return (
        <div className="h-screen">
            <img className="h-screen w-screen overflow-hidden brightness-40 object-cover
                    " src={heroBg} alt="Hero" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              flex flex-col items-center w-screen gap-10">
                <div className="text-9xl font-extrabold text-yellow-500">
                    <span className="text-yellow-500">OPEN</span><span className="text-white">HOUSE</span>
                </div>
                <div className="w-2/5 h-24 flex items-center gap-10">
                    <div className="border-2 border-yellow-300 w-1/3"></div>
                    <div className="h-full p-4
                            flex justify-center items-center">
                        <p className="text-yellow-500 text-7xl font-bold">2026</p>
                    </div>
                    <div className="border-2 border-yellow-300 w-1/3"></div>
                </div>
                <p className="text-center text-white text-2xl">Student Centre for Innovation in Engineering and Technology</p>
                <p className="text-center text-white text-2xl">
                    Part of <span className="text-yellow-500 font-bold">Pragyan'26</span> | February 20–21, 2026
                </p>
            </div>
        </div>
    );
}
export default HeroSection;