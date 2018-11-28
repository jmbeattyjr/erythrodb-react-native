import h from 'react-hyperscript'
import SVGIcon from './SVGIcon'
export default (props) => (
  h(SVGIcon, props, [
    h('path', {
      d: 'M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z',
    })
  ])
)
