import {  useState } from "react";

import PropTypes from 'prop-types';

import { FiSearch } from 'react-icons/fi';
import { Btn, Form, Header, Input } from "./SearchBar.styled";

export const SearchBar = ({onSubmit}) => {
  
  const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.trim() === "") {
            return alert(
              'The search field cannot be empty. Please enter a query and try again.'
            );
        }
        onSubmit(searchQuery);
      setSearchQuery('');
    }

    const handleChange = e => { 
setSearchQuery(e.currentTarget.value.toLowerCase());
    }


   
        return (
          <Header>
                <Form onSubmit={ handleSubmit}>
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
                        value={searchQuery}
                        onChange={handleChange}
              />
            </Form>
          </Header>
        );
    }
    

SearchBar.propTypes = {
onSubmit: PropTypes.func,
}