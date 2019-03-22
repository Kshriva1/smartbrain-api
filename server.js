const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

const database = {

	users : [
       
       {
           id: '123',
           name: 'John',
           email: 'john@gmail.com',
           password: 'cookies',
           entries: 0,
           joined: new Date()

       },
       {
           id: '124',
           name: 'Sally',
           email: 'sally@gmail.com',
           password: 'bananas',
           entries: 0,
           joined: new Date()

       }


	]
}

app.get('/',(req,res) => {

	res.send(database.users);
})

app.post('/signin',(req,res) => {

	bcrypt.compare("apples", "$2a$10$EZ7jp1cR.8eil00DIeJ/Ye7bbYqssVWovORU7rD5SfXdX318xaaoq", function(err, res) {
    console.log("first guess",res);
    });

    bcrypt.compare("apples", "$2a$10$3B9pKL2K4k.hmgv4EuIKCuutIV6l9L2W.m.UPFmuEkXNvAoXbtWb2", function(err, res) {
    console.log("Second guess",res);
});
     if(req.body.email === database.users[0].email &&
     	req.body.password === database.users[0].password) {

     	res.json("Success");
     } else {

     	res.status(400).json('error logging in');
     }
})

app.post('/register',(req,res) => {
   
  const { email,password,name } = req.body;

  /*bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});*/

  database.users.push({
  	id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()})	

  res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res) => {

	const {id} = req.params;
    let found = false
	database.users.forEach(user => {
		if(user.id === id) {
			found=true;
			return res.json(user);
		} 
	})

	if(!found) {
		res.status(400).json("User not found")
	}
})

app.post('/image',(req,res) => {

	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found=true;
			user.entries++;
			return res.json(user.entries);
		} 
	})

	if(!found) {
		res.status(400).json("User not found")
	}
})


app.listen(3001,() => {
	console.log("App is running on port 3001")
})