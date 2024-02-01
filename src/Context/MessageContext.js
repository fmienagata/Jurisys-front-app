import React, { Suspense, useContext, useReducer } from 'react'

import Modal from 'src/components/Modal'

const MessageContext = React.createContext(null)

const messageTypes = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  INFO: 'INFO',
}

const modalReducer = (modalState, action) => {
  const { type, message, title } = action || {}
  switch (type) {
    case messageTypes.SUCCESS:
      return {
        visible: true,
        variant: 'SUCCESS',
        title,
        message,
        iconName: 'SUCCESS',
      }
    case messageTypes.ERROR:
      return {
        visible: true,
        variant: 'ERROR',
        title,
        message,
        iconName: 'error',
      }
    case messageTypes.INFO:
      return {
        open: true,
        variant: 'INFO',
        message,
        iconName: 'INFO',
        title,
        isGeneralAlert: !title,
      }
    default:
      return {
        ...modalState,
        open: false,
      }
  }
}

export const useMessageContext = () => useContext(MessageContext)

// eslint-disable-next-line react/prop-types
export const MessageProvider = ({ children }) => {
  const [modal, dispatch] = useReducer(modalReducer, { visible: false })

  const displaySuccess = (message) => {
    dispatch({ type: messageTypes.SUCCESS, message, title: 'title' })
  }

  const displayError = (message) => {
    dispatch({
      type: messageTypes.ERROR,
      message: message || 'Une erreur est survenue',
      title: 'Une erreur est survenue',
    })
  }

  const displayInfo = (title, message) => {
    dispatch({
      type: messageTypes.INFO,
      message: message || 'Une erreur est survenue',
      title,
    })
  }

  const handleCloseSnackbar = () => {
    dispatch({})
  }

  return (
    <MessageContext.Provider
      value={{
        displaySuccess: displaySuccess,
        displayError: displayError,
        displayInfo,
      }}
    >
      <Suspense fallback={null}>
        <Modal {...modal} onClose={handleCloseSnackbar}></Modal>
        {/* <AlertModal {...modal} onClose={handleCloseSnackbar} /> */}
        {children}
      </Suspense>
    </MessageContext.Provider>
  )
}
