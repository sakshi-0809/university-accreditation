import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { subCategory1 } from '../Data/subCategoryFields';
// import { subCategory2 } from '../Data/subCategoryFields';
// import { subCategory3 } from '../Data/subCategoryFields';
// import { subCategory4 } from '../Data/subCategoryFields';
// import { subCategory5 } from '../Data/subCategoryFields';
// import { subCategory6 } from '../Data/subCategoryFields';
// import { subCategory7 } from '../Data/subCategoryFields';
// import { subCategory8 } from '../Data/subCategoryFields';
// import { subCategory9 } from '../Data/subCategoryFields';
// import { subCategory10 } from '../Data/subCategoryFields';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Navbar from './NavbarComponent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/lab/Alert';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        marginTop: theme.spacing(2)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        margin: theme.spacing(4),
    },
    date: {
        width: 500,
    },
    textField: {
        maxWidth: "500px",
    },
    subCategory: {
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(2),
        fontSize: "18px",
        color: "#717171"
    },
    subSubCategory: {
        marginLeft: theme.spacing(6),
        marginTop: theme.spacing(2),
        fontSize: "17px",
        color: "#717171"
    }
}));

function SubCategory(props) {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.subCategoryData);
    }, [props]);

    const SubRender = (props) => {
        return (
            props.data.map(sub => {
                if (sub.type === "text") {
                    return (
                        <Grid item xs={6}>
                            <TextField
                                name={sub.title}
                                variant="filled"
                                fullWidth
                                multiline
                                rows="3"
                                id="text"
                                label={sub.title}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                InputProps={{
                                    className: classes.textField
                                }}
                            />
                        </Grid>
                    )
                } else if (sub.type === "date") {
                    return (
                        <Grid item xs={6}>
                            <TextField
                                id="date"
                                name={sub.title}
                                label={sub.title}
                                type="date"
                                fullWidth
                                defaultValue="2017-05-24"
                                className={classes.date}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    )
                } else {
                    return (
                        <Grid>

                        </Grid>
                    )
                }
            }))
    }


    const handleSubmit = () => {

    }

    const handleChange = (e) => {
        data.map(sub => {
            if (sub.title === e.target.name) {
                if (sub.type === "date") {
                    console.log(e.target.value.toString());
                    sub.value = e.target.value.toString();
                } else {
                    sub.value = e.target.value
                }
            }
        })

        setData(data);
    }

    const handleBlur = (e) => {
        console.log(data);
    }

    return (
        <div className={classes.paper}>
            <Typography className={classes.subCategory}>
                {props.subCategoryHeading}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <SubRender data={data} handleChange={handleChange} handleBlur={handleBlur} />
                </Grid>
            </form>
        </div>
    )
}

function SubSubCategory(props) {
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={2}>
                <Typography className={classes.subSubCategory}>
                    {props.subSubCategory}
                </Typography>
            </Grid>
        </>
    )
}

function CriteriaFive(props) {
    const classes = useStyles();
    const [subCategoryData1, setSubCategoryData1] = useState([]);

    useEffect(() => {
        let data = [];

        subCategory1.map(sub => {
            const field = {
                title: sub.title,
                type: sub.type,
                value: ''
            }
            data.push(field);
            return 0;
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

            {/* <SubCategory subCategoryHeading={"Faculty Cadre Proportion"} />

            <SubCategory subCategoryHeading={"Faculty Qualification"} />

            <SubCategory subCategoryHeading={"Faculty Retention"} />

            <SubCategory subCategoryHeading={"Faculty Competencies in correlation to Program Specific Criteria"} />

            <SubCategory subCategoryHeading={"Innovations by the Faculty in Teaching and Learning"} />

            <SubCategory subCategoryHeading={"Faculty as Participants in Faculty Development/Training Activities/STTPs"} />

            <SubCategory subCategoryHeading={"Research and Development"} />
            <SubSubCategory subSubCategory={"Academic Research"} />
            <SubSubCategory subSubCategory={"Sponsored Research"} />
            <SubSubCategory subSubCategory={"Development Activities"} />
            <SubSubCategory subSubCategory={"Consultancy (From Industry)"} />

            <SubCategory subCategoryHeading={"Faculty Performance Appraisal and Development System"} />

            <SubCategory subCategoryHeading={"Visiting/Adjunct/Emeritus Faculty, etc."} /> */}
        </div>
    )
}

export default withRouter(CriteriaFive);