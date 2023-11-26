import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Form = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    // Get current post for editing, if editing
    const currentPost = useMemo(() => {
        // Check if we're editing and posts are provided
        if (props.formType === 'edit' && props.posts) {
            return props.posts.find(post => post.id === parseInt(params.id));
        }
        return null;
    }, [params.id, props.posts, props.formType]);

    // Initialize form data
    const [formData, setFormData] = useState(
        props.formType === 'new' ? {
            title: '',
            body: '',
        } : {
            title: currentPost ? currentPost.title : '',
            body: currentPost ? currentPost.body : '',
            id: currentPost ? currentPost.id : null
        }
    );

    const handleChange = (event) => {
        setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(formData, props.formType, formData.id);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Title</h3>
            <input
                type="text"
                onChange={handleChange}
                value={formData.title}
                name="title"
            />
            <h3>Body</h3>
            <textarea
                onChange={handleChange}
                value={formData.body}
                name="body"
            />
            <input type="submit" value={props.buttonLabel} />
        </form>
    );
};

export default Form;
