import Post from "../components/Post";
import { Link } from 'react-router-dom';

const AllPosts = ({ posts, deletePost }) => (
    <>
      <Link to='/new'>
        <button>Add New Post</button>
      </Link>
      {posts.map(
        (post) => <Post key={post.id} post={post} deletePost={deletePost} />
      )}
    </>
);

export default AllPosts;
