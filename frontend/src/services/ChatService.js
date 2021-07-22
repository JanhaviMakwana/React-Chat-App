import axios from "../axios";

const ChatService = {
    textMessage: (userId, messageData) => {
        return axios.post(`/message/${userId}`, messageData)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    imageMessage: (userId, messageData) => {
        return axios.post(`/image-upload/${userId}`, messageData)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    getChats: () => {
        return axios.get('/chats')
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    }
};

export default ChatService;