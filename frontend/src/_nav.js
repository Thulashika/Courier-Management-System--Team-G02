import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilChatBubble,
  cilFile,
  cilIndustry,
  cilNotes,
  cilSpeedometer,
  cilUserPlus,
} from '@coreui/icons'
import {  CNavItem} from '@coreui/react'

  const _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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
      icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      roles: ['ADMIN', 'MANAGER']
    },
    {
      component: CNavItem,
      name: 'Branch',
      to: '/branch',
      icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
      roles: ['ADMIN', 'MANAGER']
    },
    {
      component: CNavItem,
      name: 'BranchStaff',
      to: '/staff',
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      roles: ['ADMIN', 'MANAGER']
    },
    {
      component: CNavItem,
      name: 'Contact Us',
      to: '/contactus',
      icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
      roles: ['ADMIN', 'MANAGER']
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
    // {
    //   component: CNavItem,
    //   name: 'Docs',
    //   href: 'https://coreui.io/react/docs/templates/installation/',
    //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    // },
  ]

export default _nav
