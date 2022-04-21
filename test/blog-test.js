const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blog", function () {
  it("Should create a post", async function () {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("Blog title");
    await blog.deployed();
    await blog.createPost("First post", "This is the some content");

    const posts = await blog.fetchPosts();

    expect(posts.length).to.equal(1);
    expect(posts[0].title).to.equal("First post");
  });

  it("Should edit a post", async function () {
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

  it("Should update blog name", async function () {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy("Blog title");
    await blog.deployed();

    expect(await blog.name()).to.equal("Blog title");

    await blog.updateName("New blog title");
    expect(await blog.name()).to.equal("New blog title");
  });
});
