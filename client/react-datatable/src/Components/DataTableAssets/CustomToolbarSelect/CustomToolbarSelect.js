import React from "react";
import { useSelector } from "react-redux";
import ValidationCheckButton from "./ValidationCheck/ValidationCheckButton";
import DeselectAllButton from "./DeselectAll/DeselectAllButton";
import CutButton from "./RowShifting/CutButton";

export default function CustomToolbarSelect(props) {
  const isSorted = useSelector((state) => state.table.isSorted);
  const isFilterApplied = useSelector((state) => state.filter.isFilterApplied);

  const params = props.params;

  return (
    <div>
      <DeselectAllButton setSelectedRows={props.setSelectedRows} />
      {/*
      Row shifting cut button
      {isSorted || isFilterApplied ? <></> : <CutButton />} 
      */}
      <ValidationCheckButton params={params} />
    </div>
  );
}
