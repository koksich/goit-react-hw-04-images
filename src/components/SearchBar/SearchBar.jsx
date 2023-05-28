import { Component } from "react";

import PropTypes from 'prop-types';

import { FiSearch } from 'react-icons/fi';
import { Btn, Form, Header, Input } from "./SearchBar.styled";

export class SearchBar extends Component  {
    state = {
        searchQuery: '',
    };


    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchQuery.trim() === "") {
            return alert(
              'The search field cannot be empty. Please enter a query and try again.'
            );
        }
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' })
    }

    handleChange = e => { 
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    }


    render() {
        return (
          <Header>
                <Form onSubmit={ this.handleSubmit}>
              <Btn type="submit">
                        <span>
                            <FiSearch />
                </span>
              </Btn>

              <Input
                type="text"
                autoComplete="off"
                autoFocus
                        placeholder="Search images and photos"
                        name='searchQuery'
                        value={this.state.searchQuery}
                        onChange={this.handleChange}
              />
            </Form>
          </Header>
        );
    }
    
}

SearchBar.propTypes = {
onSubmit: PropTypes.func,
}