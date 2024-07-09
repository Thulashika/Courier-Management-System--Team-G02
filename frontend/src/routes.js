import { element } from 'prop-types'
import React from 'react'
// import Ourservices from './views/OurServices/Ourservices'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Home = React.lazy(() => import('./views/home/Home'))
const Ourservices = React.lazy(() => ('./views/OurServices/Ourservices'))

// Branch
const AddNew = React.lazy(() => import('./views/base/addnewbranch/AddNew'))
const List = React.lazy(() => import('./views/base/branchlist/List'))

// BranchStaff
const AddNewStaff = React.lazy(() => import('./views/base/addnewbranchstaff/AddNewStaff'))
const StaffList = React.lazy(() => import('./views/base/branchstafflist/StaffList'))

//Parcels
const NewParcels = React.lazy(() => import('./views/base/newparcels/NewParcels'))
const ParcelList = React.lazy(() => import('./views/base/parcelslist/ParcelList'))
const ParcelAccepted = React.lazy(() => import('./views/base/parcelsaccepted/ParcelsAccepted'))
const ParcelsCollected = React.lazy(() => import('./views/base/parcelscollected/ParcelsCollected'))
const ParcelsShipped = React.lazy(() => import('./views/base/parcelsshipped/ParcelsShipped'))
const ParcelsInTransit = React.lazy(() => import('./views/base/parcelsintransit/ParcelsInTransit'))
const ParcelsArrived = React.lazy(() => import('./views/base/parcelsarrived/Arrived'))
const ParcelsDelivery = React.lazy(() => import('./views/base/parcelsdelivery/Delivery'))
const ParcelsDelivered = React.lazy(() => import('./views/base/parcelsdelivered/Delivered'))
const ParcelsPicked = React.lazy(() => import('./views/base/parcelspicked/Picked'))
const ParcelUnsuccessfull = React.lazy(
  () => import('./views/base/parcelsunsuccessfull/Unsuccessfull'),
)

const TrackParcels = React.lazy(() => import('./views/trackparcels/Track'))
const Reports = React.lazy(() => import('./views/reports/Reports'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/branch/new_branch', name: 'New Branch', element: AddNew },
  { path: '/branch', name: 'Branch', element: List },
  { path: '/branch_staff/new_branchstaff', name: 'New Staff', element: AddNewStaff },
  { path: '/branch_staff', name: 'Branch Staff', element: StaffList },
  { path: '/parcels/new_parcels', name: 'New Parcels', element: NewParcels },
  { path: '/parcels', name: 'Parcels List', element: ParcelList },
  { path: '/parcels', name: 'Parcels Accepted', element: ParcelAccepted },
  { path: '/parcels', name: 'Parcels Collected', element: ParcelsCollected },
  { path: '/parcels', name: 'Parcels Shipped', element: ParcelsShipped },
  { path: '/parcels', name: 'Parcels In Transit', element: ParcelsInTransit },
  { path: '/parcels', name: 'Parcels Arrived', element: ParcelsArrived },
  { path: '/parcels', name: 'Parcels Delivery', element: ParcelsDelivery },
  { path: '/parcels', name: 'Parcels Delivered', element: ParcelsDelivered },
  { path: '/parcels', name: 'Parcels Picked', element: ParcelsPicked },
  { path: '/parcels', name: 'Parcels Unsuccessfull', element: ParcelUnsuccessfull },
  { path: '/track_parcels', name: 'Track Parcels', element: TrackParcels },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/user', name: 'User', element: Home },
  // { path: '/ourservices', name: 'Ourservices', element: Ourservices}
]

export default routes
