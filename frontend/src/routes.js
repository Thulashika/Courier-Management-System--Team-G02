import React, { useContext } from 'react'
import { AuthContext } from './views/pages/register/AuthProvider';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Home = React.lazy(() => import('./views/home/Home'))
const Ourservices = React.lazy(() => import('./views/OurServices/Ourservices'))
const Contactus = React.lazy(() => import('./views/contactus/Contactus'))
const Findus = React.lazy(() => import('./views/findus/Findus'))

// Branch
const AddNew = React.lazy(() => import('./views/base/branch/AddNew'))
const List = React.lazy(() => import('./views/base/branch/List'))
const UpdateBranch = React.lazy(() => import('./views/base/branch/UpdateBranch'))

// BranchStaff
const AddNewStaff = React.lazy(() => import('./views/base/staff/AddNewStaff'))
const StaffList = React.lazy(() => import('./views/base/staff/StaffList'))
const UpdateStaff = React.lazy(() => import('./views/base/staff/UpdateStaff'))


//Parcels
const NewParcels = React.lazy(() => import('./views/base/parcel/NewParcels'))
const ParcelList = React.lazy(() => import('./views/base/parcel/ParcelList'))
const UpdateParcel = React.lazy(() => import('./views/base/parcel/UpdateParcel'))
const Details = React.lazy(() => import('./views/base/parcel/Details'))

const TrackParcels = React.lazy(() => import('./views/trackparcels/Track'))
const Reports = React.lazy(() => import('./views/reports/Reports'))

// const { userDetails } = useContext(AuthContext)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/branch/new_branch', name: 'New Branch', element: AddNew },
  { path: '/branch/updateBranch', exact: true, name: 'Update Branch', element: UpdateBranch },
  { path: '/branch', name: 'Branch', element: List },
  { path: '/staff/new_branchstaff', name: 'New Staff', element: AddNewStaff },
  { path: '/staff/updateStaff',  exact: true, name: 'Update Staff', element: UpdateStaff },
  { path: '/staff', name: 'Branch Staff', element: StaffList },
  { path: '/parcels/new_parcels', name: 'New Parcels', element: NewParcels },
  { path: '/parcels/editViewParcel',  exact: true, name: 'Update Parcel', element: UpdateParcel },
  { path: '/parcels', name: 'Parcels List', element: ParcelList },
  { path: '/parcels/details', name: 'Parcel Details', element: Details },
  { path: '/track_parcels', name: 'Track Parcels', element: TrackParcels },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/home', name: 'Home', element: Home },
  { path: '/ourservices', name: 'Ourservices', element: Ourservices},
  { path: '/contactus', name: 'Contact us', element: Contactus},
  { path: '/findus', name: 'Find us', element: Findus}
]

export default routes
