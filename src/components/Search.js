import { BiSearch, BiCheck } from "react-icons/bi"
import { IconContext } from "react-icons"
import { SplitButton, Form, InputGroup, Dropdown } from "react-bootstrap";


const Search = ({ query, onQueryChange, sortBy, onSortByChange, orderBy, onOrderByChange }) => {

  return (
    <>
      <InputGroup className="my-5">
        <InputGroup.Text className="border-cDark bg-white">
          {/* https://github.com/react-icons/react-icons */}
          <IconContext.Provider 
            value={{ color: "#363062", size: '1.5rem', title: 'search-icon', style: { background: "white" } }}>
            <BiSearch />
          </IconContext.Provider>
        </InputGroup.Text>
        <Form.Control
          as="input"
          type="text"
          name="query"
          value={query}
          onChange={(event) => { onQueryChange(event.target.value) }}
          className="pl-2 border-cDark"
          placeholder="Search"
          aria-label="Search input with dropdown filter/sort results button"
        />
        <SplitButton
          // https://react-bootstrap.github.io/components/dropdowns/#overview
          type="button"
          title="Sort By"
          autoClose="inside"
          variant="outline-cDark"
          align='end'>
          {/* On every dropdown element, if the appointment list is sorted by that element, a check symbol is added at the end of it. This is accomplished bc the 1st part of the equation is evaluated to true. The sortBy var holds the string by which the sort is done, so onSortByChange('petName') sets the sortBy var to 'petName'.*/}
          <Dropdown.Item
            onClick={() => onSortByChange('petName')}
            className={`${sortBy === 'petName' ? 'text-cDark' : 'text-cLightish'}`}>
            Pet Name {(sortBy === 'petName') && <BiCheck />}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onSortByChange('ownerName')}
            className={`${sortBy === 'ownerName' ? 'text-cDark' : 'text-cLightish'}`}>
            Owner Name {(sortBy === 'ownerName') && <BiCheck />}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onSortByChange('aptDate')}
            className={`${sortBy === 'aptDate' ? 'text-cDark' : 'text-cLightish'}`}>
            Date {(sortBy === 'aptDate') && <BiCheck />}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => onOrderByChange('asc')}
            className={`${orderBy === 'asc' ? 'text-cDark' : 'text-cLightish'}`}>
            Asc {(orderBy === 'asc') && <BiCheck />}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onOrderByChange('desc')}
            className={`${orderBy === 'desc' ? 'text-cDark' : 'text-cLightish'}`}>
            Desc {(orderBy === 'desc') && <BiCheck />}
          </Dropdown.Item>
        </SplitButton>
      </InputGroup>
    </>
  )
}

export default Search