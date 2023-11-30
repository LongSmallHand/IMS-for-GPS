import styled from 'styled-components';
import SubMenu from './SubMenu';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';

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
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <SidebarNav>
          <SidebarWrap>
            {SidebarData.map((item, index) => {return <SubMenu item={item} key={index} />;})}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;