import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { ContentWrapper, ImageCircle, Input, Button, Post } from "components";
import { useStore } from "context/store";
import { updatePosts, createPost } from "context/actions/post";
import { Posts } from "services/post";
import { FaImage } from "react-icons/fa";

import {
  Content,
  SendWrapper,
  Container,
  PostWrapper,
  FileInput
} from "./styles";

// TODO: passar component input para text area
const PostList = () => {
  const postService = new Posts();

  const history = useHistory();
  const [fields, setFields] = useState({
    post: "",
    image: null
  });
  const { user, posts, dispatch } = useStore();
  const inputRef = useRef(null);

  const fetchPosts = async () => {
    const posts = await postService.FetchPosts();

    dispatch(updatePosts(posts));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async () => {
    if (!fields.post) {
      return;
    }

    const { name, lastname } = user;
    const newPost = await postService.CreatePost({
      content: fields.post,
      title: `${name} ${lastname}`, // provisório até ter relacionamento
      images: fields.image
    });

    dispatch(createPost(newPost));

    setFields(prev => ({ ...prev, post: "", image: "" }));
  };

  const handleChange = field => e => {
    setFields({ ...fields, [field]: e.target.value });
  };

  return (
    <Container>
      <ContentWrapper title="Crie uma publicação:">
        <Content>
          <ImageCircle
            size={60}
            src={user.url}
            onClick={() => history.push("/me")}
          />
          <Input
            placeholder="Conte-nos as novidades!"
            value={fields.post}
            onChange={handleChange("post")}
          />
        </Content>
        <Content itemsMargin={8}>
          <FileInput
            ref={inputRef}
            onChange={e => {
              const inputImage = e.target.files[0];
              setFields(prev => ({ ...prev, image: inputImage }));
            }}
          />
          {!fields.image ? (
            <Button
              text="Anexo"
              icon="FaPaperclip"
              active={!!fields.image}
              onClick={() => inputRef.current.click()}
            />
          ) : (
            <Button
              text={<FaImage />}
              icon="FaPaperclip"
              active={!!fields.image}
              onClick={() => inputRef.current.click()}
            />
          )}
          <Button text="Pessoas" icon="FaUserTag" />
          <Button text="Locais" icon="FaTags" />
          <SendWrapper>
            <Button
              text="Enviar"
              active
              padding="8px 30px"
              onClick={handleSubmit}
            />
          </SendWrapper>
        </Content>
      </ContentWrapper>
      <PostWrapper>
        {posts.length > 0
          ? posts.map((post, index) => {
              return (
                <Post
                  key={index}
                  title={post.title}
                  time={post.createdAt}
                  local={post.local}
                  text={post.content}
                  imagens={post.imagens}
                  user={post.user}
                />
              );
            })
          : "loadding"}
      </PostWrapper>
    </Container>
  );
};

export default PostList;
