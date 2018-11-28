import h from 'react-hyperscript'

const SVGIcon = ({ width = 24, height= 24, scale = 1, fill, children, isStaticSize = false }) => (
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: isStaticSize? width * scale : (width * scale)*0.1 + 'vw',
    height: isStaticSize? width * scale : (height * scale)*0.1 + 'vw',
    viewBox: `0 0 ${width * scale} ${height * scale}`,
    fillRule:"nonzero",
    fill
  }, [
    h('g', {
      transform: `scale(${scale})`
    }, children)
  ])
)

export default SVGIcon
