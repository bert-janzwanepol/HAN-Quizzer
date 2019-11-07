import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { fetchCategories, setRoundCategories, setCategorySelectedAction, setCategoryDeselectedAction } from '../reducers/game'
import { withRouter } from "react-router";

class CategoryListUI extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    setCheckBoxChecked = (e) => {
        e.target.checked ? this.props.selectCategory(e.target.value) : this.props.deselectCategory(e.target.value)
    }

    render() {
        const categoryList = this.props.categories.map(category => {
            return (
                <label key={category} htmlFor={category}>
                    <input type="checkbox" value={category} id={category} name={category} onChange={(event) => this.setCheckBoxChecked(event)} />
                    {category}
                </label>
            )
        })

        return (
            <form className="category-list" onSubmit={(e) => {
                this.props.setRoundCategories(this.props.roomkey, this.props.roundNumber, e, this.props.selectedCategories);
                this.props.history.push('/game/round');
            }}>
                {categoryList}
                <button type="submit">Start ronde</button>

            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.game.categories,
        selectedCategories: state.game.selectedCategories,
        roundNumber: state.game.roundNumber,
        roomkey: state.game.game.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => { dispatch(fetchCategories()) },
        setRoundCategories: (roomkey, roundnumber, event, formData) => { dispatch(setRoundCategories(roomkey, roundnumber, event, formData)) },
        selectCategory: (category) => { dispatch(setCategorySelectedAction(category)) },
        deselectCategory: (category) => { dispatch(setCategoryDeselectedAction(category)) },
    }
}

const CategoryList = withRouter(ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CategoryListUI));

export default CategoryList;