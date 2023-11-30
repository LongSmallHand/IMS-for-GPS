import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  { 
    title: 'Bản đồ',
    path: '/user',
    icon: <AiIcons.AiFillHome />,
  },
  { 
    title: 'Người dùng',
    // path: '',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Thông tin',
        path: '/user/info',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Quản lý xe',
        path: '/user/vehicles',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Dữ liệu',
    // path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Phương tiện 1',
        path: '/user/car1',
        icon: <IoIcons.IoIosPaper />
        // cName: 'sub-nav'
      },
      {
        title: 'Phương tiện 2',
        path: '/user/car2',
        icon: <IoIcons.IoIosPaper />
        // cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Thông báo',
    path: '/user/noti',
    icon: <FaIcons.FaCartPlus />
  },
  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />
  // },
  // {
  //   title: 'Messages',
  //   path: '/messages',
  //   icon: <FaIcons.FaEnvelopeOpenText />,

  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Message 1',
  //       path: '/messages/message1',
  //       icon: <IoIcons.IoIosPaper />
  //     },
  //     {
  //       title: 'Message 2',
  //       path: '/messages/message2',
  //       icon: <IoIcons.IoIosPaper />
  //     }
  //   ]
  // },
  {
    title: 'Hỗ Trợ',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];
