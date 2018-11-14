import * as React from 'react'
import { styled } from 'reakit'

const BorderBottom = styled.div`
  border-bottom: 1px solid lightgray;
`

class Header extends React.Component {
  render() {
    return (
      <BorderBottom>
        <h1>Zendigi</h1>
      </BorderBottom>
    )
  }
}

export default Header
