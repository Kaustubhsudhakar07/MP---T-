const Service = require("../models/serviceModel");
    
    const services = async (req, res) => {
  try { 
      const response = await Service.find({});
      if (!response) {
        res.status(404).json({ message: "No services found" });
        return ;
      }
      res.status(200).json(response);
  } catch (error) {
    console.log(`Error fetching services: ${error}`);
      res.status(500).json({message: error.message});
  }

}

  module.exports = services;
  