import * as React from 'react'
import { Group } from 'react-konva'
import { Node } from 'konva'
import * as computeLayout from 'css-layout'

type NodeTree = {
  style: any
  children: any[]
}

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

type State = {
  layout: Object
  skip: boolean
}

class Flex extends React.Component<Props, State> {
  private childRefs: Node[] = []
  private skip: boolean = true

  state: Readonly<State> = {
    layout: { children: [] },
    skip: true
  }

  componentDidUpdate() {
    if (this.skip) {
      this.skip = !this.skip
      return
    }

    const child = this.childRefs[0]

    if (!child) return
    const nodeTree: NodeTree = {
      style: {
        width: 1424,
        height: 799,
        top: 0,
        left: 0,
        right: 1424,
        bottom: 799,
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: []
    }

    const rect = child.getClientRect()
    console.log('rect', rect)

    nodeTree.children.push({
      style: {
        left: rect.x,
        top: rect.y,
        right: rect.width,
        bottom: rect.height,
        width: rect.width,
        height: rect.height
      }
    })

    computeLayout(nodeTree)

    console.log('nodeTree', nodeTree)

    const newLayout = nodeTree.children[0].layout

    console.log('newLayout', newLayout)

    if (this.childRefs.length) {
      this.childRefs[0].setAbsolutePosition({
        x: newLayout.left,
        y: newLayout.top
      })
    }
  }

  render() {
    this.childRefs = []

    const { children } = this.props
    return (
      <Group>
        {React.Children.map(children, c =>
          React.cloneElement(c as React.ReactElement<any>, {
            ref: (n: Node) => n && this.childRefs.push(n)
          })
        )}
      </Group>
    )
  }
}

export default Flex
