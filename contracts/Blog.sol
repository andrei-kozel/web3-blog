//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Blog is Ownable {
    string public name;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        uint id;
        string title;
        string content;
        bool published;
    }

    mapping(uint => Post) private idToPost;
    mapping(string => Post) private hashToPost;

    /* events facilitate communication between smart contractsand their user interfaces  */
    /* i.e. we can create listeners for events in the client and also use them in The Graph  */
    event PostCreated(uint id, string title, string hash);
    event PostUpdated(uint id, string title, string hash, bool published);

    constructor(string memory _name) {
        console.log("Deploying Blog with name:", _name);
        name = _name;
    }

    function updateName(string memory _name) public {
        name = _name;
    }

    function fetchPost(string memory _hash)
        public
        view
        returns (Post memory post)
    {
        return hashToPost[_hash];
    }

    function createPost(string memory _title, string memory _hash)
        public
        onlyOwner
    {
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = _title;
        post.content = _hash;
        post.published = true;
        hashToPost[_hash] = post;
        emit PostCreated(postId, _title, _hash);
    }

    function updatePost(
        uint _postId,
        string memory _title,
        string memory _hash,
        bool _published
    ) public onlyOwner {
        Post storage post = idToPost[_postId];
        post.title = _title;
        post.content = _hash;
        post.published = _published;
        hashToPost[_hash] = post;
        idToPost[_postId] = post;
        emit PostUpdated(_postId, _title, _hash, _published);
    }

    function fetchPosts() public view returns (Post[] memory) {
        uint itemCount = _postIds.current();

        Post[] memory posts = new Post[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint id = i + 1;
            Post storage currentItem = idToPost[id];
            posts[i] = currentItem;
        }
        return posts;
    }
}
