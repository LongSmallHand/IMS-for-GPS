import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
//   MDBBtn,
//   MDBProgress,
//   MDBProgressBar,
//   MDBIcon,
//   MDBListGroup,
//   MDBListGroupItem
} from 'mdb-react-ui-kit';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { personalData } from '../../data/personalData';
// import personalData from '../../data/personalData'

const data = personalData;

export default function Info() {
  return (
    <>
    <MDBRow>
        <section style={{margin: '0 0 0 160px', backgroundColor: 'white'}}>
        <MDBContainer className="py-4">
            <MDBRow>
            <MDBCol lg="10">
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                    <a href='/user'>Home</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Thông tin cá nhân</MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol lg="4">
                <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                    <MDBCardImage
                    src= {data[0].url} 
                    alt="avatar"
                    className="rounded-circle mb-4"
                    style={{ width: '200px' }}
                    fluid />
                    <p className="text-muted mb-1">{data[0].username}</p>
                    <div className="d-flex justify-content-center mb-2">
                    {/* <MDBBtn>Follow</MDBBtn>
                    <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                    </div>
                </MDBCardBody>
                </MDBCard>

                {/* <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>https://mdbootstrap.com</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                        <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText>@mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText>mdbootstrap</MDBCardText>
                    </MDBListGroupItem>
                    </MDBListGroup>
                </MDBCardBody>
                </MDBCard> */}
            </MDBCol>

            <MDBCol lg="6">
                <MDBCard className="mb-4">
                <MDBCardBody>
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Họ và tên</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                        <MDBCardText className="text-muted">{data[0].name}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                        <MDBCardText className="text-muted">{data[0].email}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Số điện thoại</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                        <MDBCardText className="text-muted">{data[0].phone}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Địa chỉ</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                        <MDBCardText className="text-muted">{data[0].address}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCard>

                {/* <MDBRow>
                <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                        </MDBProgress>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                        <MDBProgress className="rounded">
                        <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                        </MDBProgress>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow> */}
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </section>
    </MDBRow>
    </>
  );
}