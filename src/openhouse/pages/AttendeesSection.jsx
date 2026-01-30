import { Users, Briefcase, GraduationCap } from "lucide-react";

const attendees = [
  {
    number: 1,
    title: "STUDENT COMMUNITY",
    description:
      "6000+ NIT students attending different stalls and inspiring innovation amongst them.",
    icon: Users,
  },
  {
    number: 2,
    title: "VCs & INVESTORS",
    description:
      "VCs and investors specialised in different domains of tech will be visiting.",
    icon: Briefcase,
  },
  {
    number: 3,
    title: "ALUMNI",
    description:
      "Various alumni and government research organisation representatives would be arriving.",
    icon: GraduationCap,
  },
];

const AttendeesSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-black relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(253,224,71,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(253,224,71,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              border bg-yellow-400/10 mb-6
            "
            style={{ borderColor: "hsl(50 100% 50% / 0.4)" }}
          >
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-300 text-sm font-mono uppercase tracking-wider">
              Expected Audience
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Who will be </span>
            <span className="text-[hsl(50_100%_50%)]">Attending?</span>
          </h2>

          <div className="w-24 h-1 mx-auto bg-linear-to-r from-transparent via-yellow-300 to-transparent" />
        </div>

        {/* Attendee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {attendees.map((attendee, index) => {
            const Icon = attendee.icon;

            return (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div
                  className="
                    relative h-full p-8 rounded-2xl
                    bg-black/80 border border-gray-600/40
                    shadow-lg shadow-black/60
                    hover:border-yellow-400 transition-all duration-500
                    overflow-hidden
                  "
                >
                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl to-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom left, hsl(50 100% 50% / 0.2), transparent)",
                    }}
                  />

                  {/* Scan line effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, hsl(50 100% 50% / 0.05), transparent, hsl(50 100% 50% / 0.05))",
                      }}
                    />
                  </div>

                  {/* Number badge */}
                  <div className="relative mb-6">
                    <div
                      className="
                        inline-flex items-center justify-center
                        w-14 h-14 rounded-xl
                        bg-yellow-400 text-black font-bold text-2xl
                        shadow-lg transition-shadow
                      "
                      style={{
                        boxShadow:
                          "0 0 20px hsl(50 100% 50% / 0.4)",
                      }}
                    >
                      {attendee.number}
                    </div>

                    <div
                      className="absolute -right-2 -top-2 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg"
                      style={{
                        borderColor: "hsl(50 100% 50% / 0.5)",
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg md:text-xl font-bold text-yellow-300 tracking-wide">
                      {attendee.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {attendee.description}
                  </p>

                  {/* Bottom tech line */}
                  <div
                    className="
                      absolute bottom-0 left-0 right-0 h-px
                      group-hover:transition-colors duration-500
                    "
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, transparent, hsl(50 100% 50% / 0.4), transparent)",
                    }}
                  />
                </div>

                {/* Floating dots decoration */}
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[hsl(50_100%_50%/0.3)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(50_100%_50%/0.5)]" />
                  <div className="w-2 h-2 rounded-full bg-[hsl(50_100%_50%/0.7)]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech decoration line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(50_100%_50%/0.5)]" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[hsl(50_100%_50%/0.4)]"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(50_100%_50%/0.5)]" />
        </div>
      </div>
    </section>
  );
};

export default AttendeesSection;
