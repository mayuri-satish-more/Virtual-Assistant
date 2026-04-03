import uploadOnCloudinary from "../config/cloudinary.js";
import { geminiResponse } from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "get current user error " });
  }
};

// export const updateAssistant=async (req,res)=> {
//   try {
//     const {assistantName,imageUrl}=req.body
//     let assistantImage;
//     if(req.file){
//       assistantImage=await uploadOnCloudinary(req.file.path)
//     }
//     else{
//       assistantImage=imageUrl
//     }

//     const user=await User.findByIdAndUpdate(req.userId,{
//       assistantName,assistantImage
//     }, { new: true}).select("-password")
//      return res.status(200).json(user);
//   } catch (error) {
//      return res.status(400).json({ message: 'update assistant error ' });
//   }
// }




export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;

    let assistantImage = null;

    if (req.file) {
      // Multer saved the file
      assistantImage = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      assistantImage = imageUrl;
    }

    if (!assistantName || !assistantImage) {
      return res
        .status(400)
        .json({ message: "Assistant name or image missing" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { returnDocument: "after" },
    ).select("-password");

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update assistant" });
  }
};





export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    user.history.push(command)
    user.save()
    const userName = user.name;
    const assistantName = user.assistantName;
    const result = await geminiResponse(command, assistantName, userName);
    const jsonMatch = result.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res
        .status(400)
        .json({ response: "sorry, i can't understand that" });

    }

      const gemResult = JSON.parse(jsonMatch[0]);
      console.log(gemResult)
      const type = gemResult.type;
      switch (type) {
        case "get-date":
          return res.json({
            type,
            userInput: gemResult.userInput,
            response: `current date is ${moment().format("YYYY-MM-DD")}`,
          });
        case "get-time":
          return res.json({
            type,
            userInput: gemResult.userInput,
            response: `Current time is ${moment().format("hh:mm A")}`,
          });
        case "get-day":
          return res.json({
            type,
            userInput: gemResult.userInput,
            response: `today is ${moment().format("dddd")}`,
          });
        case "get-month":
          return res.json({
            type,
            userInput: gemResult.userInput,
            response: `today is ${moment().format("MMMM")}`,
          });

        case "google-search":
        case "youtube-search":
        case "youtube-play":
        case "general":
        case "calculator-open":
        case "instagram-open":
        case "facebook-open":
        case "weather-show":
          return res.json({
            type,
            userInput:gemResult.userInput,
            response:gemResult.response,
            
          });
          default :
          return res.status(400).json({response: "I didn't understand that command"})
      }
    
  } catch (error) {
    res.status(500).json({ response: "ask assistant error" });
  }
};










