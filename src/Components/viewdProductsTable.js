import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import { ConvertToArabicNumbers } from "../Helper/ArabicNumbers";
import { ConvertToArabicDates } from "../Helper/ArabicDate";

const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");
export default function ViewedProductsTable(props) {
  const history = useHistory();
  const [arabic] = useState((data) => (ar ? true : false));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: dark ? "#2a2a2a" : theme.palette.action.hover,
      border: 0,
    },
    "&:nth-of-type(even)": {
      backgroundColor: dark ? "#424242" : "#fff",
      border: 0,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper} className={`table ${arabic ? "ar" : ""}`}>
      <Table id="viewed-table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell id={arabic ? "ar" : ""}>
              {arabic ? "الصورة" : "Image"}
            </TableCell>
            <TableCell id={arabic ? "ar" : ""} align="left">
              {arabic ? "الأسم" : "Title"}
            </TableCell>
            <TableCell id={arabic ? "ar" : ""} align="left">
              {arabic ? "السعر" : "Price"}
            </TableCell>
            <TableCell id={arabic ? "ar" : ""} align="left">
              {arabic ? "وقت العرض" : "Viewed at"}
            </TableCell>
            {/* <TableCell align="left"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((product) => (
            <StyledTableRow
              key={product.id}
              onClick={() => history.push(`pid=${product.id}`)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={product.image}
                  alt={product.id}
                  width="60"
                  height="60"
                />
              </TableCell>
              <TableCell align="left" className={ar ? "ar" : ""}>
                {ar ? product.title_ar : product.title}
              </TableCell>
              <TableCell align="left" className={ar ? "ar" : ""}>
                {ar
                  ? ConvertToArabicNumbers(product.price.toFixed(2))
                  : product.price.toFixed(2)}{" "}
                {ar ? "جم" : "L.E"}
              </TableCell>
              <TableCell align="left" className={ar ? "ar" : ""}>
                {ar
                  ? ConvertToArabicDates(
                      new Date(product.viewed_at).getDay(),
                      new Date(product.viewed_at).getDate(),
                      new Date(product.viewed_at).getMonth(),
                      new Date(product.viewed_at).getFullYear()
                    )
                  : new Date(product.viewed_at).toDateString()}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
