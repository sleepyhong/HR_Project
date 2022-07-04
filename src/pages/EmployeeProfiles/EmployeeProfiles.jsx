import { useEffect, useState } from 'react';
import { Accordion, Stack } from 'react-bootstrap';
import EmployeeProfile from './EmployeeProfile';
import Search from '../../component/Search/Search';
import { setUser } from "../../redux/userAction";

const EmployeeProfiles = () => {

    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/profiles')
            res.json().then(data => setUsers(data))
        }
        fetchUsers()
    }, [])

    const displayedUsers = [...users]

        // order users alphabetically by last name
        .sort((a, b) => a.lastName.localeCompare(b.lastName))

        // type in the employee’s first name, last name, preferred name
        .filter(user => (
            (user.firstName.toLowerCase().includes(search.toLowerCase())) ||
            (user.lastName.toLowerCase().includes(search.toLowerCase())) ||
            (user.preferredName.toLowerCase().includes(search.toLowerCase()))
        ))

    return (
        <div>
            <h3 className="text-center mt-3">Employee Profiles</h3>

            <Stack direction="horizontal">
                <p className="text-secondary">Number of users: {users.length}</p>
                <p className="text-secondary ms-auto">Users are ordered alphabetically by last names</p>
            </Stack>
            <Search search={search} setSearch={setSearch} />
            <Accordion>
                {displayedUsers.map(user => <EmployeeProfile key={user._id} user={user} /> )}
            </Accordion>
        </div>
    )
};

export default EmployeeProfiles;