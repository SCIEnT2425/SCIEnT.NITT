const Footer = () => {
  return (
    <footer
      id="contact"
      style={{
        backgroundColor: "hsl(0, 0%, 0%)",
        borderTop: "1px solid hsl(0, 0%, 20%)",
        color: "hsl(0, 0%, 98%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span style={{ color: "hsl(50, 100%, 50%)" }}>OPEN</span>
              <span style={{ color: "hsl(0, 0%, 98%)" }}>HOUSE</span>
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(0, 0%, 65%)" }}
            >
              Presented by SCIEnT — Student Centre for Innovation in Engineering
              and Technology, National Institute of Technology,
              Tiruchirappalli.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-semibold mb-4 uppercase tracking-wider text-sm"
              style={{ color: "hsl(0, 0%, 98%)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["About", "Projects", "Previous Editions", "Previous Sponsors"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      style={{ color: "hsl(0, 0%, 65%)" }}
                      className="text-sm transition-colors"
                      onMouseEnter={(e) =>
                        (e.target.style.color = "hsl(50, 100%, 50%)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "hsl(0, 0%, 65%)")
                      }
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold mb-4 uppercase tracking-wider text-sm"
              style={{ color: "hsl(0, 0%, 98%)" }}
            >
              Contact Us
            </h4>
            <div className="flex flex-row gap-4 justify-between">


              <ul
                className="space-y-2 text-sm"
                style={{ color: "hsl(0, 0%, 65%)" }}
              >
                <li>Arjun B K</li>
                <li>Technical Executive,</li>
                <li>Student Center for Innovation in Engineering and Technology ( SCIEnT )</li>
                <li>National Institute of Technology, Tiruchirappalli</li>
                <li>Tamil Nadu , India - 620015</li>
              </ul>
              <ul className="space-y-2 text-sm"
                style={{ color: "hsl(0, 0%, 65%)" }}>

                <li>Phone: +91 8610450988</li>
                <li>Email:&nbsp;
                  <a
                    href="mailto:openhouse@nitt.edu"
                    className="transition-colors"
                    style={{ color: "hsl(0, 0%, 65%)" }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "hsl(50, 100%, 50%)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "hsl(0, 0%, 65%)")
                    }
                  >
                    scient@nitt.edu
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Optional bottom bar (ready if you want it later) */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid hsl(0, 0%, 20%)" }}
        >
          <p className="text-sm" style={{ color: "hsl(0, 0%, 65%)" }}>
            © 2026 SCIEnT. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "hsl(0, 0%, 65%)" }}>
              In Association with
            </span>
            <span style={{ color: "hsl(50, 100%, 50%)", fontWeight: 700 }}>
              <a href="https://pragyan.org" target="_blank" rel="noopener noreferrer" className="no-underline " >
                Pragyan&apos;26
              </a>

            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
