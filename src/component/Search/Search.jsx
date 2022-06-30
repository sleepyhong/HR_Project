import {Stack, Form, Button} from 'react-bootstrap';

function Search ({search, setSearch}) {
    return (
        <Stack direction="horizontal" gap={2} className="my-3">
            <Form.Control 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="me-auto" 
                placeholder="Search users by first, last, preferred names ..." />
            <Button variant="dark">Search</Button>
        </Stack>
    )
}

export default Search;