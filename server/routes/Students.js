const express = require('express');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router = express.Router();
const { Students } = require("../models");
const { Users } = require("../models");

router.get('/', async (req, res) => {
    try {
      const faculty = await Users.findAll({ where : {role: 'Faculty'} });
      res.json(faculty);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  // router.post('/choose', async (req, res) => {
  
  //   // Saving the faculty mentor for the student
  //   id= req.body.id;
  //   guide= req.body.guide;
  //   status= req.body.status;
  
        
  //     await Students.create({UserId: id, guide: guide, status: status, present:0, absent:0, mte1Marks: 0, mte2Marks: 0, cwsMarks: 0, eteMarks: 0});
  //     res.json("SUCCESS");
    
    
      
  // });
router.post('/choose', async (req, res) => {
  
  // Saving the faculty mentor for the student

  id= req.body.id;
  const student = await Students.findOne({ where: { UserId: id } });
  if(student.status=="Registered" || student.status=="Denied"){
    student.guide= req.body.guide;
    student.status= req.body.status;
    await student.save();
    res.json({message: "SUCCESS"});
  }
  else{
    res.json({message: "You can't apply right now- your previous application is still in process"});
  }
    
});

router.post('/enrol/:id', async (req, res) => {
  const id = req.params.id;

  // Saving the faculty mentor for the student

  const regno = req.body.regno;
  const year = req.body.year;
  const phone = req.body.phone;
  const email = req.body.email;

  const existingStudent = await Students.findOne({ where: { UserId: id } });
  if (existingStudent) {
    res.json({ message: "Already enrolled" });
  } else {
    await Students.create({
      UserId: id,
      registrationNumber: regno,
      year: year,
      status: "Registered",
      present: 0,
      absent: 0,
      mte1Marks: -1,
      mte2Marks: -1,
      cwsMarks: -1,
      eteMarks: -1,
      phone: phone,
      email: email
    });
    res.json({ message: "SUCCESS" });
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Students.findOne({ where: { UserId: id } });
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/approvalList/:id', async (req, res) => {
  const id = req.params.id;
  try {
    //const student = await Users.findAll({ where : {role: 'Student'} });

    const student = await Students.findAll({ where : {guide: id, status: "Requested"} });
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/allow/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Students.findByPk(id);
  student.status = "Approved";
  await student.save();
  res.json("SUCCESS");
});

router.post('/deny/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Students.findByPk(id);
  student.status = "Denied";
  await student.save();
  res.json("SUCCESS");
});


module.exports = router;