import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`).then(res => setBlog(res.data));
  }, [id]);

  const handleLike = () => setLikes(prev => prev + 1);
  const handleDislike = () => setDislikes(prev => prev + 1);

  const addComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    } else {
      alert("Comment cannot be empty!");
    }
  };

  if (!blog) return <div className='container'>Loading...</div>;

  return (
    <div className='container'>
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
      <div>
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleDislike}>Dislike ({dislikes})</button>
      </div>

      <div className='comment-section'>
        <h3>Comments</h3>
        {comments.map((c, i) => (
          <div key={i} className='comment'>{c}</div>
        ))}
        <input
          type='text'
          placeholder='Write a comment...'
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default BlogPage;
