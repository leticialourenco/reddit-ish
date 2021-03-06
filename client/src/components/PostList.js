import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';

import PostListItem from './PostListItem';
import PageNotFound from './PageNotFound';

import * as postActions from '../actions/Posts';
import * as categoryActions from '../actions/Categories';

import FontAwesome from 'react-fontawesome';

const sortingOptions = [
    {
        option:'oldest',
        name: 'Oldest'
    },
    {
        option:'newest',
        name: 'Newest'
    },
    {
        option:'highest-rated',
        name: 'Highest Rated'
    },
    {
        option:'lowest-rated',
        name: 'Lowest Rated'
    }
];

class PostList extends Component {
    componentWillMount () {
        this.props.actions.getPosts();
        this.props.actions.setCategory(this.props.category);
    }

    componentDidMount () {
        this.props.actions.sortPosts('oldest', this.state);
    }

    render() {
        const { posts, activeCategory, sortBy, actions } = this.props;

        const filteredPosts = posts.filter(post =>
            ((activeCategory === null) || (post.category === activeCategory)) && (post.deleted === false)
        );

        if (filteredPosts.length === 0) {
            return (<PageNotFound type={'category'} />)
        }

        return (
            <div>
                <div className="content wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <Sidebar/>

                            <main className="posts col-sm-12 col-md-10">
                                <div>
                                    <div className="row sorting-header">
                                        <div className="col-md-10 col-lg-9">
                                            <ul>
                                                <li>
                                                    <FontAwesome name='sort' />
                                                    <span>Sort By</span>
                                                </li>

                                                { sortingOptions.map((item) => (
                                                    <li key={item.option} className="sort-option">
                                                        <a onClick={ () => actions.sortPosts(item.option) }
                                                           className={ sortBy === item.option ? 'active' : '' }
                                                        >  { item.name } </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="col-md-2 col-lg-3 results-counter">
                                            <span>{ filteredPosts.length }</span> results
                                        </div>
                                    </div>

                                    <div className="post-list-container">
                                        <ul>
                                            { filteredPosts.map((post) => (
                                                <PostListItem key={post.id} post={post} />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        posts: state.posts,
        activeCategory: state.activeCategory,
        sortBy: state.sortBy
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            getPosts: () => dispatch(postActions.getPosts()),
            setCategory: (category) => dispatch(categoryActions.setCategory(category ? category : null)),
            sortPosts: (sortBy) => dispatch(postActions.sortPosts(sortBy))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);