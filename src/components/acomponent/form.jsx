import { Box, Button, TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      // Save the form data to the 'admin' collection in Firestore
      const docRef = await addDoc(collection(db, 'admin'), values);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="THÊM THÀNH VIÊN" subtitle="Tạo tài khoản cho Quản trị viên mới" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Họ và Tên đệm"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số điện thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="age"
                label="Tuổi"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 1" }}
              />  
              <FormControl>
              <InputLabel id="select-access-level" variant="filled">Quyền truy cập</InputLabel>
              <Select
                fullWidth
                labelId="select-access-level"
                value={values.accesslevel}
                label="Quyền truy cập"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                name="accesslevel"
                error={!!touched.accesslevel && !!errors.accesslevel}
                helperText={touched.accesslevel && errors.accesslevel}
                variant="filled"
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
              </Select>  
              </FormControl>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" sx={{fontSize:"1rem"}}>
                Tạo tài khoản
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{3,4}[ -]?)|(\([0-9]{3}\)[ -]?)|([0-9]{3})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Bắt buộc"),
  lastName: yup.string().required("Bắt buộc"),
  email: yup.string().email("invalid email").required("Bắt buộc"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không tồn tại")
    .required("Bắt buộc"),
  age: yup.number().min(1).required("Bắt buộc").typeError("Tuổi phải là một số nguyên dương"),
  accesslevel: yup.string().required("Bắt buộc"),
});
const initialValues = {
  lastName: "",
  firstName: "",
  email: "",
  contact: "",
  age:"",
  accesslevel:"",
};

export default Form;