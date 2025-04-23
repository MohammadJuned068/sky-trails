import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/blogSlice';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import Navbar

function Home() {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.body.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div>
      {/* Navbar with search */}
      <Navbar search={search} setSearch={handleSearchChange} />
      
      <div className='container'>
        <h1>Blog List</h1>
        {currentBlogs.map(blog => (
          <div key={blog.id} className='blog-card'>
            <h2>{blog.title}</h2>
            <p>{blog.body.slice(0, 100)}...</p>
            <Link to={`/blogs/${blog.id}`}>Read More</Link>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className='pagination'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
