import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Navbar from './NavbarComponent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    formControl: {
        minWidth: "25%",
        marginLeft: "57%",
        marginRight: "3%",
        marginTop: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(3)
    },
    selectedPersonalDetails: {
        fontSize: "16px",
        color: "#717171",
        marginBottom: theme.spacing(1)
    },
    criteriaName: {
        fontSize: "17px",
        fontWeight: 600,
        color: "#535353",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginLeft: "30%"
    },
    table: {
        marginTop: theme.spacing(3),
        maxWidth: "1200px"
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

function DetailTable(props) {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.criteriaName}>{props.criteriaName}</Typography>

            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.parentHeadCell}>Parent Category</TableCell>
                            <TableCell className={classes.detailHeadCell}>Category</TableCell>
                            <TableCell className={classes.valueHeadCell}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.selectedFacultyData.map(d => {
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
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

function CoordinatorPanel(props) {
    const classes = useStyles();
    const [departmentFaculty, setDepartmentFaculty] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState({ name: '', email: '', department: '', data: [] });

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
            setDepartmentFaculty(doc.data)
            setSelectedFaculty(doc.data[0])
        })
    }, [props])

    const handleChange = (e) => {
        setSelectedFaculty(e.target.value);
    }

    const handleOpenAll = () => {
        props.history.push('/allfacultydetails')
    }

    return (
        <div>
            <Navbar history={props.history} path={"department"} />

            <FormControl className={classes.formControl} variant={"filled"}>
                <InputLabel id="demo-simple-select-label">Select Faculty</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedFaculty}
                    onChange={handleChange}
                    name={"selectFaculty"}
                >
                    {departmentFaculty.map(f => {
                        return (
                            <MenuItem value={f}>{f.name}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleOpenAll} className={classes.button}>All Faculty Details</Button>

            <div className={classes.root}>
                <Typography className={classes.selectedPersonalDetails}>Name: {selectedFaculty.name}</Typography>
                <Typography className={classes.selectedPersonalDetails}>Email: {selectedFaculty.email}</Typography>

                <DetailTable selectedFacultyData={selectedFaculty.data} criteriaName={"Faculty Information and Contribution"} />
            </div>
        </div>
    )
}

export default withRouter(CoordinatorPanel);