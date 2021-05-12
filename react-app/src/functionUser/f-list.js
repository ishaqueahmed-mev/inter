import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Pagination } from "../common/pagination";
import Search from "../common/search";

function FunctionalList(props) {
    const [userData, setUserData] = useState([]);
    const [state, setState] = useState({
        url: 'http://localhost:3000/users',
        profileUrl: 'http://localhost:3000/uploads',
        dataLimit: 10,
        extraParams: {}
    });
    const [currentPage, setCurrentPage] = useState(1);
    // const [userLength, setUserLength] = useState(0);
    const userLength = useRef()
    const [pageCounts, setPageCount] = useState([]);

    useEffect(() => {
        fetchData()
    }, [currentPage, state.extraParams]);

    const fetchData = async () => {
        let userObj = {
            'startLimit': (currentPage - 1) * state.dataLimit,
            'endLimit': state.dataLimit,
            ...state.extraParams
        };
        // console.log('userObj ', userObj)
        const result = await axios.get(`${state.url}`, { params: userObj });
        // console.log(result)
        let data = [...result.data.data];
        // setUserLength(result.data.length)
        userLength.current = result.data.length;
        filterData(data);
    };

    const filterData = (arg) => {
        let data = [...arg]
        data.map(x => {
            x.profile = x.profile ? `${state.profileUrl}/${x.profile}` : 'assets/images/noimage.jpeg';
            return x;
        })
        setUserData(data)
        setPageCount([])
        setPagination()
    }

    const setPagination = () => {
        let length = (userLength.current / state.dataLimit) + 1;
        let arr = []
        for (let i = 0; i < length - 1; i++) {
            arr.push(i + 1)
        }
        setPageCount(arr)
    }

    const switchPage = (arg) => {
        setCurrentPage(+arg)
        // fetchData()
    }

    const setProfileImage = (evt) => {
        evt.target.src = "noimage.jpeg";
    }

    const search = (e) => {
        let s = e.target.value
        setState(state => ({ ...state, extraParams: { 'search': s } }));
        setCurrentPage(1); // So to avoid data limit issue on search
    }

    const deleteUser = (id) => {
        let confirm = window.confirm('Are you sure to delete the user?');
        if (!confirm) return;
        axios.delete(`http://localhost:3000/users/${id}`).then(result => {
            fetchData(); // To update list // And MF fires twice id userlength is use as a state, so ued as a ref
            
            // Workout without pagination
            // let delIndex = this.userData.findIndex(u => u._id == id);
            // if (delIndex != -1) this.userData.splice(delIndex, 1);
        }).catch(err => console.log(err))
    }

    const rows = userData.length > 0 && userData.map((user, i) => (
        <tr key={user._id}>
            <th scope="row">{(i + 1) + ((currentPage - 1) * state.dataLimit)}</th>
            {/* <th scope="row">{i + 1}</th> */}
            <td>
                <img alt={user.firstName} src={user.profile} className="profile" onError={setProfileImage} />
            </td>
            <td>
                {user.firstName + user.lastName}
            </td>
            <td>{user.email}</td>
            <td>
                {user.dob}
            </td>
            <td>
                {/* <input type="button" className="action" value="Edit" onClick={this.edit.bind(this, user._id)} />  <br /> */}
                <Link to={`/edit/${user._id}`}>
                    <input type="button" className="action" value="Edit" />
                </Link>
                <input type="button" className="action" onClick={deleteUser.bind(this, user._id)} value="Delete" />
            </td>
        </tr >

    ));

    return (
        <div>
            <h1>Users list with FC</h1>
            <ul>
                <li>
                    <Link to="/add">Create user</Link>
                </li>
            </ul>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Search
                            searchEvent={search.bind(this)}
                        ></Search>
                        {/* <p>{this.state.currentPage}</p> */}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"></th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div >
                <Pagination
                    currentPage={currentPage}
                    pageCounts={pageCounts}
                    pageChange={switchPage.bind(this)}
                >
                </Pagination>
            </div >
        </div>
    )
}

export default FunctionalList;