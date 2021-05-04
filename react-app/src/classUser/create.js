import React, { Component } from "react";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import axios from "axios";

export class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hobbyData: [],
            typeData: [],
            formObj: {
                firstName: '',
                lastName: '',
                email: '',
                type: '',
                profile: '',
                hobbies: [],
                dob: new Date()
            },
            editId: '',
            submitted: false,
            emailPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params && this.props.match.params.id) {
            this.setState({ editId: this.props.match.params.id }, () => {
                this.getEditData()
            })
        } else {
            this.getHobbies();
            this.getTypes();
        }
    }

    getEditData() {
        const id = this.state.editId;
        axios.get(`http://localhost:3000/users/get-user-by-id/${id}`).then(res => {
            let editData = res.data.data;
            editData['dob'] = new Date(editData['dob'])
            editData['type'] = editData['type']._id;
            editData['hobbies'] = editData['hobbies'].map(h => h._id)
            for (const key in this.state.formObj) {
                const element = this.state.formObj[key];
                const editElement = editData[key];
                this.setState({
                    formObj: {
                        ...this.state.formObj, [key]: editData[key]
                    }
                })
            }
            this.getHobbies();
            this.getTypes();
        }).catch(err => console.log(err))
    }

    getHobbies() {
        axios.get('http://localhost:3000/hobby').then(res => {
            let hobbyData = res.data.data;
            let dataIntoHobby = [];
            hobbyData.map(h => (
                dataIntoHobby.push({
                    key: h._id,
                    label: h.name
                })
            ))
            this.setState({ hobbyData: dataIntoHobby });
        }).catch(err => console.log(err))
    }

    getTypes() {
        axios.get('http://localhost:3000/type').then(res => {
            let typeData = res.data.data;
            this.setState({ typeData: typeData });
        }).catch(err => console.log(err))
    }

    setStartDate(date) {
        this.setState(state => ({
            formObj: { ...state.formObj, dob: date }
        }))
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(state => ({
            formObj: { ...state.formObj, [name]: value }
        }))
    }

    handleSelect(selected) {
        this.setState(state => ({
            formObj: { ...state.formObj, hobbies: selected }
        }))
    }

    onFileSelect(e) {
        this.setState(state => ({
            formObj: { ...state.formObj, profile: e.target.files[0] }
        }))
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ submitted: true })
        const formData = new FormData();
        let dataObj = this.state.formObj;
        console.log('DO :: ', dataObj)

        for (const key in dataObj) {
            if (!!dataObj[key] == false || dataObj['hobbies'].length == 0) return
            else {
                this.setState({ disabled: false })
                if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
                    const element = dataObj[key];
                    if (key === 'hobbies') {
                        for (var i = 0; i < dataObj['hobbies'].length; i++) {
                            formData.append('hobbies[]', dataObj['hobbies'][i])
                        }
                    }
                    else formData.append(key, element)
                }
            }
        }

        let submitData;
        if (!!this.state.editId)
            submitData = axios.put(`http://localhost:3000/users/${this.state.editId}`, formData)
        else
            submitData = axios.post('http://localhost:3000/users', formData);

        submitData.then(res => {
            alert(res.data.message)
            this.props.history.push('/list')
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" value={this.state.formObj.firstName}
                                        className="form-control" onChange={this.handleInputChange} />
                                    {
                                        this.state.formObj.firstName == '' && this.state.submitted &&
                                        <div className="invalid">
                                            <div>First Name is required</div>
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={this.state.formObj.lastName} className="form-control" onChange={this.handleInputChange} />
                                    {
                                        this.state.formObj.lastName == '' && this.state.submitted &&
                                        <div className="invalid">
                                            <div>Last Name is required</div>
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" value={this.state.formObj.email} name="email" onChange={this.handleInputChange} />
                                    {
                                        this.state.formObj.email == '' && this.state.submitted &&
                                        <div className="invalid">
                                            <div>Email is required</div>
                                        </div>
                                    }
                                    {
                                        this.state.emailPattern.test(this.state.formObj.email) == false && this.state.submitted &&
                                        <div className="invalid">Email must be a valid email address</div>
                                    }
                                </div>
                                <DatePicker selected={this.state.formObj.dob} onChange={date => this.setStartDate(date)} />

                                <div className="form-group">
                                    <label>Profile</label>
                                    <input type="file" name="profile" className="form-control" onChange={this.onFileSelect.bind(this)} />
                                    {
                                        !!this.state.formObj.profile == false && this.state.submitted &&
                                        <div className="invalid">
                                            <div>Please select a profile</div>
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hobbies">Select hobbies</label>
                                    {this.state.hobbyData.length > 0 && <DropdownMultiselect
                                        options={this.state.hobbyData}
                                        name="hobbies"
                                        key={this.state.hobbyData.map((v, i) => i)}
                                        value={this.state.formObj.hobbies}
                                        selected={this.state.formObj.hobbies}
                                        handleOnChange={this.handleSelect.bind(this)}
                                    />
                                    }
                                    {
                                        this.state.formObj.hobbies.length == 0 && this.state.submitted &&
                                        <div className="invalid">
                                            <div>Please select a hobby</div>
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    {
                                        this.state.typeData.length > 0 && this.state.typeData.map((t, i) => (
                                            <div>
                                                {/* value={t._id} */}
                                                <input key={i} value={t._id} defaultChecked={this.state.formObj.type} type="radio" key={i} name="type" onChange={this.handleInputChange} />{t.name}
                                            </div>
                                        ))
                                    }
                                    {
                                        this.state.formObj.type == '' && this.state.submitted &&
                                        <div className="invalid">
                                            <div>Please select a type</div>
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    {/* <button type="submit" className="btn btn-primary">{editId ? 'Update': 'Register' }</button> */}
                                    <button type="submit" className="btn btn-primary">{!!this.state.editId ? 'Update' : 'Register'}</button>
                                &nbsp;
                                <Link className="btn btn-primary" to="/list">Class List</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}