const express = require("express");
const mongoose=require('mongoose'); 
const Device = require("../models/device");
const checkAuth=require('../middleware/check'); 
const router = express.Router();

  
/// create device

router.post('/postDevice',checkAuth,(req,res)=>{    
const device=new Device({
  name:req.body.name,
  description:req.body.description,
  owner:req.body.owner,
  price:JSON.parse(req.body.price), 
  imagePath:req.body.imagePath,  
  ownerId:req.userData.userId
 });
 device.save().then( () => {

  res.status(201).json({
    message: "device added successfully"  
  });
})
.catch( ()=>{
  res.status(500).json({
    message:'Error Faild!'
  })
});
});


 

// get user devices  

router.get("/getUserDevices",checkAuth, (req, res)=>{ 
  const pageSize= +req.query.pagesize;
  const currentPage= +req.query.page;
  const sortingOrder= +req.query.sortingOrder; 
  var userId=mongoose.Types.ObjectId(req.userData.userId)
  let fetchedDevices;
  const mong=Device.find({ownerId:userId})
  if(pageSize && currentPage){
    mong.sort({price:sortingOrder}).skip(pageSize * (currentPage - 1))
  .limit(pageSize)
  }
  mong.then(documents => {
    fetchedDevices=documents;
      
    })
     .then( () =>{ 
      res.status(200).json({
        message: "Devices fetched successfully!",
        devices:fetchedDevices 
      });
     })
     .catch( ()=>{
      res.status(500).json({
        message:'Fetching Devices Failed!!'
      })
    }); 
  });

///add device data

router.post(
      "/:id",checkAuth,
      (req, res) => {
        let imagePath = req.body.imagePath;
        console.log(imagePath)
        let device; 
         device = new Device({
          _id: req.body.id,       
         name:req.body.name,
         description:req.body.description,
         owner:req.body.owner,
         price:req.body.price, 
         imagePath:imagePath,
         ownerId:req.userData.userId
        }); 
        console.log(device);
         var ObjectID=require('mongodb').ObjectID
        console.log(typeof(ObjectID(req.params.id)))
             
        Device.updateOne({ _id: ObjectID(req.params.id) }, device)
        .then( () => {
          res.status(200).json({ message: "Update successful!" });
        })
        .catch( ()=>{
          res.status(500).json({
            message:'Updating Failed!!'
          })
        });
       
 }) 

/////get user device data
 
router.get("/:id", (req, res) => {
  Device.findById(req.params.id).then(device => {
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({ message: "device not found!" });
      }
    })
    .catch( ()=>{
      res.status(500).json({
        message:'Fetching device Failed!!'
      })
    });
  });




module.exports = router;
 


