import h from 'react-hyperscript'
import SVGIcon from './SVGIcon'
export default (props) => (
  h(SVGIcon, props, [
  	h('path', {
      d: 'M0 0h24v24H0z',
      fill:'none'
    }),
    h('path', {
      d: 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z',
    })
  ])
)
