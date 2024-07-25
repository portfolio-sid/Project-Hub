const express = require('express');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router = express.Router();
const { Students } = require("../models");
const { Users } = require("../models");


router.get('/mentee/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Students.findAll({ where : {guide: id, status: "Approved"} });
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/present/:id', validateToken, async (req, res) => {
  const id = req.params.id;
  const student = await Students.findByPk(id);
  await student.increment('present');
  res.json("SUCCESS");
});

router.post('/absent/:id', validateToken, async (req, res) => {
  const id = req.params.id;
  const student = await Students.findByPk(id);
  await student.increment('absent');
  res.json("SUCCESS");
});

router.post('/marks/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    const {mte1, mte2, ete, cws} = req.body;
    const student = await Students.findByPk(id);
    student.mte1Marks= mte1;
    student.mte2Marks= mte2;
    student.eteMarks= ete;
    student.cwsMarks= cws;
    await student.save();
    res.json("SUCCESS");
  });
  

module.exports = router;