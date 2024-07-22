const express= require('express');
const admin= require('firebase-admin');
const cryptojs= require('crypto-js');
const bodypaser= require('body-parser');

const serviceAccount = require('./serviceAccountKey.json');
const bodyParser = require('body-parser');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://Database.firebaseio.com'
  });

const db= admin.database();
const app= express();
const PORT= 8080;
app.use(bodyParser.json);

const secretKey= 'AIzaSyAglG59Lv_-9wUdWB1sMkGBdvRUnCBVb-s';

app.post('/register', async (req,res) => {
    const {firstName, lastName, Email, Password} = req.body;
    if(!firstName|| !lastName || !Email || !Password){
        return res.status(400).send('All fields are required')};

        try{
            const userRef= db.ref ('users').push
            const encryptedPassword= cryptojs.Blowfish.encrypt(Password,secretKey).toString;
        
        await userRef.set({
            firstName,
            lastName,
            Email,
            Password:encryptedPassword,
            
        });
        res.status(200).send('Registration complete');
        } catch (error){
        res.status(400).send('Registration failed');
        }
    });


    app.post('/login', async (req,res)=>{
        const{Email, Password} = req.body;
        if(!Email|| !Password){
            return res.status(400).send('All field must be filled')}
    })
     try{
        const usersRef = db.ref('users');
    usersRef.orderByChild('email').equalTo(email).once('value', async (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
        const user = userData[userId];

        const decryptedPassword = CryptoJS.Blowfish.decrypt(user.password, secretKey).toString(CryptoJS.enc.Utf8);

        if (password === decryptedPassword) {
          res.status(200).send('Login successful');
        } else {
          res.status(400).send('Invalid credentials');
        }
      } else {
        res.status(400).send('User not found');
      }
    });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
  app.listen(
    PORT,
    () =>console.log('Its running on http:/localhost:${PORT}')
);
    
    