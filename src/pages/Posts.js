import React from 'react';
import {Container,Row,Col} from "react-bootstrap";
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import PostForm from '../components/PostForm';
import './Posts.css';

const Post = () => {
    return (
      <div className="post-container">
        <div className="left-sidebar">
          <LeftSidebar />
        </div>
        <div className="post-form">
          <PostForm />
        </div>
        <div className="right-sidebar">
          <RightSidebar />
        </div>
      </div>
    );
  };
  
  export default Post;