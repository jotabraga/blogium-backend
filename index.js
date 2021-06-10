import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let posts = [{
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
    posts.push({...req.body, "id":newId});
    res.send();
})

app.get('/posts/:id/comments',(req,res) => {
    const postId = req.params.id;
    console.log(postId);
    res.send(comments.find((comment) => comment.postId === parseInt(postId)).comments);
});

app.post('/posts/:id/comments',(req,res) =>{
    const postId = req.params.id;
    const postToComment = comments.find((comment)=> comment.postId == postId);
    postToComment.comments.push(req.body);
    res.send(req.body);
})

app.put('/posts/:id',(req,res) => {
    const postId = req.params.id;
    const editedPost = posts.find((post) => post.id === parseInt(postId));
    editedPost.title = req.body.title;
    editedPost.coverUrl = req.body.coverUrl;
    editedPost.contentPreview = req.body.contentPreview;
    res.send();
})

app.delete('/posts/:id',(req,res) => {
    console.log("entrou no del");
    const postId = req.params.id;
    posts = posts.filter((post) => post.id !== parseInt(postId));
    console.log(posts);
    res.send();
})

app.listen(4001);