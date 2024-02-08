import React from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Row } from "../../redux/tableSlice";
import moment from "moment";

interface TableProps {
  data: Row[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <MUITable>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Weekdays</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>
                {Object.entries(row.weekdays)
                  ?.filter(([_day, value]) => value)
                  .map(
                    ([day, value], index, arr) =>
                      value && (
                        <>
                          <span>
                            {index === arr.length - 1 && index !== 0 && " and "}
                          </span>
                          <span key={day}>
                            {day}
                            {index < arr.length - 2 && ", "}
                          </span>
                        </>
                      )
                  )}
              </TableCell>
              <TableCell>
                <span>{row.gender}</span>
              </TableCell>
              <TableCell>{moment(row.dob)?.format("DD/MM/YYYY")}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => onEdit(row.id)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => onDelete(row.id)}
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
