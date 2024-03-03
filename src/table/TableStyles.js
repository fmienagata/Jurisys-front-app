// TableStyles.js
import styled from 'styled-components'

const Styles = styled.div`
  padding: 0rem;

  table {
    border-spacing: 0;

    width: -webkit-fill-available;
    justify-content: center; /* Centre horizontalement */
    align-items: center; /* Centre verticalement */

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      padding: 0.2rem;
    }
    td {
      margin: 0;
      padding: 0.2rem;
      :last-child {
        border-right: 0;
      }
    }
  }
  .center {
    justify-content: center; /* Centre horizontalement */
    align-items: center; /* Centre verticalement */
  }
`

export default Styles
