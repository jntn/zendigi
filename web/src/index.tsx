import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TimelineStore from './stores/TimelineStore'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import 'normalize.css'

configure({ enforceActions: 'always', computedRequiresReaction: true })

const timelineStore = TimelineStore.create()

ReactDOM.render(
  <Provider timelineStore={timelineStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
