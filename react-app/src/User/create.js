import { Link } from "react-router-dom";

function CreateUser(props) {
    return (
        <div>
            <h1>Create user</h1>
            <ul>
                <li><Link to="/flist">Go to FC list</Link></li>
                <li><Link to="/list">Go to CC list</Link></li>
            </ul>
        </div>
    )
}

export default CreateUser;