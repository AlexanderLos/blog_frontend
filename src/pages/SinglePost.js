import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

const SinglePost = ({ posts }) => {
    const { id } = useParams();
    const currentPost = useMemo(() => posts.find(post => post.id === parseInt(id)), [id, posts]);

    return (
        <div>
            <h1>{currentPost.title}</h1>
            <p>{currentPost.body}</p>
            <Link to={`/edit/${id}`}>
                <button>Edit Post</button>
            </Link>
            <Link to={'/'}>
                <button>Go Back</button>
            </Link>
        </div>
    );
};

export default SinglePost;
