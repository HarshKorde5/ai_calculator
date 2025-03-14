import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import sharp from 'sharp';
import ImageDataSchema from '../schema/imageData.schema.js'
import analyzeImage from '../utils/analyzeImage.js'

const handleImageAnalysis = asyncHandler(async (req, res) => {
    try {
        const { error, value } = ImageDataSchema.validate(req.body);

        if(error){
            throw new ApiError( 400, "Validation failed", error.details);
        }

        const { image, dict_of_vars } = value;

        //Extract base64 data and MIME type

        const base64Data = image.split(",")[1];     //Decode after "data.image/<type>;base64"
        const mimeType = image.match(/^data:(.+);base64/)[1];   //Extract MIME type
        const imageBuffer = Buffer.from( base64Data, "base64");     //Decode base64 to binay buffer

        // Optional : Process the image using sharp for resizing and validation
        const processedImage = await sharp(imageBuffer)
            .resize({ width: 500 })     //Resize to a max width of 500px
            .toBuffer();    //Convert back to a buffer

        //Analyze the image
        const responses = await analyzeImage( processedImage, dict_of_vars );

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                responses,
                "Image processed successfully"
            )
        )



    }catch(error){
        console.log(`Error in '/calculate' route : ${error}`);

        throw new ApiError( 500, "Internal server error",error.message)
        
    }
})


export { handleImageAnalysis };