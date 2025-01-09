import cloudinary from '../lib/cloudinary.js';
import Message from '../models/messages.models.js';
import User from '../models/users.models.js';

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({
            _id: {
                $ne: loggedInUserId
            }
        }).select("-password");
        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        
        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log(`Error in getMessage controller`, error);
        res.status(500).json({ error: "Internal server error" })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;

 

        if (!senderId || !receiverId) {
            return res.status(400).json({ error: "Invalid sender or receiver ID" });
        }

        let imageUrl;

        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (err) {
                console.error("Cloudinary Upload Error:", err.message);
                return res.status(400).json({ error: "Image upload failed" });
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        try {
            await newMessage.save();
            res.status(200).json(newMessage);
        } catch (err) {
            console.error("Database Save Error:", err.message);
            res.status(500).json({ error: "Failed to save message" });
        }
    } catch (error) {
        console.error("Error in sendMessage Controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
