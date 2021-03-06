import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";

import more from "../../assets/more.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import send from "../../assets/send.svg";
import "./styles.css";

class Feed extends Component {
  state = {
    feed: []
  };

  async componentDidMount() {
    this.connectSocket();
    const response = await api.get("/posts");
    this.setState({ feed: response.data });
  }

  connectSocket = () => {
    const socket = io("http://localhost:3333");
    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", newPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === newPost._id ? newPost : post
        )
      });
    });
  };

  handleLike = async id => {
    await api.post(`/posts/${id}/like`);
  };

  render() {
    const { feed } = this.state;
    return (
      <section id="post-list">
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span> {post.author} </span>
                <span className="place"> {post.place} </span>
              </div>
              <img src={more} alt="Mais" />
            </header>
            <img src={`http://localhost:3333/files/${post.image}`} alt="" />

            <footer>
              <div className="actions">
                <button onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="Like" />
                </button>
                <img src={comment} alt="Comment" />
                <img src={send} alt="Send" />
              </div>
              <strong> {post.likes} curtidas </strong>
              <p>
                {post.description}
                <span> {post.hashtags} </span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
