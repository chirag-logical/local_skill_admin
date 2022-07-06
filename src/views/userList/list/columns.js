// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = (row) => {
  if (row?.profilePictureUrl !== null) {
    return <Avatar className='me-1' img={row?.profilePictureUrl} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color='light-primary'
        content={row?.firstName}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    job_seeker: {
      class: 'text-primary',
      icon: User
    },
    employer: {
      class: 'text-success',
      icon: Database
    },
    freelancer: {
      class: 'text-info',
      icon: Edit2
    },
    service: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row?.role?.name] ? roleObj[row?.role?.name]?.icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row?.role?.name] ? roleObj[row?.role?.name]?.class : ''} me-50`} />
      {row?.role?.name}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '250px',
    sortField: 'fullName',
    selector: row => row?.firstName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/userList/view/${row?.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row?.id))}
          >
            <span className='fw-bolder'>{row?.firstName} {row?.lastName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row?.emailAddress}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: (row) => row?.role,
    cell: (row) => renderRole(row)
  },
  {
    name: 'Phone No',
    minWidth: '138px',
    sortable: true,
    sortField: 'mobilePhone',
    selector: row => row?.mobilePhone,
    cell: row => <span className='text-capitalize'>{row?.mobilePhone}</span>
  },
  {
    name: 'address',
    minWidth: '230px',
    sortable: true,
    sortField: 'address',
    selector: row => row?.address,
    cell: row => <span className='text-capitalize'>{row?.address?.slice(0, 100)}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row?.isVerified,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row?.isVerified === true ? 'active' : 'inactive']} pill>
        {row?.isVerified === true ? 'active' : 'inactive'}
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/userList/view/${row?.id}`}
              onClick={() => store.dispatch(getUser(row?.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
