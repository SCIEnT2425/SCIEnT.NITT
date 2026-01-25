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
    const club = await Club.findOne({
      name: { $regex: new RegExp(`^${req.params.name}$`, "i") }, // case-insensitive
    })
      .select("name logo projects")
      .populate("projects");

    if (!club) return res.status(404).json({ error: "Club not found" });

    res.json({
      club: { name: club.name, logo: club.logo },
      projects: club.projects,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find({}, "name logo description");
    console.log("Sending all cubs");
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};