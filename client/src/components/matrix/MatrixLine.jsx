import React from "react";
import MatrixCell from "./MatrixCell";
import PropTypes from "prop-types";
import { Component } from "react";
import { isEmpty } from "lodash";

class MatrixLine extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    let isLineSelected = false;
    let wasLineSelected = false;
    //check if the selected keys are in the line or if they were in the line
    function lineShouldUpdate(props, currentProps, test) {
      test = false;
      for (let i in props.selectedKeys) {
        if (Math.trunc(props.selectedKeys[i] / 10) === currentProps.index)
          test = true;
      }
      return test;
    }
    isLineSelected = lineShouldUpdate(nextProps, nextProps, isLineSelected);
    wasLineSelected = lineShouldUpdate(this.props, this.props, wasLineSelected);
    //check if the color selected is updated and the keys selected are in the line , if so, render
    if (
      (nextProps.colorSelected !== this.props.colorSelected &&
        !isEmpty(nextProps.selectedKeys)) ||
      ((isLineSelected || wasLineSelected) &&
        nextProps.selectedKeys !== this.props.selectedKeys)
    ) {
      return true;
    }
    return false;
  }
  render() {
    const { colorsArray, index, selectedKeys, colorSelected } = this.props;
    let cells = colorsArray.map((cellColor, j) => {
      let selected = selectedKeys.indexOf(index * 10 + j) > -1;
      if (selected && cellColor !== "gray") cellColor = colorSelected;
      return (
        <td
          key={j + index * 10}
          data-key={j + index * 10}
          className="selectable"
        >
          <MatrixCell color={cellColor} index={j + index * 10} />
        </td>
      );
    });
    return (
      <tr>
        <td>{index + 1}</td>
        {cells}
      </tr>
    );
  }
}
export default MatrixLine;

MatrixLine.propTypes = {
  colorsArray: PropTypes.array,
  selectedKeys: PropTypes.array,
  index: PropTypes.number,
  colorSelected: PropTypes.string,
};
