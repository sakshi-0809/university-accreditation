import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import Navbar from '../Components/NavbarComponent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    subCategory: {
        marginTop: theme.spacing(2),
        fontSize: "18px",
        color: "#717171"
    },
    paper: {
        margin: theme.spacing(4),
    },
    table: {
        marginTop: theme.spacing(3),
        maxWidth: "900px"
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
    detailCell: {
        width: "200px",
        color: "#535353"
    },
    valueCell: {
        width: "600px",
        color: "#535353"
    }
}))

function RenderSubCategory(props) {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Typography className={classes.subCategory}>
                {props.heading}
            </Typography>

            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.detailHeadCell}>Category</TableCell>
                            <TableCell className={classes.valueHeadCell}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.subCategoryData.map(data => {
                            if (data.key === props.keyValue) {
                                return (
                                    <TableRow key={data.title}>
                                        <TableCell className={classes.detailCell}>
                                            {data.title}
                                        </TableCell>
                                        <TableCell className={classes.valueCell}>
                                            {data.dataType === 'upload' ?
                                                data.value === '' ? "~" : <a target="blank" href={data.value}>{data.value}</a>
                                                : data.value === '' ? "~" : (data.value)}
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            return null;
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

function CriteriaFiveDetails(props) {
    const [subCategoryData, setSubCategoryData] = useState([]);

    useEffect(() => {
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
            setSubCategoryData(doc.data.data)
        })
    }, [props])

    return (
        <>
            <Navbar history={props.history} path={"department"} />

            <RenderSubCategory subCategoryData={subCategoryData} keyValue={'subCategory1'} heading={'Student Faculty Ratio'} />

            <RenderSubCategory subCategoryData={subCategoryData} keyValue={'subCategory5'} heading={'Faculty Competencies in correlation to Program Specific Criteria'} />
        </>
    )
}

export default withRouter(CriteriaFiveDetails);