import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./../../firebase";
import { useAuth } from "../pages/AuthContext";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
} from "@mui/material";

const QuestionList = () => {
  const { authUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "questions"), where("uid", "==", authUser.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchData();
  }, [authUser]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <Table style={{ minWidth: 500, border: '2px solid black' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ borderRight: '2px solid black', width: '50%' }}>Câu hỏi của bạn</TableCell>
            <TableCell style={{ width: '50%' }}>Phản hồi của quản trị viên</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : questions
          ).map((question) => (
            <TableRow key={question.id}>
              <TableCell style={{ borderRight: '2px solid black', width: '50%' }}>{question.question}</TableCell>
              <TableCell style={{ width: '50%' }}>{question.adminResponse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={questions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default QuestionList;
