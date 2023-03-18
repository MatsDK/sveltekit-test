import { render } from 'preact'
import { App } from './app'
import './index.css'
import './app.postcss'

render(<App />, document.getElementById('app') as HTMLElement)
