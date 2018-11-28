import React, { Component } from 'react'
import './Bibliome.css'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { Table, Column, Cell } from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'
import dataList from './data.json'

const { CollapseCell } = require('../../lib/cells.js')
const { StyleSheet, css } = require('aphrodite')

const styles = StyleSheet.create({
  expandStyles: {
    'background-color': 'white',
    border: '1px solid #d3d3d3',
    'box-sizing': 'border-box',
    padding: '20px',
    // overflow: "hidden",
    width: '100%',
    height: '200px !important',
    'text-align': 'left'
  },
  leftStyles: {
    'text-align': 'left'
  },
  centerStyles: {
    'text-align': 'center'
  }
})

// function to search all fields of data table for terms
function independent_set_search(string_to_search, search_string) {
  let array_to_search = string_to_search.split(' ')
  let array_search_string = search_string.split(' ')

  // create result array of all false
  let is_relevant_array = array_search_string.map(item => {
    return false
  })

  // split up search terms and see if all terms match somewhere in provided content
  for (let i = 0; i < array_to_search.length; i++) {
    for (let j = 0; j < array_search_string.length; j++) {
      if (array_to_search[i].indexOf(array_search_string[j]) > -1) {
        is_relevant_array[j] = true
      }
    }
  }

  // if any are false, return false...means that there is not content
  for (let k = 0; k < is_relevant_array.length; k++) {
    if (is_relevant_array[k] === false) {
      return false
    }
  }

  // all were true, so return
  return true
}

class DataListWrapper extends React.Component {
  constructor(indexMap, data) {
    super(indexMap, data)
    this._indexMap = indexMap
    this._data = data
  }

  getSize() {
    return this._indexMap.length
  }

  getObjectAt(index) {
    return this._data[this._indexMap[index]]
  }
}

class Bibliome extends React.Component {
  constructor(props) {
    super(props)
    this._dataList = new DataListWrapper([...Array(dataList.data.length).keys()], dataList.data)
    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      jsonData: dataList,
      filteredDataList: this._dataList,
      columnWidths: {
        Title: 400,
        Authors: 200,
        Year: 50,
        Journal: 179,
        Description: 325
      }
    }

    this._handleCollapseClick = this._handleCollapseClick.bind(this)
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this)
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this)
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this)

    // hack for fixing redirect issue upon refresh with route 53
    if (window.location.hash === '#/bibliome') {
      browserHistory.push('/bibliome')
    }
  }

  _handleCollapseClick(rowIndex) {
    const { collapsedRows } = this.state
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows])
    let scrollToRow = rowIndex
    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex)
      scrollToRow = null
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex)
    }

    this.setState({
      scrollToRow: scrollToRow,
      collapsedRows: shallowCopyOfCollapsedRows
    })
  }

  _subRowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 200 : 0
  }

  _rowExpandedGetter({ rowIndex, width, height }) {
    if (!this.state.collapsedRows.has(rowIndex)) {
      return null
    }

    let { filteredDataList } = this.state

    const style = {
      height: height,
      width: width - 2
    }
    return (
      <div style={style}>
        <div className={css(styles.expandStyles)}>{filteredDataList.getObjectAt(rowIndex)[7]}</div>
      </div>
    )
  }

  _onFilterChange(e) {
    if (!e.target.value || e.target.value.length < 3) {
      this.setState({
        filteredDataList: this._dataList
      })
      return
    }

    var filterBy = e.target.value.toLowerCase()
    var size = this._dataList.getSize()
    var filteredIndexes = []
    for (var index = 0; index < size; index++) {
      let result = independent_set_search(
        this._dataList
          .getObjectAt(index)
          .join(' ')
          .toLowerCase(),
        filterBy
      )

      if (result === true) {
        filteredIndexes.push(index)
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, dataList.data)
    })
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth
      }
    }))
  }

  componentDidMount() {
    document.title = 'Bibliome'
  }

  render() {
    let { collapsedRows, scrollToRow, filteredDataList, columnWidths } = this.state

    return (
      <div className={'container'}>
        <div className="logo2" />
        <div className={'menu'}>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/viewer'}>Map</Link>
            </li>
            <li>
              <Link to={'/repository'}>Repository</Link>
            </li>
          </ul>
        </div>
        <div className="bibliome-content">
          <div className="bibliome-title">Bibliome</div>
        </div>

        <div id="table">
          <div>
            <input
              className="search-bar"
              onChange={this._onFilterChange.bind(this)}
              placeholder={'🔎  Search...'}
              style={{
                padding: 15,
                marginBottom: 15,
                marginLeft: 0,
                borderRadius: 5,
                background: 'whitesmoke',
                border: '1px solid #ccc',
                textAlign: 'left',
                fontSize: 'larger',
                width: 1100
              }}
            />
            <span
              style={{
                marginLeft: 15,
                fontWeight: 'bold',
                fontStyle: 'italic'
              }}
            >
              {filteredDataList._indexMap.length} results
            </span>
          </div>
          <Table
            scrollToRow={scrollToRow}
            rowHeight={75}
            rowsCount={filteredDataList.getSize()}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
            isColumnResizing={false}
            headerHeight={50}
            width={1200}
            height={600}
            {...this.props}
          >
            <Column
              cell={<CollapseCell id="arrow-click" callback={this._handleCollapseClick} collapsedRows={collapsedRows} />}
              fixed={true}
              width={30}
            />
            <Column
              columnKey="Title"
              header={<Cell className={css(styles.centerStyles)}>Title</Cell>}
              cell={({ rowIndex, ...props }) => {
                return (
                  <Cell {...props}>
                    <Link target="_blank" to={filteredDataList.getObjectAt(rowIndex)[9]}>
                      <link_text>{filteredDataList.getObjectAt(rowIndex)[0]}</link_text>
                    </Link>
                  </Cell>
                )
              }}
              fixed={true}
              width={columnWidths.Title}
              isResizable={true}
              minWidth={100}
            />
            <Column
              columnKey="Authors"
              header={<Cell className={css(styles.centerStyles)}>Authors</Cell>}
              cell={({ rowIndex, ...props }) => {
                return (
                  <Cell {...props} className={css(styles.centerStyles)}>
                    {filteredDataList.getObjectAt(rowIndex)[1]}
                  </Cell>
                )
              }}
              fixed={true}
              width={columnWidths.Authors}
              isResizable={true}
              minWidth={100}
              maxWidth={200}
            />
            <Column
              columnKey="Journal"
              header={<Cell className={css(styles.centerStyles)}>Journal</Cell>}
              cell={({ rowIndex, ...props }) => {
                return (
                  <Cell {...props} className={css(styles.centerStyles)}>
                    <span style={{ fontStyle: 'italic' }}>{filteredDataList.getObjectAt(rowIndex)[2]}</span>
                  </Cell>
                )
              }}
              fixed={true}
              width={columnWidths.Journal}
              isResizable={true}
              minWidth={100}
              maxWidth={200}
            />
            <Column
              columnKey="Year"
              header={<Cell className={css(styles.centerStyles)}>Year</Cell>}
              cell={({ rowIndex, ...props }) => {
                return (
                  <Cell {...props} className={css(styles.centerStyles)}>
                    {filteredDataList.getObjectAt(rowIndex)[3]}
                  </Cell>
                )
              }}
              fixed={true}
              width={columnWidths.Year}
              isResizable={false}
            />
            <Column
              columnKey="Description"
              header={<Cell className={css(styles.centerStyles)}>Description</Cell>}
              cell={({ rowIndex, ...props }) => {
                return (
                  <Cell {...props} className={css(styles.leftStyles)}>
                    {filteredDataList.getObjectAt(rowIndex)[6]}
                  </Cell>
                )
              }}
              fixed={true}
              width={columnWidths.Description}
              isResizable={true}
              minWidth={150}
            />
          </Table>
        </div>
        <div className="bibliome-copyright-info">© 2017 Regents of the University of California. All Rights Reserved.</div>
      </div>
    )
  }
}

export default Bibliome
