/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { colors } from "../../pages/colors.js";
import MatrixLine from "./MatrixLine";
import PropTypes from "prop-types";
import "./Matrix.css";
import SelectionArea, { SelectionEvent } from "@viselect/react";

export default function Matrix(props: any) {
  let { colorSelected, reset, headers, setReset } = props;
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    setReset(false);
  }, [selected]);

  //if reset btn is clicked initialize the selection of matrix cells
  useEffect(() => {
    if (reset) setSelected(() => new Set());
  }, [reset]);

  const extractIds = (els: Element[]): number[] =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  //clear selcetion when starting a new one
  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  //when selecting, we set the selected set with the data-key of the cells selected
  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  return (
    <div>
      <SelectionArea
        onStart={onStart}
        onMove={onMove}
        selectables=".selectable"
      >
        <table className="matrix">
          <thead>
            <tr>
              {headers.map((header: any, i: any) => (
                <th key={i}> {header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colors.map((line, i) => (
              <MatrixLine
                colorsArray={line}
                index={i}
                key={i}
                colorSelected={colorSelected}
                selectedKeys={Array.from(selected)}
              />
            ))}
          </tbody>
        </table>
      </SelectionArea>
    </div>
  );
}

Matrix.propTypes = {
  colorSelected: PropTypes.string,
  headers: PropTypes.array,
  reset: PropTypes.bool,
  setReset: PropTypes.func,
};
