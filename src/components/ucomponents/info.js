import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Button, useTheme } from "@mui/material";
import { tokens } from "./theme";
import { personalData } from '../../data/personalData';
import Header from './header';
import * as BsIcons from "react-icons/bs";

const data = personalData;
export default function Info() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <>
    <MDBRow style={{width: 'max-content'}}>
        <section style={{margin: '0 0 0 200px', backgroundColor: 'white'}}>
        <MDBContainer className="py-4" style ={{margin: '0 0 0 0', padding:'0 0 0 50px'}}>
            <MDBRow style={{width: '100%'}}>
            <MDBCol lg="8"><Header title = "Thông tin cá nhân"/></MDBCol>
            <MDBCol lg="4">
                <Button
                    sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "20px",
                    fontWeight: "normal",
                    margin: "15px 20px",
                    padding: "10px 40px",
                    }}
                >
                    <BsIcons.BsTools style={{ margin: "0 10px 0 0"}} />
                    Chỉnh sửa
                </Button>
            </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol lg="4">
                <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                    <MDBCardImage
                    src= {data[0].url} 
                    alt="avatar"
                    style={{ 
                        margin: '20px 0',
                        "border-radius": '50%',
                        "maxHeight": '150px',
                        "maxWidth" : '150px',
                        "clipPath" : 'circle()'
                        }}
                    fluid />
                    <p className="text-muted mb-1">{data[0].username}</p>
                    <div className="d-flex justify-content-center mb-2">
                    </div>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol lg="7">
                <MDBCard className="mb-4">
                <MDBCardBody>
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Họ và tên</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                        <MDBCardText className="text-muted">{data[0].name}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                        <MDBCardText className="text-muted">{data[0].email}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Số điện thoại</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                        <MDBCardText className="text-muted">{data[0].phone}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Địa chỉ</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                        <MDBCardText className="text-muted">{data[0].address}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </section>
    </MDBRow>
    </>
  );
}