import { Link } from "react-router-dom";

function FunctionalList(props) {
    return (
        <div>
            <h1>Users list with FC</h1>
            <ul>
                <li>
                    <Link to="/add">Create user</Link>

                </li>
            </ul>
        </div>
    )
}

export default FunctionalList;