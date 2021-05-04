import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "../classUser/user.css";
import { Pagination } from "../common/pagination";
import Search from "../common/search";

export class ClassList extends Component {
    dataLimit = 10;
    extraParams = {};

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            pageCounts: [],
            userLength: '',
            currentPage: 1
        }
        // this.switchPage = this.switchPage.bind(this)
    }

    componentDidMount() {
        console.log('I am a class component')
        this.getUsers();
    }

    getUsers() {
        console.log('this.state.currentPage ', this.state.currentPage)
        let userObj = {
            'startLimit': (this.state.currentPage - 1) * this.dataLimit,
            'endLimit': this.dataLimit,
            ...this.extraParams
        };
        axios.get(`http://localhost:3000/users`, { params: userObj })
            .then(res => {
                let uData = res.data.data
                this.setState({
                    userData: uData,
                    userLength: res.data.length,
                    pageCounts: []
                });
                this.filterData()
                this.setPagination()
                console.log('Users :: ', this.state.userData, this.state.userLength)
            })
            .catch(err => console.log('Error :: ', err))
    }

    setPagination() {
        let length = (this.state.userLength / this.dataLimit) + 1;
        for (let i = 0; i < length - 1; i++) {
            this.setState(prevState => ({
                pageCounts: [...prevState.pageCounts, i + 1]
            }))
        }
    }

    filterData() {
        let userData = [...this.state.userData]
        userData.map(x => {
            x.profile = x.profile ? `${'http://localhost:3000/uploads/'}${x.profile}` : 'assets/images/noimage.jpeg';
            return x;
        })
        this.setState({
            userData: userData
        })
    }

    setProfileImage(evt) {
        evt.target.src = "noimage.jpeg";
    }

    delete(id) {
        let confirm = window.confirm('Are you sure to delete the user?');
        if (!confirm) return;
        axios.delete(`http://localhost:3000/users/${id}`).then(result => {
            this.getUsers(); // To update list

            // Workout without pagination
            // let delIndex = this.userData.findIndex(u => u._id == id);
            // if (delIndex != -1) this.userData.splice(delIndex, 1);
        }).catch(err => console.log(err))
    }

    edit(id) {
        console.log(id)
        return (
            <Redirect
                to={`/user/${id}`}
            />
        )
    }

    switchPage(arg) {
        this.setState({ currentPage: +arg }, function () {
            this.getUsers(); // Inside setState cb, bcoz setstate not mutating immediately, or use async-await
        });
    }

    search(e) {
        console.log(e.target.value)
        let s = e.target.value;
        this.extraParams['search'] = s;
        this.getUsers();
    }

    render() {
        let userData = [...this.state.userData];
        let rows = userData.map((user, i) => (
            <tr key={user._id}>
                <th scope="row">{(i + 1) + ((this.state.currentPage - 1) * this.dataLimit)}</th>
                <td>
                    <img alt={user.firstName} src={user.profile} className="profile" onError={this.setProfileImage} />
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
                    <input type="button" className="action" onClick={this.delete.bind(this, user._id)} value="Delete" />
                </td>
            </tr >

        ))

        return (
            <div>
                <h1>Users list with CC</h1>
                <ul>
                    <li>
                        <Link to="/add">Create user</Link>
                    </li>
                </ul>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Search
                                searchEvent={this.search.bind(this)}
                            ></Search>
                            <p>{this.state.currentPage}</p>
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
                        currentPage={this.state.currentPage}
                        pageCounts={this.state.pageCounts}
                        pageChange={this.switchPage.bind(this)}
                    >
                    </Pagination>
                </div >
            </div >
        )
    }
}