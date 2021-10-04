import React from "react";
import PropTypes from "prop-types";
import "./MatrixCell.css";
import { createSelectable } from "react-selectable";

class MatrixCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.Caseref = React.createRef();
  }
  componentDidMount() {
    this.Caseref.current.style.backgroundColor = this.props.color;
  }
  componentDidUpdate() {
    this.Caseref.current.style.backgroundColor = this.props.color;
    // console.log("cell updated");
  }

  render() {
    return <div ref={this.Caseref} className="matrixCell"></div>;
  }
}
export default createSelectable(MatrixCell);

MatrixCell.propTypes = {
  color: PropTypes.string,
};
