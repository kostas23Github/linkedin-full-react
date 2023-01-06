import { BiCalendarPlus } from "react-icons/bi";
import { useState } from 'react';
import { FloatingLabel, Form, FormGroup, Button, Collapse } from "react-bootstrap";

const AddAppointment = ({ onSendAppointment, lastId }) => {
  // The initial state prior to adding an appointment.
  const clearData = {
    ownerName: '',
    petName: '',
    aptDate: '',
    aptTime: '',
    aptNotes: ''
  }
  // State for handling the show/hide addAppointment form.
  const [toggleForm, setToggleForm] = useState(false)
  // State for storing the addApointment form data.
  const [formData, setFormData] = useState(clearData)

  const formDataPublish = () => {
    const appointmentInfo = {
      id: lastId + 1,
      ownerName: formData.ownerName,
      petName: formData.petName,
      aptDate: formData.aptDate + ' ' + formData.aptTime,
      aptNotes: formData.aptNotes
    }
    // This prop(declared in parent comp) adds the new appointment(appointmentInfo) to the appointmentList.
    onSendAppointment(appointmentInfo)
    setFormData(clearData) // Clears the formData state(resets it to empty).
    setToggleForm(!toggleForm) // Closes the addAppointment form.
  }

  return (
    <div>
      <Button
        onClick={() => { setToggleForm(!toggleForm) }}
        className={`addAppointment px-2 py-3 w-100 text-start
        `}
        variant="outline-cDark"
      >
        <div><BiCalendarPlus className="align-text-top" />  Add Appointment</div>
      </Button>
      {
        <Collapse in={toggleForm}>
          <Form className="container">
            <FormGroup className="mx-2 mt-4">
              <FloatingLabel htmlFor="ownerName" label="Owner Name"
                className="fw-bold">
                <Form.Control type="text" name="ownerName" id="ownerName"
                  onChange={(event) => { setFormData({ ...formData, ownerName: event.target.value }) }}
                  value={formData.ownerName}
                  placeholder="ownerName" />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="mx-2 my-3">
              <FloatingLabel htmlFor="petName" className="fw-bold" label="Pet Name">
                <Form.Control
                  type="text"
                  name="petName"
                  id="petName"
                  onChange={(event) => { setFormData({ ...formData, petName: event.target.value }) }}
                  value={formData.petName}
                  placeholder="petName"
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="mx-2 my-3">
              <FloatingLabel htmlFor="aptDate" label="Date" className="fw-bold">
                <Form.Control
                  type="date"
                  name="aptDate"
                  id="aptDate"
                  onChange={(event) => { setFormData({ ...formData, aptDate: event.target.value }) }}
                  value={formData.aptDate}
                  placeholder="aptDate" />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="mx-2 my-3">
              <FloatingLabel htmlFor="aptTime" label="Date" className="fw-bold">
                <Form.Control type="time" name="aptTime" id="aptTime"
                  onChange={(event) => { setFormData({ ...formData, aptTime: event.target.value }) }}
                  value={formData.aptTime}
                  placeholder="Time" />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="mx-2 my-3">
              <FloatingLabel htmlFor="aptNotes" label="Notes" className="fw-bold">
                <Form.Control as="textarea" id="aptNotes" name="aptNotes"
                  onChange={(event) => { setFormData({ ...formData, aptNotes: event.target.value }) }}
                  value={formData.aptNotes}
                  placeholder="Detailed comments about the condition" />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="d-flex justify-content-end mx-2">
              <Button type="submit" variant="outline-cDark" onClick={formDataPublish} className="px-4">
                Submit
              </Button>
            </FormGroup>
          </Form>
        </Collapse>
      }
    </div >
  )
}

export default AddAppointment