import { Link } from "react-router-dom";

function List(props) {
    return (
        <div>
            <h1>Users list with FC</h1>
            <ul>
                <li>
                    <Link to="/user">Create user</Link>

                </li>
            </ul>
        </div>
    )
}

export default List;