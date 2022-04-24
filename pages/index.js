/* pages/index.js */
import { css } from "@emotion/css";
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AccountContext } from "../context";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Image from "next/image";

const queryGetAllPosts = gql`
  query {
    posts {
      id
      title
      contentHash
      published
    }
  }
`;

import { ownerAddress } from "../config";

export default function Home(props) {
  const { posts } = props;
  const account = useContext(AccountContext);

  const router = useRouter();
  const navigate = async () => {
    router.push("/create-post");
  };

  return (
    <div>
      <div className={postList}>
        {
          /* map over the posts array and render a button with the post title */
          posts &&
            posts.map((post, index) => (
              <Link href={`/post/${post.contentHash}`} key={index}>
                <a>
                  <div className={linkStyle}>
                    <p className={postTitle}>{post.title}</p>
                    <div className={arrowContainer}>
                      <Image
                        src="/right-arrow.svg"
                        alt="Right arrow"
                        width="25px"
                        height="25px"
                      />
                    </div>
                  </div>
                </a>
              </Link>
            ))
        }
      </div>
      <div className={container}>
        {account === ownerAddress && posts && !posts.length && (
          <button className={buttonStyle} onClick={navigate}>
            Create your first post
            <Image
              src="/right-arrow.svg"
              alt="Right arrow"
              width="35px"
              height="35px"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({ query: queryGetAllPosts });

  return {
    props: {
      posts: data.posts,
    },
  };
}

const arrowContainer = css`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
`;

const postTitle = css`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  padding: 20px;
`;

const linkStyle = css`
  border: 1px solid #ddd;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
`;

const postList = css`
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;
`;

const container = css`
  display: flex;
  justify-content: center;
`;

const buttonStyle = css`
  margin-top: 100px;
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 44px;
  padding: 20px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, 0.1);
`;
