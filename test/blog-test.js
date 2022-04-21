const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blog", () => {
  it("Should create a post", async () => {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("Blog title");
    await blog.deployed();
    await blog.createPost("First post", "This is the some content");

    const posts = await blog.fetchPosts();

    expect(posts.length).to.equal(1);
    expect(posts[0].title).to.equal("First post");
  });

  it("Should edit a post", async () => {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("Blog title");
    await blog.deployed();
    await blog.createPost("Second post", "This is the some content");
    await blog.updatePost(
      1,
      "Second post updated title",
      "This is the some content",
      true
    );

    const post = await blog.fetchPosts();
    expect(post[0].title).to.equal("Second post updated title");
  });

  it("Should update blog name", async () => {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("Blog title");
    await blog.deployed();

    expect(await blog.name()).to.equal("Blog title");

    await blog.updateName("New blog title");
    expect(await blog.name()).to.equal("New blog title");
  });

  it("Should return all posts", async () => {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("Blog title");
    await blog.deployed();
    await blog.createPost("First post", "This is the some content");
    await blog.createPost("Second post", "This is the some content");
    await blog.createPost("Third post", "This is the some content");

    const posts = await blog.fetchPosts();

    expect(posts.length).to.equal(3);
    expect(posts[0].title).to.equal("First post");
    expect(posts[1].title).to.equal("Second post");
    expect(posts[2].title).to.equal("Third post");
  });
});
