import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
  { 
    title: 'Bản đồ',
    path: '/user',
    icon: <BsIcons.BsPinMap />,
  },
  { 
    title: 'Bảng điều khiển',
    path: '/user/dashboard',
    icon: <BsIcons.BsFillKeyboardFill />,
  },
  { 
    title: 'Người dùng',
    path: '/user/info',
    icon: <BsIcons.BsPeople />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Thông tin',
    //     path: '/user/info',
    //     icon: <BsIcons.BsFillPersonVcardFill />
    //   },
    //   // {
    //   //   title: 'Quản lý xe',
    //   //   path: '/user/vehicles',
    //   //   icon: <BsIcons.BsCarFrontFill />
    //   // }
    // ]
  },
  {
    title: 'Dữ liệu',
    path: '/user/car1',
    icon: <BsIcons.BsFileEarmarkTextFill />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Phương tiện',
    //     path: '/user/car1',
    //     icon: <BsIcons.BsCarFrontFill />
    //   },
    //   // {
    //   //   title: 'Vision',
    //   //   path: '/user/car2',
    //   //   icon: <BsIcons.BsCarFrontFill />
    //   // }
    // ]
  },
  // {
  //   title: 'Thông báo',
  //   // path: '/user/noti',
  //   icon: <BsIcons.BsBellFill />
  // },
  {
    title: 'Hỗ Trợ',
    path: '/user/support',
    icon: <BsIcons.BsFillQuestionSquareFill />
  }
];
