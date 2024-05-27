// Support.js

import { Box, TextField, Button } from "@mui/material";
import Header from "./header";
import { useState } from "react";
import { useAuth } from "../pages/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./../../firebase";
import QuestionList from "./questionList"; // Thêm import này

const Support = () => {
  const { authUser, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userQuestion: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { userQuestion, userName, userEmail } = formData;

    console.log("userQuestion:", userQuestion);
    console.log("userName:", userName);
    console.log("userEmail:", userEmail);

    try {
      if (userQuestion && userName && userEmail && authUser) {
        const docRef = await addDoc(collection(db, "questions"), {
          uid: authUser.uid,
          name: userName,
          email: userEmail,
          question: userQuestion,
          adminResponse: "",
        });

        console.log("Document written with ID: ", docRef.id);
      } else {
        console.error("Missing required form elements");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Box m="20px 20px 20px 240px" minWidth="32rem">
      <Header
        title="Hỗ trợ người dùng"
        subtitle="Liên hệ với chúng tôi khi bạn có câu hỏi hoặc gặp vấn đề khi sử dụng LOCA"
      />
      <Box display="flex" justifyContent="left">
        <div style={{ display: "flex", width: "100%" }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            maxWidth="70vw"
            minWidth="40vw"
            sx={{
              "& .MuiTextField-root": {
                m: "1.5rem 1.5rem 0 1.5rem",
                minWidth: "40%",
                maxWidth: "90%",
              },
            }}
            noValidate
            autoComplete="on"
            backgroundColor="#FFF6F6"
            borderRadius="20px"
            display="grid"
            justifyContent="center"
          >
            <Box display="flex" justifyContent="space-between">
              <TextField
                required
                id="userName"
                label="Tên"
                type="text"
                color="success"
                fullWidth
                onChange={handleInput}
              />
              <TextField
                required
                id="userEmail"
                label="Email"
                type="email"
                color="success"
                fullWidth
                onChange={handleInput}
              />
            </Box>
            <Box>
              <TextField
                required
                multiline
                fullWidth
                id="userQuestion"
                label="Nhập câu hỏi của bạn"
                helperText="Góp ý của bạn về LOCA"
                rows={10}
                color="success"
                onChange={handleInput}
              />
            </Box>
            <Button
              type="submit"
              sx={{
                backgroundColor: "green",
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: "normal",
                margin: "1.5rem 1.5rem",
                padding: "10px 20px",
                "&:hover": { backgroundColor: "red" },
              }}
            >
              Xác nhận
            </Button>
          </Box>

          {/* Question List */}
          <div style={{ marginLeft: "20px" }}>
            <QuestionList />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Support;
