// userReducer.js
const initialStateData = {
  data: [],
}

const userReducer = (state = initialStateData, action) => {
  switch (action.type) {
    case 'GET_DATA_USERS':
      return { ...state, data: action.payload }
    case 'ADD_USER':
      return { ...state, email: action.payload }
    default:
      return state
  }
}

// postReducer.js
const initialStatePost = {
  posts: [],
}

const postReducer = (state = initialStatePost, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] }
    default:
      return state
  }
}

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeStateReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export { userReducer, postReducer, changeStateReducer }
