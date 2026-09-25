const express = require("express");

const router = express.Router();

const students = require("../data/students");

// ==================================================
// GET ALL STUDENTS
// GET /students
// ==================================================

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    totalStudents: students.length,
    data: students
  });
});

// ==================================================
// GET STUDENT BY ID
// GET /students/:id
// ==================================================

router.get("/:id", (req, res) => {
  const studentId = Number(req.params.id);

  // Validate ID
  if (!Number.isInteger(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Student ID must be a valid number"
    });
  }

  const student = students.find(
    (student) => student.id === studentId
  );

  // Student not found
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// ==================================================
// ADD NEW STUDENT
// POST /students
// ==================================================

router.post("/", (req, res) => {
  const { name, age, course, email } = req.body;

  // Required fields
  if (!name || age === undefined || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, age and course are required"
    });
  }

  // Validate name
  if (
    typeof name !== "string" ||
    name.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Name must be a valid string"
    });
  }

  // Validate age
  const studentAge = Number(age);

  if (
    !Number.isFinite(studentAge) ||
    studentAge <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Age must be a positive number"
    });
  }

  // Validate course
  if (
    typeof course !== "string" ||
    course.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Course must be a valid string"
    });
  }

  // Generate new ID
  const newId =
    students.length > 0
      ? Math.max(
          ...students.map((student) => student.id)
        ) + 1
      : 1;

  // Create student object
  const newStudent = {
    id: newId,
    name: name.trim(),
    age: studentAge,
    course: course.trim(),
    email:
      typeof email === "string" &&
      email.trim() !== ""
        ? email.trim()
        : `student${newId}@example.com`
  };

  // Add student to array
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student added successfully",
    data: newStudent
  });
});

// ==================================================
// UPDATE STUDENT
// PUT /students/:id
// ==================================================

router.put("/:id", (req, res) => {
  const studentId = Number(req.params.id);

  // Validate ID
  if (!Number.isInteger(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Student ID must be a valid number"
    });
  }

  const student = students.find(
    (student) => student.id === studentId
  );

  // Student not found
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  const { name, age, course, email } = req.body;

  // Check whether any field was provided
  if (
    name === undefined &&
    age === undefined &&
    course === undefined &&
    email === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update"
    });
  }

  // Update name
  if (name !== undefined) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Name must be a valid string"
      });
    }

    student.name = name.trim();
  }

  // Update age
  if (age !== undefined) {
    const studentAge = Number(age);

    if (
      !Number.isFinite(studentAge) ||
      studentAge <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be a positive number"
      });
    }

    student.age = studentAge;
  }

  // Update course
  if (course !== undefined) {
    if (
      typeof course !== "string" ||
      course.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Course must be a valid string"
      });
    }

    student.course = course.trim();
  }

  // Update email
  if (email !== undefined) {
    if (
      typeof email !== "string" ||
      email.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Email must be a valid string"
      });
    }

    student.email = email.trim();
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
});

// ==================================================
// DELETE STUDENT
// DELETE /students/:id
// ==================================================

router.delete("/:id", (req, res) => {
  const studentId = Number(req.params.id);

  // Validate ID
  if (!Number.isInteger(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Student ID must be a valid number"
    });
  }

  const studentIndex = students.findIndex(
    (student) => student.id === studentId
  );

  // Student not found
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  // Remove student
  const deletedStudent = students.splice(
    studentIndex,
    1
  )[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent
  });
});

module.exports = router;