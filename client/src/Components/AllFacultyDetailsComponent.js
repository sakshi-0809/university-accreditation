import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Navbar from './NavbarComponent';

function AllFacultyDetails(props) {
    const [facultyDetails, setFacultyDetails] = useState([]);

    useEffect(() => {
        fetch('/departmentfaculty', {
            method: "get"
        }).then(res => {
            if (res.status !== 401) {
                return res.json().then(doc => doc);
            }
            else {
                console.log("error");
            }
        }).then(doc => {
            setFacultyDetails(doc.data)
        })
    }, [props])


    console.log(facultyDetails);

    return (
        <div>
            <Navbar history={props.history} path={"department"} />
        </div>
    )
}

export default withRouter(AllFacultyDetails);