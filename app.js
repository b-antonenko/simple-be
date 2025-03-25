const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const MOCKAPI_BASE_URL = "https://67e26c6c97fc65f53535ff62.mockapi.io/api/posts";

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(MOCKAPI_BASE_URL);
    res.json({ posts: response.data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get a single post by ID
app.get("/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${MOCKAPI_BASE_URL}/${req.params.id}`);
    res.json({ post: response.data });
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
});

// Add a new post
app.post("/posts", async (req, res) => {
   try {
    const newPost = {
          author: req.body.author,
          body: req.body.body,
          createdAt: new Date().toISOString(),
        };

    const response = await axios.post(MOCKAPI_BASE_URL, newPost, {
      headers: {'content-type':'application/json'}});
    res.status(201).json({ message: "Stored new post.", post: response.data });
  } catch (error) {
    res.status(500).json({ error: "Failed to store post" });
  }
});

// Use dynamic port for Vercel
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
