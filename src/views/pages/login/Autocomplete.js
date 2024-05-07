import React, { useState } from 'react'
import { Form, FormControl, ListGroup } from 'react-bootstrap'

// eslint-disable-next-line react/prop-types
const AutocompleteExample = ({ societes }) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    // Simuler une recherche à partir de la valeur saisie
    // eslint-disable-next-line react/prop-types
    const filteredSuggestions = societes.filter((suggestion) =>
      suggestion.nomSociete.toLowerCase().includes(value.toLowerCase()),
    )
    setSuggestions(filteredSuggestions)
  }

  const handleClick = (value) => {
    setInputValue(value.nomSociete)
    setSuggestions([])
  }

  return (
    <div>
      <Form.Group controlId="formAutocomplete">
        <FormControl
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Tapez quelque chose..."
        />
        <ListGroup>
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item key={index} onClick={() => handleClick(suggestion)}>
              {suggestion.nomSociete}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>
    </div>
  )
}

export default AutocompleteExample

// Données simulées pour l'exemple
const mockData = ['Banane', 'Pomme', 'Orange', 'Fraise', 'Raisin', 'Ananas']
