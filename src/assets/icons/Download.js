import h from 'react-hyperscript'
import SVGIcon from './SVGIcon'
export default (props) => (
  h(SVGIcon, props, [
    h('path', {
      d: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z',
    })
  ])
)
