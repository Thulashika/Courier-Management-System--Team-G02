import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

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
const ParcelsReady = React.lazy(() => import('./views/base/parcelsready/Ready'))
const ParcelsDelivered = React.lazy(() => import('./views/base/parcelsdelivered/Delivered'))
const ParcelsPicked = React.lazy(() => import('./views/base/parcelspicked/Picked'))
const ParcelUnsuccessfull = React.lazy(
  () => import('./views/base/parcelsunsuccessfull/Unsuccessfull'),
)

const TrackParcels = React.lazy(() => import('./views/trackparcels/Track'))
const Reports = React.lazy(() => import('./views/reports/Reports'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/trackparcels/Track'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/branch/new_branch', name: 'Branch / New Branch', element: AddNew },
  { path: '/branch/branch', name: 'Branch / List', element: List },
  { path: '/branchstaff/new_branchstaff', name: 'BranchStaff / New Staff', element: AddNewStaff },
  { path: '/branchstaff/branch_staff', name: 'BranchStaff / List', element: StaffList },
  { path: '/parcels/new_parcels', name: 'Parcels / New Parcels', element: NewParcels },
  { path: '/parcels/parcel_list', name: 'Parcels / List', element: ParcelList },
  { path: '/parcels/accepted', name: 'Parcels / Accepted', element: ParcelAccepted },
  { path: '/parcels/collected', name: 'Parcels / Collected', element: ParcelsCollected },
  { path: '/parcels/shipped', name: 'Parcels / Shipped', element: ParcelsShipped },
  { path: '/parcels/in_transit', name: 'Parcels / In Transit', element: ParcelsInTransit },
  { path: '/parcels/arrived', name: 'Parcels / Arrived', element: ParcelsArrived },
  { path: '/parcels/delivery', name: 'Parcels / Delivery', element: ParcelsDelivery },
  { path: '/parcels/ready', name: 'Parcels / Ready', element: ParcelsReady },
  { path: '/parcels/delivered', name: 'Parcels / Delivered', element: ParcelsDelivered },
  { path: '/parcels/picked', name: 'Parcels / Picked', element: ParcelsPicked },
  { path: '/parcels/unsuccessfull', name: 'Parcels / Unsuccessfull', element: ParcelUnsuccessfull },
  { path: '/track_parcels', name: 'Track Parcels', element: TrackParcels },
  { path: '/reports', name: 'Reports', element: Reports },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
