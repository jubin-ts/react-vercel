// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

// const G_userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true
//     }
    
// })

// // function to create a new user from Google profile information
// G_userSchema.statics.createUserFromGoogleProfile = async function(profile) {
//     const { email, name } = profile
//     const G_user = new this({
//         email,
//         name,
//         picture,
//         password: 'google_user' // set a default password for Google users
//     })
//     await G_user.save()
//     return G_user
// }

// // function to find a user by email
// G_userSchema.statics.findUserByEmail = async function(email) {
//     const G_user = await this.findOne({ email })
//     return G_user
// }

// // function to handle Google authentication callback
// async function googleAuthCallback(req, res) {
//     try {
//         const { code } = req.query

//         // exchange the authorization code for an access token and a refresh token
//         const { tokens } = await oauth2Client.getToken(code)

//         // use the access token to retrieve the user's profile information
//         const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
//             // headers: {
//             //     Authorization: `Bearer ${tokens.access_token}`
//             // }
//         })
//         const { email } = data

//         // check if the user is already registered in the database
//         let G_user = await G_user.findUserByEmail(email)

//         if (!G_user) {
//             // create a new user document using the Google profile information
//             G_user = await G_user.createUserFromGoogleProfile(data)
//         }

//         // log the user in and return the user document
//         const loggedInUser = await G_user.login(email, 'google_user')
//         res.json(loggedInUser)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('Error authenticating with Google')
//     }
// }

// // hash the user's password before saving it to the database
// G_userSchema.pre('save', async function() {
//     if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt()
//         this.password = await bcrypt.hash(this.password, salt)
//     }
// })



// module.exports = mongoose.model('G_user', G_userSchema)
