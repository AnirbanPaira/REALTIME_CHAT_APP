import {v2 as cloudinary} from "cloudinary";
import { config } from "dotenv"; 

config();

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key:process.env.CLOUDKEY,
    api_secret:process.env.CLOUDAPISECRETKEY
})


export default cloudinary;