import React, { useContext } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilChatBubble,
  cilFile,
  cilHappy,
  cilHome,
  cilIndustry,
  cilNotes,
  cilSpeedometer,
  cilStar,
  cilTruck,
  cilUser,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem} from '@coreui/react'
import { AuthContext } from './views/pages/register/AuthProvider'

// const { userDetails } = useContext(AuthContext)

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Branch',
    to: '/branch',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'BranchStaff',
    to: '/staff',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Parcels',
    to: '/parcels',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Track Parcels',
    to: '/track_parcels',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />
  },
  // {
  //   component: CNavItem,
  //   name: 'Home',
  //   icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  //   to: '/home'
  // },
  {
    component: CNavItem,
    name: 'Ourservices',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    to: '/ourservices'
  },
  {
    component: CNavItem,
    name: 'Contact us',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    to: '/contactus'
  },
  {
    component: CNavItem,
    name: 'Find us',
    icon: <CIcon icon={cilHappy} customClassName="nav-icon" />,
    to: '/findus'
  },  
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
