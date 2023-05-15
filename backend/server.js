// require ('dotenv').config()
// const express = require('express')
// const mongoose = require('mongoose')

// const notesRoutes = require ('./routes/notes.js')
// const userRoutes = require ('./routes/user.js')


// const app = express()

// //middleware

// app.use(express.json())

// app.use((req,res,next) => {
//   console.log(req.path, req.method)
//   next()
// })

// //routes

// app.use('/api/notes',notesRoutes)
// app.use('/api/user',userRoutes)

// // connect to db

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT,() =>{
//     console.log('connected to db and listening on port' , process.env.PORT)
//     })
//   })
//   .catch((error) =>{
//     console.log(error)
//   })


require('dotenv').config()
//const {OAuth2Client} = require('google-auth-library');
// const {GoogleAuth} = require('google-auth-library')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;

const notesRoutes = require('./routes/notes.js')
const userRoutes = require('./routes/user.js')
// const G_userRoutes = require('./routes/G_user.js')

const app = express()


// async function main() {
//   const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/cloud-platform'
//   });
//   const client = await auth.getClient(process.env.GOOGLE_CLIENT_ID);
//   const projectId = await auth.getProjectId();
//   const url = `https://dns.googleapis.com/dns/v1/projects/${react-vercel-386207}`;
//   const res = await client.request({ url:"http://localhost:3000" });
//   console.log(res.data);
// }

// main().catch(console.error);

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// passport middleware
// app.use(passport.initialize());

// passport configuration
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000"
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     // handle user authentication and database operations here
//     // you can access user details like profile.id, profile.displayName, etc.
//     try {
//       const ticket = await client.verifyIdToken({
//         idToken: accessToken,
//         audience: process.env.GOOGLE_CLIENT_ID
//       });

//       const payload = ticket.getPayload();

//       // Extract user data from the payload and store in database
//       const user = {
//         googleId: payload.sub,
//         email: payload.email,
//       };

//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// routes
app.use('/api/notes', notesRoutes)
app.use('/api/user', userRoutes)
// app.use('/api/g_user',G_userRoutes )

// google auth routes
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // redirect to the desired page after successful authentication
//     res.redirect("http://localhost:3000/home");
//   }
// );

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })




