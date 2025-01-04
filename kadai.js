"use strict";
const express = require("express");
const app = express();
app.use(express.json());

let posts = [
    { id: 1, content: "最初の投稿", likes: 0 },
    { id: 2, content: "hello", likes: 0 },
];

// 投稿を取得
app.get("/posts", (req, res) => {
    res.json(posts);
});

// いいね機能
app.post("/posts/:id/like", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (post) {
        post.likes += 1;
        res.json(post);
    } else {
        res.status(404).send("Post not found");
    }
});

// 投稿編集機能
app.post("/posts/:id/edit", (req, res) => {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    const post = posts.find(p => p.id === id);
    if (post) {
        post.content = content;
        res.json(post);
    } else {
        res.status(404).send("Post not found");
    }
});

// 投稿削除機能
app.post("/posts/:id/delete", (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== id);
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));


