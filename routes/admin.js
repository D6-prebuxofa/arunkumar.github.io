
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");


router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render("admin", { projects, skills });
  } catch (error) {
    res.status(500).send("Error loading admin dashboard.");
  }
});


router.post("/projects/add", async (req, res) => {
  const { title, description, link } = req.body;
  await Project.create({ title, description, link });
  res.redirect("/admin");
});

router.post("/skills/add", async (req, res) => {
  const { name, level } = req.body;
  await Skill.create({ name, level });
  res.redirect("/admin");
});


router.post("/projects/delete/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});


router.post("/skills/delete/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

module.exports = router;
