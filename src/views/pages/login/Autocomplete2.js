import React, { useState } from 'react'
import { Form, FormControl, ListGroup } from 'react-bootstrap'

// eslint-disable-next-line react/prop-types
const Autocomplete = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleChange = (e) => {
    const inputValue = e.target.value
    setInputValue(inputValue)
    // eslint-disable-next-line react/prop-types
    const filteredSuggestions = suggestions.filter(
      //(suggestion) => suggestion.nomSociete.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      (suggestion) => suggestion.nomSociete.toLowerCase().includes(inputValue.toLowerCase()),
    )
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
  }

  const handleClick = (suggestion) => {
    setInputValue(suggestion.nomSociete)
    setShowSuggestions(false)
  }

  return (
    <Form>
      <FormControl
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      {showSuggestions && (
        <ListGroup>
          {filteredSuggestions.map((suggestion, index) => (
            <ListGroup.Item key={index} onClick={() => handleClick(suggestion)}>
              {suggestion.nomSociete}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form>
  )
}

export default Autocomplete
