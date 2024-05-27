import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { collection, getDocs,getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./../../firebase";
import { tokens } from "./theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsSnapshot = await getDocs(collection(db, "questions"));
        const questionsData = questionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedQuestions = questionsData.sort((a, b) =>
      a.adminResponse ? 1 : b.adminResponse ? -1 : 0
    );

    setQuestions(sortedQuestions);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleResponse = async (questionId, adminResponse) => {
    try {
      // Get the current question data
      const questionDoc = await getDoc(doc(db, "questions", questionId));
  
      if (questionDoc.exists()) {
        const currentQuestionData = questionDoc.data();
  
        // Update the question data with admin response
        await setDoc(doc(db, "questions", questionId), {
          ...currentQuestionData,
          adminResponse,
        });
  
        console.log("Admin response saved successfully");
      } else {
        console.error("Question not found");
      }
    } catch (error) {
      console.error("Error saving admin response: ", error);
    }
  };
  return (
    <Box m="20px">
      <Header title="PHẢN HỒI" subtitle="Giải quyết các yêu cầu từ người dùng" />

      {questions.map((question) => (
        <Accordion key={question.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={"black"} variant="h5">
              Từ người dùng: {question.name} <br/>
              <br/>
              {question.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{question.adminResponse}</Typography>
            <Box display="flex" justifyContent={"space-between"} sx={{ marginTop: "1rem" }}>
              <TextField
                variant="outlined"
                type="text"
                label="Trả lời"
                sx={{ fontSize: "1rem", maxWidth: "75%", minWidth: "70%" }}
                value={question.adminResponse}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  const index = newQuestions.findIndex((q) => q.id === question.id);
                  newQuestions[index].adminResponse = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
              <Button
                type="submit"
                color="secondary"
                sx={{ fontSize: "0.8rem", right: "20px", maxWidth: "20%" }}
                onClick={() => handleResponse(question.id, question.adminResponse)}
              >
                Xác nhận
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
