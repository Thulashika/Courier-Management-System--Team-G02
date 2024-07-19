import React from 'react'
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
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
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
        <CDropdownItem href="/login">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
