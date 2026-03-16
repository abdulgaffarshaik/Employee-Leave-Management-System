import Timetable from "../models/Timetable.js";

/* =======================
   CREATE TIMETABLE
======================= */
export const createTimetable = async (req, res) => {
  try {
    const { academicYear, semester, class: className, section, room, classTeacher, schedule, facultyDetails } = req.body;

    const timetable = new Timetable({
      academicYear,
      semester,
      class: className,
      section,
      room,
      classTeacher,
      schedule: schedule || [],
      facultyDetails: facultyDetails || [],
      createdBy: req.user.id
    });

    await timetable.save();
    res.status(201).json({ message: "Timetable created successfully", timetable });
  } catch (error) {
    console.error("Create timetable error:", error);
    res.status(500).json({ message: "Failed to create timetable", error: error.message });
  }
};

/* =======================
   GET ALL TIMETABLES
======================= */
export const getAllTimetables = async (req, res) => {
  try {
    const { academicYear, semester, section, isActive = true } = req.query;

    const filter = {};
    if (academicYear) filter.academicYear = academicYear;
    if (semester) filter.semester = parseInt(semester);
    if (section) filter.section = section;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const timetables = await Timetable.find(filter)
      .populate("createdBy", "name email")
      .populate("facultyDetails.facultyId", "name employeeId email")
      .sort({ createdAt: -1 });

    res.json(timetables);
  } catch (error) {
    console.error("Fetch timetables error:", error);
    res.status(500).json({ message: "Failed to fetch timetables" });
  }
};

/* =======================
   GET SINGLE TIMETABLE
======================= */
export const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("facultyDetails.facultyId", "name employeeId email");

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    res.json(timetable);
  } catch (error) {
    console.error("Fetch timetable error:", error);
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
};

/* =======================
   UPDATE TIMETABLE
======================= */
export const updateTimetable = async (req, res) => {
  try {
    const { academicYear, semester, class: className, section, room, classTeacher, schedule, facultyDetails, isActive } = req.body;

    let timetable = await Timetable.findById(req.params.id);

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    // Update fields
    if (academicYear) timetable.academicYear = academicYear;
    if (semester) timetable.semester = semester;
    if (className) timetable.class = className;
    if (section) timetable.section = section;
    if (room) timetable.room = room;
    if (classTeacher) timetable.classTeacher = classTeacher;
    if (schedule) timetable.schedule = schedule;
    if (facultyDetails) timetable.facultyDetails = facultyDetails;
    if (isActive !== undefined) timetable.isActive = isActive;

    await timetable.save();

    res.json({ message: "Timetable updated successfully", timetable });
  } catch (error) {
    console.error("Update timetable error:", error);
    res.status(500).json({ message: "Failed to update timetable", error: error.message });
  }
};

/* =======================
   DELETE TIMETABLE
======================= */
export const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    res.json({ message: "Timetable deleted successfully" });
  } catch (error) {
    console.error("Delete timetable error:", error);
    res.status(500).json({ message: "Failed to delete timetable" });
  }
};

/* =======================
   GET TIMETABLE BY CLASS/SECTION
   (For employees to view)
======================= */
export const getTimetableByClassSection = async (req, res) => {
  try {
    const { class: className, section } = req.params;

    const timetable = await Timetable.findOne({
      class: className,
      section: section.toUpperCase(),
      isActive: true
    }).populate("facultyDetails.facultyId", "name employeeId email");

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found for this class" });
    }

    res.json(timetable);
  } catch (error) {
    console.error("Fetch timetable error:", error);
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
};
