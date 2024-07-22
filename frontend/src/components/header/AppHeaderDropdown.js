import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar10 from './../../assets/images/avatars/10.jpg'
import axios from 'axios'

const AppHeaderDropdown = () => {

  const [user, setUser] = []
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:6431/userStatus/${user}`);
        setUserStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching user status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  },[user])

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {/* { userStatus === 'login' ? <CAvatar src={avatar10} status="success"/> :
          <CAvatar color="secondary" status="danger">TB</CAvatar>
        } */}
        <CAvatar color="success">YT</CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="/settings">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="/landingPage">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
