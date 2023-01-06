import { Button } from "react-bootstrap"
import { BiTrash } from "react-icons/bi"
import '../App.css'

const AppointmentInfo = ({ appointment, onDeleteAppointment }) => {
  return (
    <li className="mb-5 mb-lg-3 mt-3 mx-3 d-flex">
      <Button 
        onClick={() => onDeleteAppointment(appointment.id)}
        type="button"
        // id="delete"
        className="d-flex align-self-center p-1 mx-1 rounded-2"
        variant="outline-cDark"
        style={{ height: '28px', width: '28px' }}
      >
        <BiTrash className="align-self-center" />
      </Button>
      <div className="px-2 w-100 d-flex flex-column justify-content-around" style={{ minHeight: '120px' }}>
        <div className="d-flex justify-content-between">
          <span className="fw-bold fs-4 text-cDark">{appointment.petName}</span>
          <span className="text-cLightish">{appointment.aptDate}</span>
        </div>
        <div className="container-100">
          <div>
            <span className="fw-bold text-cDark">
              Owner:{' '}
              <span className="ms-md-2 text-cDarkish col fw-normal">{appointment.ownerName}</span>
            </span>

          </div>
        </div>
        <div className="h-25 h-lg-100">
          <span className="text-cDarkish">{appointment.aptNotes}</span>
        </div>
      </div>
    </li>
  )
}

export default AppointmentInfo