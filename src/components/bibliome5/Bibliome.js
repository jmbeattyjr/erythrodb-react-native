import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
const data = require('./data_2.json')
import './bibliome.css'

export default class TestBootStrapTable extends Component {
  render() {
    const products = data
    const columns = [
      {
        dataField: 'Title',
        text: 'Title',
        formatter: linkCells,
        style: {
          width: '25vw'
        }
      },
      {
        dataField: 'Authors',
        text: 'Authors',
        style: {
          width: '10vw'
        }
      }
    ]

    const expandRow = {
      renderer: row => <div>{row.Abstract}</div>,
      showExpandColumn: true,
      expandByColumnOnly: true
    }

    const rowStyle = (row, rowIndex) => {
      const style = {}
      if (rowIndex % 2 === 0) {
        ;(style.backgroundColor = '#a36a6a25'), (style.height = '3vh')
      } else {
        ;(style.backgroundColor = 'white'), (style.height = '3vh')
      }

      return style
    }

    function linkCells(cell, row) {
      return <a href={row.Link}>{row.Title}</a>
    }

    return (
      <div id="bibliomeContainer">
        <h1>TODO...Bibliome Page</h1>
      </div>
    )
  }
}
