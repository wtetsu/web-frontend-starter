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
          {headers.map((h: string) => (
            <th>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((rec: { [s: string]: string }, i) => (
          <tr>
            <td>{i}</td>
            {headers.map((h: string) => (
              <td>{rec[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
