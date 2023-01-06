import { useState, useEffect, useCallback } from 'react'
import { BiCalendar } from "react-icons/bi"
import './scss/main.scss'
import './App.css'
import Search from "./components/Search"
import AddAppointment from "./components/AddAppointment"
import AppointmentInfo from "./components/AppointmentInfo"
import { ListGroup } from 'react-bootstrap';

function App() {
// Has all the appointments that exist in the data.json 
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        // Checks the info on every appointment and if it includes the query it is returned, else it proceeds to the next item. NOTE -> the query string and info string is transformed to lowercase, so case doesn't matter, also it checks every info on every appointment(1st the petName, then the ownwerName etc)
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
    )
  })
// It is called once
  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        // Populate appointmentList state with the appointments from data.json
        setAppointmentList(data)
      });
  }, [])
// It is called only when fetchData changes
  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3" style={{minWidth: '300px'}}>
      <h1 className="mb-3 my-lg-5">
        <BiCalendar className="inline-block align-bottom" />Your Appointments</h1>
      <AddAppointment
        // Add the new appointment from formDataPublish to the appointmentList
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        // Has the largest value of all ids in appointmentList state. Every new appointment gets the largest id + 1
        lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
        // lastId gets the largest+1 of the current id values 
      />
        {/* All these below props of the Search component are given values in the child(Search component), and those values are passed through props to this parent(App component). Based on these values(query=filter, order=sort) the ListGroup component(child of the App component) displays the appropriate values, in the right order.*/}
      <Search 
        // prop that stores the value of the search param(query)
        query={query}
        // updates the state that handles the search param(query)(i.e. according to the search param the appointment list results are filtered to include the query)
        onQueryChange={myQuery => setQuery(myQuery)}
        // prop that stores the order of the sort, which determines whether or not a check is appended to a value of the dropdown list(second part of the dropdown list)
        orderBy={orderBy}
        // invokes the state that determines the order of the sort
        onOrderByChange={mySort => setOrderBy(mySort)}
        // prop that stores the value of the sort, which determines whether or not a check is appended to a value of the dropdown list(first part of the dropdown list)
        sortBy={sortBy}
        // prop that stores the value of the sort and updates the sort state, which sorts the search results
        onSortByChange={mySort => setSortBy(mySort)}
      />

      <ListGroup as="ul" className='mb-5'>
        {filteredAppointments
        // The appointment list has only the filtered items(If the user hasn't searched for sth, i.e. initial state, all appointments are displayed).
        // For each of the filteredAppointments a React component is created.
          .map(appointment => (
            // A unique key(id) is assigned to every list item. 
            <ListGroup.Item key={appointment.id}>
              <AppointmentInfo
              // appointment has the appointment obj info
                appointment={appointment}
                onDeleteAppointment={
                  appointmentId =>
                    setAppointmentList(appointmentList.filter(appointment =>
                      appointment.id !== appointmentId))
                }
              />
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  );
}

export default App;