import React from "react";
import PropTypes from "prop-types";
import "./MatrixCell.css";

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
    console.log("cell updated");
  }

  render() {
    return (
      <div
        data-key={this.props.index}
        ref={this.Caseref}
        className="matrixCell"
        key={this.props.index}
      ></div>
    );
  }
}
export default MatrixCell;

MatrixCell.propTypes = {
  color: PropTypes.string,
  index: PropTypes.number,
};
