import { Link, useNavigate } from 'react-router-dom';

const divStyle = {
    textAlign: 'center',
    border: '3px solid',
    margin: '10px auto',
    width: '80%'
};

const titleStyle = {
    color: '#006643',
    fontSize: '2em'
};

const Post = ({ post, deletePost }) => {
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        deletePost(post.id);
        navigate('/');
    };

    return (
        <div style={divStyle}>
            <Link to={`/posts/${post.id}`}>
                <h1 style={titleStyle}>{post.title}</h1>
            </Link>
            <p>{post.body}</p>
            <form onSubmit={handleDelete}>
                <input type='submit' value='Delete Post' />
            </form>
        </div>
    );
};

export default Post;
