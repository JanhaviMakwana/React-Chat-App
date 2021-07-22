module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
            email: String,
            password: String
        },
        {
            timestamps: true
        }
    )
    const User = mongoose.model('user', schema);
    return User;
}