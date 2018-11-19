import React, { Component } from 'react'
import './bibliome.css'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { Table, Column, Cell } from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

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
    this.state = {
      data: [
        {
          firstName: 'The influence of surface charge density of phosphatides on the binding of some cations',
          lastName: 'Smith',
          age: 25,
          visits: 20,
          progress: 30,
          status: 'single',
          expand:
            'Surface potentials of mixtures of synthetic phosphatides dispersed in uni-univalent electrolyte have been calculated from the limiting molecular areas through use of the Gouy equation. Electrophoretic mobilities of the dispersed particles were measured and used to calculate zeta potentials from the Hehnholtz-Smoluchowski equation. In analogy with several structurally related systems, the ratio (zeta potential/surface potential) was found to be unity at low surface charge density (u < 20,000 e.s.u. cm-z), decreasing progressively at higher surface charge density to a minimum of 0.58. The zeta potential at low surface charge density is appreciably affected by the composition of the fatty acyl substituents to the extent that this determines the cross-sectional area per net negative charge in the bilayer. Charge reversal concentrations have been measured for various metal ions on several phosphatide surfaces differing in charge density. Inserting the conditions for charge reversal into the Stern equation, the standard free energy of adsorption for each cation was calculated and used to obtain a value for the logarithm of the apparent association constant, K’. At an initial surface charge density below 20,000 e.s.u. cm-z, the sequence of values of log K’ was Ag < Ba < Sr < Ni < Mg < Ca < Co < Zn < Cu < Mn < Pb < Cd < La < Ce < Th < UOn. Comparison of log K’ for magnesium, calcium, strontium, and barium as a function of surface charge density suggests that the larger cations are able to form ion triplets at high surface charge density while the smaller cations are unable to do so. The high affinity of U022+ for phosphatide surfaces is also considered. The results obtained are discussed in terms of their potential applicability to several problems of current biochemical interest.'
        }
      ],
      rows: ['first row', 'second row', 'third row']
    }
  }

  render() {
    const { data, rows } = this.state

    return (
      <div className="bibliome-body">
        <div>
          <h1>TODO...Bibliome Page</h1>
          <h1>THIS IS ONLY A TEST</h1>
        </div>
        <div className="table">
          <ReactTable
            data={data}
            columns={[
              {
                expander: true,
                Header: () => <strong>More</strong>,
                width: 65,
                Expander: ({ isExpanded, ...rest }) => <div>{isExpanded ? <span>&#9662;</span> : <span>&#9656;</span>}</div>,
                style: {
                  cursor: 'pointer',
                  fontSize: 25,
                  padding: '0',
                  textAlign: 'center',
                  userSelect: 'none'
                }
              },

              {
                Header: 'Title',
                accessor: 'firstName',
                minWidth: 100,
                maxWidth: 200,
                style: { 'white-space': 'unset' }
              },
              {
                Header: 'Authors',
                accessor: 'lastName',
                minWidth: 50,
                maxWidth: 100
              },
              {
                Header: 'Journal',
                accessor: 'lastName'
              },
              {
                Header: 'Year',
                accessor: 'lastName'
              },
              {
                Header: 'Description',
                accessor: 'lastName'
              }
            ]}
            defaultPageSize={20}
            style={{
              height: '60vh',
              width: '90vw'
            }}
            className="-striped -highlight"
            SubComponent={() => <div style={{ padding: '10px' }}>{data[0].expand}</div>}
          />
        </div>
        {/* <div>
          <Table rowHeight={50} rowsCount={rows.length} width="20vw" maxHeight="60vh" headerHeight={50}>
            <Column header={<Cell>Col 1</Cell>} cell={<Cell>Column 1 static content</Cell>} width={2000} />
            <Column header={<Cell>Col 2</Cell>} cell={<Cell>Column 2 static content</Cell>} width={1000} />
          </Table>
        </div> */}
      </div>
    )
  }
}

export default Bibliome
