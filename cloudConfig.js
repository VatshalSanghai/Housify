const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
});
 
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'wanderlust_dev',
//       allowerdFormats: ["pnj", 'jpg',"jpeg"], // supports promises as well
//     },
//   });
const uploadfile = async(filepath)=>{
    try{
        const result = await cloudinary.uploader.upload(filepath);
        console.log(result);
        return result;

    }catch(error){
        console.log(error.message);
    }
}


module.exports = {uploadfile}


