import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './App'
import TimelineStore from './stores/TimelineStore'

const timelineStore = TimelineStore.create()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider timelineStore={timelineStore}>
      <App />
    </Provider>,
    div
  )
})
