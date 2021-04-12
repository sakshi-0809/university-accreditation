import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { subCategory1 } from '../Data/subCategoryFields';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Navbar from '../Components/NavbarComponent';

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

    return (
        <div className={classes.paper}>
            <Typography className={classes.subCategory}>
                {props.subCategoryHeading}
            </Typography>
        </div>
    )
}

function CriteriaFiveDetails(props) {
    const classes = useStyles();
    const [subCategoryData1, setSubCategoryData1] = useState([]);

    useEffect(() => {
        let data = [];

        subCategory1.map(sub => {
            const field = {
                key: sub.key,
                title: sub.title,
                type: sub.type,
                value: ''
            }
            data.push(field);
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
            data.map(sub => {
                if (sub.key === "subCategory1") {
                    if (sub.title === "Salary Details") {
                        sub.value = doc.data.subCategory1.salary;
                    } else if (sub.title === "Designation") {
                        sub.value = doc.data.subCategory1.designation;
                    } else if (sub.title === "Publications") {
                        sub.value = doc.data.subCategory1.publications;
                    } else if (sub.title === "Joining Date") {
                        sub.value = doc.data.subCategory1.joiningDate;
                    } else if (sub.title === "Research Interactions") {
                        sub.value = doc.data.subCategory1.researchInteractions;
                    }
                }
                return 0;
            })
        });

        setSubCategoryData1(data);
    }, [props])

    return (
        <div>
            <Navbar history={props.history} path={"department"} />

            <Typography color="textSecondary" align="center" component="h1" variant="h5" className={classes.title} >
                Faculty Infomation and Contribution
            </Typography>

            <SubCategory subCategoryHeading={"Student Faculty Ratio"} subCategoryData={subCategoryData1} />
        </div>
    )
}

export default withRouter(CriteriaFiveDetails);