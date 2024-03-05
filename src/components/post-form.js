import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/post-slice";
function PostForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const scheduledAfter = 0;
    const postData =
      scheduledAfter > 0
        ? {
            text,
            platforms: user.access_tokens,
            published: false,
            scheduledAfter,
          }
        : { text, platforms: user.access_tokens, published: true };

    dispatch(createPost(postData));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Posts</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            placeholder="Make a Post"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            style={{ marginLeft: 500 }}
            type="submit"
            className="btn btn-bloc k"
          >
            Submit Post
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostForm;
