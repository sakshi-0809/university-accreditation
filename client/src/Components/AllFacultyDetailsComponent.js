import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Navbar from './NavbarComponent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3)
    },
    table: {
        marginTop: theme.spacing(3),
        maxWidth: "1350px"
    },
    nameHeadCell: {
        fontWeight: 600,
        width: "150px",
        color: "#6b6b6b"
    },
    parentHeadCell: {
        fontWeight: 600,
        width: "300px",
        color: "#6b6b6b"
    },
    detailHeadCell: {
        fontWeight: 600,
        width: "200px",
        color: "#6b6b6b"
    },
    valueHeadCell: {
        fontWeight: 600,
        width: "600px",
        color: "#6b6b6b"
    },
    nameCell: {
        width: "150px",
        color: "#535353"
    },
    parentCell: {
        width: "300px",
        color: "#535353"
    },
    detailCell: {
        width: "200px",
        color: "#535353"
    },
    valueCell: {
        width: "600px",
        color: "#535353"
    }
}))

function AllFacultyDetails(props) {
    const classes = useStyles();
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

            <div className={classes.root}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.nameHeadCell}>Faculty Name</TableCell>
                                <TableCell className={classes.parentHeadCell}>Parent Category</TableCell>
                                <TableCell className={classes.detailHeadCell}>Category</TableCell>
                                <TableCell className={classes.valueHeadCell}>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {facultyDetails.map(faculty => {
                                return faculty.data.map(d => {
                                    var subCat = '';

                                    if (d.key === 'subCategory1') {
                                        subCat = "Student Faculty Ratio"
                                    } else if (d.key === 'subCategory5') {
                                        subCat = "Faculty Competencies in correlation to Program Specific Criteria"
                                    } else if (d.key === 'subCategory 6') {
                                        subCat = "Innovations by the Faculty in Teaching and Learning"
                                    }

                                    return (
                                        <TableRow key={d.title}>
                                            <TableCell className={classes.nameCell}>{faculty.name}</TableCell>
                                            <TableCell className={classes.parentCell}>
                                                {subCat}
                                            </TableCell>
                                            <TableCell className={classes.detailCell}>
                                                {d.title}
                                            </TableCell>
                                            <TableCell className={classes.valueCell}>
                                                {d.dataType === 'upload' ?
                                                    d.value === '' ? "~" : <a target="blank" href={d.value}>{d.value}</a>
                                                    : d.value === '' ? "~" : (d.value)}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default withRouter(AllFacultyDetails);