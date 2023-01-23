const express = require("express");
const router=express.Router();
const emplcontroller=require("../controllers/emplcontroller");

//view all record
router.get("/",emplcontroller.view);

//add new record
router.get("/addemp",emplcontroller.addemp);
router.post("/addemp",emplcontroller.save);


//update data

router.get("/editemp/:id",emplcontroller.editemp);
router.post("/editemp/:id",emplcontroller.edit);

//delete records

router.get("/deleteemp/:id",emplcontroller.delete);

//download record 

router.get("/export",emplcontroller.download);

module.exports=router;