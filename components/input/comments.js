import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import {NotificationContext} from '../../store/index'

function Comments(props) {
  const { eventId } = props;
  const cx = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false);
  const [listComments, setListComments] = useState([])
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (showComments) {
      setIsFetching(true);
      fetch("/api/comments/" + eventId)
        .then((resp) => resp.json())
        .then((data) => {
           setListComments(data.comments)
           setIsFetching(false)
        });
    }
  }, [showComments]);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    cx.showNotification({
      title: 'Loading...',
      message: 'Registering comment',
      status: 'pending'
    })
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if(res.ok){
          return res.json();
        }
        res.json().then(data => {
          throw new Error(data.message)
        })
      })
      .then((data) => {
        cx.showNotification({
          title: 'Sucsess',
          message: 'Registrated comment',
          status: 'success'
        })
      }).catch(error => {
        cx.showNotification({
          title: 'Error',
          message: 'Error',
          status: 'error'
        })
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && <CommentList items={listComments}/>}
      {showComments && isFetching && <p>Loading...</p>}

    </section>
  );
}

export default Comments;
