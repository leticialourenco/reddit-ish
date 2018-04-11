import * as API from '../utils/Api';

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const SUBMIT_POST = 'SUBMIT_POST';
export const SORT_POSTS = 'SORT_POSTS';

export function getPostsAction (posts) {
    return {
        type: GET_POSTS,
        posts
    }
} export const getPosts = () => dispatch => (
    API.fetchPosts()
        .then(response => dispatch(getPostsAction(response)))
);


export function getPostAction (post) {
    return {
        type: GET_POST,
        post
    }
} export const getPost = (id) => dispatch => (
    API.fetchPost(id)
        .then(response => dispatch(getPostAction(response)))
);


export function submitPostAction (post) {
    return {
        type: SUBMIT_POST,
        post
    }
} export const submitPost = ({ title, author, category, body }) => dispatch => (
    API.addPost({ title, author, category, body })
        .then(response => dispatch(submitPostAction(response)))
);


export function sortPosts (sortBy) {
    return {
        type: SORT_POSTS,
        sortBy
    }
}