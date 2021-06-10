import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const posts = [{
    id: 1,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2
  },
  {
    id: 2,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2
  }];  

  const comments = [
    {
        postId: 1,
        comments: [
            {
                author: "João",
                content: "Muito bom esse post! Tá de parabéns"
            },
            {
                author: "Maria",
                content: "Como faz pra dar palmas?"
            }
        ]
    },
    {
        postId: 2,
        comments: [
            {
                author: "João",
                content: "Muito bom esse post! Tá de parabéns 2"
            },
            {
                author: "Maria",
                content: "Como faz pra dar palmas? 2"
            }
        ]
    },
];


app.get('/',(req,res) => {
    res.send(posts);
});

app.get('/posts/:id',(req,res) => {
    const postId = req.params.id;
    res.send(posts.find((post) => post.id == postId));
});

app.post('/new-story',(req,res) =>{
    const newId = (posts[posts.length-1].id + 1);
    console.log(req);
    posts.push({...req.body, "id":newId});
    res.send();
})

app.get('/posts/:id/comments',(req,res) => {
    const postId = req.params.id;
    res.send(comments.find((comment) => comment.postId == postId));
});

app.listen(4001);