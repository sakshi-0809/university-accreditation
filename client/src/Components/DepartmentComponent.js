import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Navbar from './NavbarComponent';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(5),
    },
    content: {
        height: 90
    },
    cardTitle: {
        paddingBottom: theme.spacing(1),
        color: '#b7b7b7'
    },
    cardContent: {
        color: '#343434'
    },
    button: {
        marginRight: theme.spacing(2)
    }
}));

function CriteriaCard(props) {
    const classes = useStyles();

    const handleOpen = () => {
        props.history.push(`/criteria${props.number}`);
    }

    const handleView = () => {
        props.history.push(`/criteria${props.number}details`)
    }

    return (
        <Grid item xs={3}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography color="textSecondary" variant="h5" component="h2" className={classes.cardTitle}>
                        Criteria {props.number}
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.cardContent}>
                        {props.firstPart}
                        <br />
                        {props.secondPart}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleOpen} className={classes.button}>Open Criteria Page</Button>
                    <Button size="small" color="primary" onClick={handleView}>View Criteria Details</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

function Department(props) {
    const classes = useStyles();

    return (
        <div>
            <Navbar history={props.history} path={"profile"} />
            <div className={classes.root}>
                <Grid container direction="row">
                    <CriteriaCard number="1" firstPart="Vision, Mission and" secondPart="Program Educational Objectives" history={props.history} />
                    <CriteriaCard number="2" firstPart="Program Curriculum and" secondPart="Teaching Learning Process" history={props.history} />
                    <CriteriaCard number="3" firstPart="Course Outcomes and" secondPart="Program Outcomes" history={props.history} />
                    <CriteriaCard number="4" firstPart="Student Performance" secondPart="" history={props.history} />
                    <CriteriaCard number="5" firstPart="Faculty Information and" secondPart="Contribution" history={props.history} />
                    <CriteriaCard number="6" firstPart="Facilities and" secondPart="Technical Support" history={props.history} />
                    <CriteriaCard number="7" firstPart="Continuous Improvement" secondPart="" history={props.history} />
                    <CriteriaCard number="8" firstPart="First Year Academics" secondPart="" history={props.history} />
                    <CriteriaCard number="9" firstPart="Student Support Systems" secondPart="" history={props.history} />
                    <CriteriaCard number="10" firstPart="Governance, Institutional Support" secondPart="and Financial Resources" history={props.history} />
                </Grid>
            </div>
        </div>
    );
}

export default withRouter(Department);