import React, { useState, FC } from "react";

type TableProps = {
  headers: string[];
  records: Object[];
};
const Table: FC<TableProps> = ({ headers, records }) => {
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

export { Table };
