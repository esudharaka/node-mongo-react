const express = require('express');
const app = express();
const connectDb = require('./src/connection');
const UserImages = require('./src/UserImages');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = 8080;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/userImages', async  (req, res) => {
    await UserImages
        .findOne({ userName :"esudharaka" })
        .then((result) => {
            if (result) {
                console.log(`Successfully found document: ${result}.`);
                res.json({
                    'selectedImages' : result.selectedImages,
                    'userName': result.userName
                });
            } else {
                console.log('No document matches the provided query.');
                res.json({
                    'selectedImages' : [],
                    'userName': ''
                });
            }
        })
        .catch((err) =>  res.status(500).send({ error: err }));
});

app.get('/images', async (req, res) => {

  /*  // UserImages.find
    await UserImages
        .findOne({ userName :"esudharaka" })
        .then((result) => {
            if (result) {
                console.log(`Successfully found document: ${result}.`);
            } else {
                console.log('No document matches the provided query.');
            }
        })
        .catch((err) => console.error(`Failed to find document: ${err}`));*/
        // .exec(function (err, imageSelections) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     imageSelections.map((selection) => {
        //         console.log(JSON.stringify(selection));
        //     });
        //    // console.log(imageSelections);
        // });

    axios.get('https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json')
        .then(response => {
            // const imageResponse = JSON.parse(response);
            // console.log(response.data);
            if (response.status === 200) {
                const imageList = response.data.entries;
                res.json(imageList);
            } else {
                res.json([]);
            }
        })
        .catch(error => {
            console.log(error);
            res.error(error);
        });


});

app.post('/save-images', async (req, res) => {
    console.log(req.body);
    const postData = req.body;

     const user = new UserImages( postData);
     await user.save().then(() => console.log('User created'))
         .catch((err)=> console.log(err));

    res.sendStatus(200);

});

app.get('/user-create', async (req, res) => {
  // const user = new User({ username: 'userTest' });
  //
  // await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
