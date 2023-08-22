import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import './RightSidebar.css';
import logo from '../assets/logo-black.png';

const RightSidebar = () => {
  const user = useSelector((state) => state.user);
  const { socket, setMembers, members, setFollows, follows } = useContext(AppContext);
  const [followingMap, setFollowingMap] = useState({});

  useEffect(() => {
    if (user) {
      socket.emit('tweet-room');
      socket.emit('new-user');
      socket.emit('new-follow');
      socket.emit('new-follow');
    }
  }, []);

  socket.off('new-user').on('new-user', (payload) => {
    console.log(payload);
    setMembers(payload);
  });

  socket.off('new-follow').on('new-follow', (payload) => {
    console.log(payload);
    setFollows(payload);
    const initialFollowingMap = {};
      
    members.forEach((member) => {
      const isFollowing = follows.some(
        (follow) => follow.id === user._id && follow.username === member._id
      );
      initialFollowingMap[member._id] =  isFollowing;
    });
    console.log('Helooo'+initialFollowingMap);
    setFollowingMap(initialFollowingMap);
    
  });

  function toggleFollowing(memberId) {
    const updatedFollowingMap = { ...followingMap };
    updatedFollowingMap[memberId] = !followingMap[memberId];

    setFollowingMap(updatedFollowingMap);
    socket.emit('follow-user', user._id, memberId, !followingMap[memberId]);
  }

  useEffect(() => {
    socket.on('user-followed', (userId, followedUserId, isFollowing) => {
      setFollowingMap((prevMap) => ({
        ...prevMap,
        [followedUserId]: isFollowing,
      }));
    });

    return () => {
      socket.off('user-followed');
    };
  }, []);

  return (
    <div className="rightContainer">
        <div>
      <h2 className="followContainer">Who to follow</h2>
      {members &&
        members.map((member) => (
          <ListGroup.Item
            key={member._id}
            style={{ cursor: 'pointer' }}
            disabled={user && member._id === user._id}
          >
            <Row className="tabsLayout">
              <Col className="member-status1">
                <img src={logo} className="member-status-img" alt="Member Status" />
              </Col>
              <Col className="rightTabTitle">
                {member.name}
                {user && member._id === user._id && ' (You)'}
              </Col>
              <Col className="rightTabButton">
                <button className="rightButton" onClick={() => toggleFollowing(member._id)}>
                  {followingMap[member._id] ? 'Unfollow' : 'Follow'}
                </button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
        </div>
    </div>
  );
};

export default RightSidebar;
