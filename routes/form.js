const express = require(`express`);
const router = express.Router();

const fs = require('fs');

router.use(express.json())
router.use(express.urlencoded({extended: true}))

let feedbackObjs = require("../data/feedbackObjs.json")

router.get('/form', (req, res) => {
    
    res.render(`form`, {
        "feedbackObjs":feedbackObjs
    })
})

//submit a new message
router.post('/form', (req, res) => {
    console.log('submit button used')
    //get data from the feedback.ejs header
    let {name, form} = req.body 

    //push object data to beginning of array
    feedbackObjs.unshift(req.body)

    fs.writeFile('data/feedbackObjs.json', JSON.stringify(feedbackObjs), 'utf8', err=>{
        if(err){
            res.status(404).send(err)
        }
    })

    //send back all of the messages with the new message attached
    res.redirect('/form');
})

module.exports = router;