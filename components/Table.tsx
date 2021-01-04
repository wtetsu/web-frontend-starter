import React, { useState, FC } from "react";

type TableProps = {
  headers: string[];
  records: { [key: string]: Object }[];
  horizontal?: boolean;
};
const Table: FC<TableProps> = (props) => {
  if (props.horizontal) {
    return HorizontalTable(props);
  }
  return VerticalTable(props);
};

const VerticalTable: FC<TableProps> = ({ headers, records }) => {
  return (
    <table className="table is-striped is-hoverable">
      <thead>
        <tr>
          <th></th>
          {headers.map((h: string, i: number) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((rec: { [s: string]: string }, i) => (
          <tr key={i}>
            <td>{i}</td>
            {headers.map((h: string, i: number) => (
              <td key={i}>{rec[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const HorizontalTable: FC<TableProps> = ({ headers, records }) => {
  const recs = headers.map((h) => records.map((r) => r[h]));

  return (
    <table className="table is-striped is-hoverable">
      <tbody>
        {recs.map((values, i) => (
          <tr key={`tr${i}`}>
            <th>{headers[i]}</th>
            {values.map((val, j) => (
              <td key={`td${j}`}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
