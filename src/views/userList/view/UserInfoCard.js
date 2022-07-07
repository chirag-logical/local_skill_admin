// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Badge } from 'reactstrap'

// ** Third Party Components
import { Check, Briefcase } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const roleColors = {
  job_seeker: 'light-info',
  employer: 'light-danger',
  freelancer: 'light-warning',
  service: 'light-success',
  admin: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const UserInfoCard = ({ selectedUser }) => {

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.profilePictureUrl !== null) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser?.profilePictureUrl}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser?.firstName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser?.firstName} {selectedUser?.lastName}</h4>
                  {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser?.role?.name]} className='text-capitalize'>
                      {selectedUser?.role?.name}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>1.23k</h4>
                <small>Tasks Done</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>568</h4>
                <small>Projects Done</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Username:</span>
                  <span>{selectedUser?.firstName} {selectedUser?.lastName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email:</span>
                  <span>{selectedUser?.emailAddress}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser?.isVerified === true ? 'active' : 'inactive']}>
                    {selectedUser?.isVerified === true ? 'active' : 'inactive'}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Role:</span>
                  <span className='text-capitalize'>{selectedUser?.role?.name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedUser?.mobilePhone}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Address:</span>
                  <span>{selectedUser?.address}</span>
                </li>
              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
