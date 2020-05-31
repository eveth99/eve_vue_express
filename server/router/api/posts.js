const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//get post
router.get('/',async (req,res) => {
    const posts = await loadPostsCollection('PCS');
    res.send(await posts.find({}).toArray())
});

//add post
router.post('/',async (req,res) => {
    const posts = await loadPostsCollection('PCS');
    await posts.insertOne({
       text:req.body.text,
       createAt:new Date()
    })
    res.status(201).send();
});


//delete post
router.delete('/:id',async (req,res) => {
    const posts = await loadPostsCollection('PCS');
    await posts.deleteOne({
      _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send();
});

async function loadPostsCollection(col){
    const uri = "mongodb+srv://eve:eve123456@cluster0-9qktz.mongodb.net/test?retryWrites=true&w=majority";
    const client = await mongodb.MongoClient.connect(
        uri,{ useNewUrlParser: true }
);

return client.db("PCS").collection(col);
}

module.exports = router;