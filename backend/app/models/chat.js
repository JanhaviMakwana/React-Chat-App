module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
            message: String,
            userId: String
        },
        {
            timestamps: true
        }
    )
    const Chat = mongoose.model('chat', schema);
    return Chat;
}