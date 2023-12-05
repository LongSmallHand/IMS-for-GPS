import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Collapse, Box } from '@mui/material';
import '../../App.css';

function About() {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => { setExpanded(!expanded); };
  const [expanded_1, setExpanded_1] = React.useState(false);
  const handleExpandClick_1 = () => { setExpanded_1(!expanded_1); };
  const [expanded_2, setExpanded_2] = React.useState(false);
  const handleExpandClick_2 = () => { setExpanded_2(!expanded_2); };
  return (
    <>
      <Navbar />
      <Card sx={{ maxWidth: "90%", margin: "3rem 5%", borderRadius:"2rem"}}>
      <CardActionArea onClick={handleExpandClick} sx={{display: "flex"}}>
        <CardMedia
          component="img"
          sx={{width:"40%"}}
          image="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Find LOCAtion"
        />
        <CardContent sx={{width:"60%", padding:"0 1rem"}}>
          <Typography gutterBottom sx={{ fontSize:"2vw", fontWeight:"500", lineHeight:"120%", color:"chocolate"}}  component="div">
          Sản phẩm thuộc Đồ án tốt nghiệp - Kỹ thuật máy tính
          </Typography>
          <Typography paragraph sx={{ fontSize:"1.2vw", lineHeight:"150%"}}>
          LOCA là một hệ thống quản lý thông tin định vị tích hợp tập trung vào vấn đề
          quản lý các dữ liệu GPS của phương tiện giao thông. LOCA tập trung vào việc hỗ trợ người dùng kiểm soát và theo dõi các hoạt động di chuyển cũng như trạng thái của các phương tiện được định vị trên bản đồ theo thời gian thực.
          </Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography paragraph sx={{ fontSize:"1.2vw", lineHeight:"160%"}}>  
          Các thành phần chính của hệ thống bao gồm:
          <ul>
          <li><strong style={{color:"chocolate"}}>Hệ thống định vị:</strong> sử dụng thiết bị GPS nhằm thu nhập thông tin vị trí
          của các đối tượng/thiết bị cần quản lý.</li>
          <li><strong style={{color:"chocolate"}}>Hệ thống lưu trữ và xử lý dữ liệu:</strong> dữ liệu vị trí thu được từ các thiết bị
          GPS sẽ được lưu lại trong cơ sở dữ liệu và được xử lý để hiển thị trên bản
          đồ.</li>
          <li><strong style={{color:"chocolate"}}>Hệ thống thống kê:</strong> cung cấp các thông tin, báo cáo/thống kê chi tiết về
          trạng thái hoặc hoạt động của các đối tượng, giúp việc quản lý trở nên dễ
          dàng hơn.</li>
          <li><strong style={{color:"chocolate"}}>Hệ thống cảnh báo:</strong> gửi thông tin, cảnh báo tới người dùng khi phát hiện
          thiết bị gặp sự cố ngoài ý muốn.</li>
          <li><strong style={{color:"chocolate"}}>Giao diện người dùng:</strong> cung cấp một giao diện đơn giản và thân thiện với
          người dùng, giúp người dùng dễ dàng thao tác, quản lý các thiết bị của mình.</li>
          </ul>
          </Typography>     
          </Collapse>
        </CardContent>
      </CardActionArea>
      </Card>
      
      <Card sx={{ maxWidth: "90%", margin: "3rem 5%", borderRadius:"2rem"}}>
      <Typography sx={{ marginTop: "1rem", fontSize:"2rem", fontWeight:"500", textAlign:"center", color:"royalblue"}}>Các thành viên trong nhóm</Typography>
        <Box display="flex" justifyContent="space-evenly" marginTop="1rem">
          <Box display="grid" width="40%" alignSelf="self-start">
          <CardActionArea onClick={handleExpandClick_1}>
          <CardMedia
            component="img"
            sx={{width:"100%", borderRadius:"30px"}}
            image="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/324899152_1205122843543895_826493646284260765_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=BryPpADpEwcAX9T-mBA&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCVpceNfjQ51dAcu8WpV-caVKfM4u05ZfZBRzIjbeyDOA&oe=65719EDE"
            alt="Member"
          />
          </CardActionArea>
          <CardContent>
            <Collapse in={expanded_1} timeout="auto" unmountOnExit>    
              <Typography sx={{ fontSize:"2vw", fontWeight:"400", textAlign:"center", color:"royalblue"}}>
                Lê Thành Long - MSSV: 1913991
              </Typography>
            </Collapse>
          </CardContent>
          </Box>

          <Box display="grid" width="40%" alignSelf="self-start">
          <CardActionArea onClick={handleExpandClick_2}>
          <CardMedia
            component="img"
            sx={{width:"100%", borderRadius:"30px"}}
            image="https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/60750374_2467859853495686_3481265873254088704_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_ohc=3VWbJtkf3McAX9EJKva&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfABvpqn2hd-bzbicdW0NxdFzmgrwet5v_1myYjJZtvqeQ&oe=6594D670"
            alt="Member"
          />
          </CardActionArea>
          <CardContent>
            <Collapse in={expanded_2} timeout="auto" unmountOnExit>    
              <Typography sx={{ fontSize:"2vw", fontWeight:"400", textAlign:"center", color:"royalblue"}}>
                Trần Đình Nghĩa - MSSV: 1914325
              </Typography>
            </Collapse>
          </CardContent>
          </Box>
        </Box>
      </Card>
      <Footer />
    </>
  );
}

export default About;