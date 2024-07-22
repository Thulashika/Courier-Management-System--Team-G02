import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { sygnet } from '../assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'
import { GlobalStateContext } from '../views/pages/login/Login'
import axios from 'axios'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [user, setUser] = useState('')

  const state = useSelector(state => state.authChangeState);

  const [role, setRole] = useState('');

  // useEffect(() => {
  //   axios(`http://localhost:6431/fetchRole?email=${state.email}`, {
  //     method: 'GET',
  //   }).then(res => {
  //     if(res.data.statusCode === 200) {
  //       setRole(res.data.role);
  //     }
  //   })
  // }, [])

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        {/* {state} */}
        <CSidebarBrand to="/">
        {
          role === 'ADMIN' ? <h4>Admin</h4> :
          role === 'STAFF' ? <h4>Staff</h4> :
          role === 'CUSTOMER' ? <h4>Customer</h4> :
          null
        }
          
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
