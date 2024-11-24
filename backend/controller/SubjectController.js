import Subject from "../models/subject.js";

// Create a new subject
export const createSubject = async (req, res) => {
  try {
    const { name, code, description, classId } = req.body;
    const subject = new Subject({ name, code, description, classId });
    await subject.save();
    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating subject", error: error.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subjects", error: error.message });
  }
};

// Get a specific subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subject", error: error.message });
  }
};

// Update a subject by ID
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      id,
      { name, code, description },
      { new: true, runValidators: true },
    );
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject updated successfully", subject });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating subject", error: error.message });
  }
};

// Delete a subject by ID
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting subject", error: error.message });
  }
};
