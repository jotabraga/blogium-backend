import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const posts = [];

app.get('/',(req,res) => {
    const post = req.body;
    posts.push(post);
    res.send(post);
});

app.listen(4001);