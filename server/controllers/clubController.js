const Club = require('../models/Club');


exports.getClubsData = async (req, res) => {
  try {
    const clubs = await Club.find(); // Fetch all clubs from the database
    res.status(200).json(clubs); // Return the data as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching clubs data" }); // Handle any server errors
  }
};

exports.getClub = async (req,res) => {
 try {
    // Case-insensitive exact match; the name is escaped so it can't inject regex syntax
    const escaped = req.params.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const club = await Club.findOne({
      name: { $regex: new RegExp(`^${escaped}$`, "i") },
    })
      .select("name logo description projects")
      .populate("projects");

    if (!club) return res.status(404).json({ error: "Club not found" });

    res.json({
      club: { name: club.name, logo: club.logo, description: club.description },
      projects: club.projects,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find({}, "name logo description projects").lean();
    // Project count for the club cards; the project list itself isn't needed here
    res.json(clubs.map(({ projects, ...club }) => ({ ...club, projectCount: (projects || []).length })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};