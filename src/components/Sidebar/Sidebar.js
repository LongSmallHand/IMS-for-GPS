import styled from 'styled-components';
import SubMenu from './SubMenu';
import {Typography, Button, Stack} from '@mui/material';

import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';
import { useAuth } from '../pages/AuthContext';
import { signOut } from 'firebase/auth';

const SidebarNav = styled.nav`
  background: #15171c;
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  transition: 350ms;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const {authUser, signOut} = useAuth();
  // const isLoggedIn = authUser !== null;//check if 
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <SidebarNav>
          <SidebarWrap>
            {SidebarData.map((item, index) => {return <SubMenu item={item} key={index} />;})}
            <div>
      <Stack direction="column" spacing={5} sx={{ alignItems: "center", marginTop: "100px" }}>
      <Typography variant="h8" sx={{ flexGrow: 1, textAlign: "center", color: "white" }}>
        Xin chào, <br />
        {authUser?.email}
      </Typography>
      {/* Logout button */}
      <Button variant="text" sx={{ color: 'red', border: '1px solid red', borderRadius: '4px', flexGrow: 1 }} onClick={signOut}>
        Logout
      </Button>
      </Stack>
    </div>
        </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;