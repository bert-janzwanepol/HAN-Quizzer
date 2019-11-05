import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { fetchCategories } from '../reducers/game'

class CategoryListUI extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const categoryList = this.props.categories.map(category => {
            return (
                <label for={category}>
                    <input type="checkbox" value={category} id={category} name={category} />
                    {category}
                </label>
            )
        })

        return (
            <form>
                {categoryList}
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.game.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => { dispatch(fetchCategories()) }
    }
}

const CategoryList = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CategoryListUI)

export default CategoryList;