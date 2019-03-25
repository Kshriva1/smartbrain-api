const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'd6b4e872019a4a88bb9110cdb60418de'});

const handleAPI = (req,res) => {
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
	res.json(data);
})
.catch(err => {
	res.status(400).json('Cannot work with the API');
})
}

const handleImage = (req,res,db) => {

	const {id} = req.body;
	db('users')
  .where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(count => {
        
        res.json(count[0])
  })
  .catch(err => res.status(400).json('User entry not found'))
}

module.exports = {
	handleImage,
	handleAPI
}