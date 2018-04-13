import * as React from 'react'
import { Flex, Heading, Button, Theme } from 'rebass'
import { withTheme } from 'styled-components'
import styled from '../styled'

const BorderBottom = styled.div`
  border-bottom: 1px solid ${props => props.theme!.colors!.gray1};
`
interface Props {
  theme?: Theme
}

class Header extends React.Component<Props> {
  render() {
    const { theme } = this.props
    return (
      <BorderBottom>
        <Flex justify="space-between">
          <Heading m={3}>Zendigi</Heading>
          <Flex align="center">
            <Button mr={3} bg={theme!.colors!.cyan}>
              Add event
            </Button>
          </Flex>
        </Flex>
      </BorderBottom>
    )
  }
}

export default withTheme(Header)
