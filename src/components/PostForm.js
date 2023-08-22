import React, { useContext, useState ,useRef} from 'react';
import logo from '../assets/logo-black.png';
import { useSelector } from 'react-redux';
import { FaPaperPlane, FaEdit, FaTrash } from 'react-icons/fa';
import { AppContext } from '../context/appContext';
import './PostForm.css';

function PostForm() {
  const [post, setPost] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const messageIdToEdit = useRef(null);
  const messageIdToDelete = useRef(null);
  const user = useSelector((state) => state.user);
  const { socket, setMessages, messages } = useContext(AppContext);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
  }

  const todayDate = getFormattedDate();

  socket.off('receive-posts').on('receive-posts', (receivePost) => {
    console.log('receive post', receivePost);
    setMessages(receivePost);
    console.log(messages);
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(post);
    if (!post) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ':' + minutes;
    socket.emit('post-room', post, user, time, todayDate);
    setPost("");
  }

  function handleEditMessage(messageId, initialContent) {
    setEditingMessage({ id: messageId, content: initialContent });
  }

  function handleDeleteMessage(messageId) {
    messageIdToDelete.current = messageId;
    setShowDeleteConfirm(true);
  }

  function handleConfirmDelete() {
    setShowDeleteConfirm(false);
    socket.emit('delete-post', messageIdToDelete.current);
  }

  function handleCancelDelete() {
    setShowDeleteConfirm(false);
    messageIdToDelete.current = null;
  }

  function handleEditMessage(messageId, initialContent) {
    messageIdToEdit.current = messageId;
    setEditedContent(initialContent);
    setShowEditDialog(true);
  }

  function handleConfirmEdit() {
    setShowEditDialog(false);
    socket.emit('edit-post', messageIdToEdit.current, editedContent);
  }

  function handleCancelEdit() {
    setShowEditDialog(false);
    messageIdToEdit.current = null;
    setEditedContent("");
  }

  return (
    <>
      <div className="post-form-container">
        <h2 className="post-form-title">Home</h2>
        <div className="post-form-content">
          <div className="post-form-section">
            <div className="post-form-logo">
              <img src={logo} alt="App Logo" className="logo" />
            </div>
            <textarea
              className="post-form-textarea"
              placeholder="What's happening?"
              rows="4"
              onChange={(e) => setPost(e.target.value)}
              value={post}
            ></textarea>
          </div>
          <div className="post-form-button-section">
            <button className="post-form-button" onClick={handleSubmit}>
              <FaPaperPlane className="post-form-icon" />
              Post
            </button>

            
          </div>

          <div className="post-form-line"></div>
          {messages && messages.map(({ _id: date, messagesByDate }, idx) => (
        <div key={idx}>
    
          {messagesByDate.map(({ _id: messageId, content, time, from: sender }, msgIdx) => (
            <div className={"postMessage"} key={msgIdx}>
              <div className="message-inner">
                <div className="d-flex align-items-center mb-3">
                  <img src={logo} style={{ width: 35, height: 35, objectFit: 'cover', borderRadius: '50%', marginRight: 10 }} />
                  <p className="message-sender">{ sender._id && sender._id === user?._id ? "You" : sender.name}</p>
                  <p className="message-timestamp-post">{time} {date}</p>
                
                </div>
                <p className="message-content">{content}</p>
                <div className="message-buttons">
                    {sender._id === user?._id && <button className="edit-button" onClick={() => handleEditMessage(messageId, content)}>
                      <FaEdit />
                    </button>}
                    {sender._id === user?._id && <button className="delete-button" onClick={() => handleDeleteMessage(messageId)}>
                      <FaTrash />
                    </button>}
                  </div>
              </div>
            </div>
          ))}
        </div>
      ))}

{showEditDialog && (
  <div className="edit-dialog">
    <p>Edit Message:</p>
    <textarea
      className="edit-textarea"
      rows="4"
      onChange={(e) => setEditedContent(e.target.value)}
      value={editedContent}
    ></textarea>
    <button onClick={handleConfirmEdit}>Save</button>
    <button onClick={handleCancelEdit}>Cancel</button>
  </div>
)}


{showDeleteConfirm && (
  <div className="dialog-overlay">
    <div className="dialog">
      <button className="dialog-close" onClick={handleCancelDelete}>
        &times;
      </button>
      <h2 className="dialog-title">Confirm Delete</h2>
      <p>Are you sure you want to delete this message?</p>
      <div className="edit-dialog-buttons">
        <button className="dialog-button save" onClick={handleConfirmDelete}>
          Confirm
        </button>
        <button className="dialog-button cancel" onClick={handleCancelDelete}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
      
    </>
  );
}

export default PostForm;
