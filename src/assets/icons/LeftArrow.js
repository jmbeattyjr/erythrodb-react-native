import h from 'react-hyperscript'
import SVGIcon from './SVGIcon'
export default (props) => (
  h(SVGIcon, props, [
    h('path', {
      d: 'M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z',
    })
  ])
)
