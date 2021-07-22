const db = require('../models');
const appConfig = require('../config/app.config');
const Chat = db.chat;


exports.uploadImageMessage = async (req, res) => {

    const { userId } = req.params;

    if (req.file) {
        const message = await Chat.create({ message: `${appConfig.appUrl}:${appConfig.appPort}/user/${userId}/${req.file.filename}`, userId: userId });
        return res.send(message);
    }

    return res.status(500).json('No image uploaded')
};

exports.postTextMessage = async (req, res) => {
    const { userId } = req.params;
    const { message } = req.body;
    try {
        const createdMessage = await Chat.create({ message: message, userId: userId });
        return res.send(createdMessage);

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find();
        return res.send(chats);

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}