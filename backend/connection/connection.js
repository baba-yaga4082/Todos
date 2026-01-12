const mon = require("mongoose");

const con = async () => {
    try {
        await mon.connect("mongodb://localhost:27017/user").then (() => {
            console.log("Connected to MongoDB");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
   
};
module.exports = con;

     
