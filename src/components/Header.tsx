import * as React from 'react'
import { Flex, Heading } from 'rebass'
import styled from '../styled'

const BorderBottom = styled.div`
  border-bottom: 1px solid ${props => props.theme!.colors!.gray1};
`

class Header extends React.Component {
  render() {
    return (
      <BorderBottom>
        <Flex>
          <Heading m={3}>Zendigi</Heading>
        </Flex>
      </BorderBottom>
    )
  }
}

export default Header
