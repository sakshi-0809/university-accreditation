import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { subCategory1 } from '../Data/subCategoryFields';
import { subCategory5 } from '../Data/subCategoryFields';
import { subCategory6 } from '../Data/subCategoryFields';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Navbar from '../Components/NavbarComponent';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(4)
    },
    title: {
        marginTop: theme.spacing(2)
    },
    subCategory: {
        marginTop: theme.spacing(2),
        fontSize: "18px",
        color: "#717171"
    },
    subSubCategory: {
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(2),
        fontSize: "17px",
        color: "#717171"
    }
}));

const SubCategory = (props) => {
    const classes = useStyles();

    const columns = [
        { field: 'id', headerName: 'S.No.', width: 90 },
        { field: 'parameter', headerName: 'Parameter', width: 250, sortable: false },
        { field: 'value', headerName: 'Value', width: 600, sortable: false }
    ]

    return (
        <div className={classes.paper}>
            <Typography className={classes.subCategory}>
                {props.subCategoryHeading}
            </Typography>
            <div className="table">
                <DataGrid autoHeight rows={props.subCategoryData} columns={columns} pageSize={8} checkboxSelection components={{ Toolbar: GridToolbar }} />
            </div>
        </div>
    )
}

function CriteriaFiveDetails(props) {
    const classes = useStyles();
    const [subCategoryData1, setSubCategoryData1] = useState([]);
    const [subCategoryData5, setSubCategoryData5] = useState([]);
    const [subCategoryData6, setSubCategoryData6] = useState([]);
    const [dataMsg, setDataMsg] = useState('');

    useEffect(() => {
        let data = [];
        let rows = [];
        var count = 0;

        subCategory1.map(sub => {
            //not displaying upload fields right now
            if (sub.type !== "upload") {
                const field = {
                    key: sub.key,
                    title: sub.title,
                    type: sub.type,
                    value: sub.value !== '' ? sub.value : '-'
                }
                data.push(field);
            }
            return 0;
        });

        fetch('/fetchcriteria5', {
            method: "get"
        }).then(res => {
            if (res.status !== 401) {
                return res.json().then(doc => doc);
            }
            else {
                console.log("error");
            }

        }).then(doc => {
            if (doc.message.msgError !== true) {
                data.map(sub => {
                    if (sub.key === "subCategory1") {
                        if (sub.title === "Salary Details" && doc.data.subCategory1.salary !== "") {
                            sub.value = doc.data.subCategory1.salary;
                        } else if (sub.title === "Designation" && doc.data.subCategory1.designation !== "") {
                            sub.value = doc.data.subCategory1.designation;
                        } else if (sub.title === "Publications" && doc.data.subCategory1.publications !== "") {
                            sub.value = doc.data.subCategory1.publications;
                        } else if (sub.title === "Joining Date" && doc.data.subCategory1.joiningDate !== "") {
                            sub.value = doc.data.subCategory1.joiningDate.split('T')[0]
                        } else if (sub.title === "Research Interactions" && doc.data.subCategory1.researchInteractions !== "") {
                            sub.value = doc.data.subCategory1.researchInteractions;
                        } else if (sub.title === "Faculty Qualifications" && doc.data.subCategory1.qualifications !== "") {
                            sub.value = doc.data.subCategory1.qualifications;
                        }
                    }
                    return 0;
                })
            }
            else {
                setDataMsg("No Data has been added yet");
            }
            return data;
        }).then(data => {
            data.map(d => {
                rows.push({
                    id: ++count,
                    parameter: d.title,
                    value: d.value
                })
                return 0;
            })

            setSubCategoryData1(rows);
        });


    }, [props])

    return (
        <div>
            <Navbar history={props.history} path={"department"} />

            <Typography color="textSecondary" align="center" component="h1" variant="h5" className={classes.title} >
                Faculty Infomation and Contribution
            </Typography>

            {dataMsg === '' ? <SubCategory subCategoryHeading={"Student Faculty Ratio"} subCategoryData={subCategoryData1} /> : null}

            {dataMsg === '' ? <SubCategory subCategoryHeading={"Faculty Competencies in correlation to Program Specific Criteria"} subCategoryData={subCategoryData5} /> : null}

            {dataMsg !== '' ? <Alert severity="warning">{dataMsg}</Alert> : null}
        </div>
    )
}

export default withRouter(CriteriaFiveDetails);