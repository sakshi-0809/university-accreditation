import React, { useState } from 'react';
import { withRouter } from 'react-router';
import AuthService from '../Services/AuthService';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(17),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        minWidth: '100%',
    },
}));



function Register(props) {
    const classes = useStyles();
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [isValid, setIsValid] = useState({ value: true, msg: '' });

    const ErrorText = (props) => {
        if (props.isValid.value === true) {
            return (<div></div>);
        } else {
            return (
                <Alert severity="error">{props.isValid.msg}</Alert>
            )
        }
    }

    const RegisterErrorText = (props) => {
        if (props.registerError === '') {
            return (<div></div>);
        } else {
            return (
                <Alert severity="error">{props.registerError}</Alert>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid.value) {
            AuthService.register({
                name: name.trim(),
                email: email,
                department: department,
                password: password
            }).then(data => {
                if (data.message.msgError) {
                    setRegisterError(data.message.msgBody);
                }
                else {
                    setRegisterError('')
                    props.history.push('/');
                }
            })
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        } else if (e.target.name === "department") {
            setDepartment(e.target.value);
        }
    }

    const handleBlur = (e) => {
        validate(e.target.name, e.target.value)
        e.target.addEventListener('change', (e) => {
            validate(e.target.name, e.target.value)
        })
    }


    const validate = (type, value) => {
        if (type === 'email') {
            if (/^muj[0-9]{4,4}@muj.manipal.edu/i.test(value) === false) {
                setIsValid({ value: false, msg: "\nEnter a Valid Email" })
                return false;
            }
            else {
                setIsValid({ value: true, msg: '' })
            }
        }

        if (type === "confirmPassword") {
            if (value !== password) {
                setIsValid({ value: false, msg: "Password Does Not Match" })
                return false;
            }
            else {
                setIsValid({ value: true, msg: "" })
                return true;
            }
        }
    }

    return (
        <div className="form-page">
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Register
                            </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        autoFocus
                                        onChange={handleChange}
                                        value={name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                        value={password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={confirmPassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={department}
                                            onChange={handleChange}
                                            name={"department"}
                                        >
                                            <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
                                            <MenuItem value={"Information Technology"}>Information Technology</MenuItem>
                                            <MenuItem value={"Computer and Communications"}>Computer and Communications</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <ErrorText isValid={isValid}></ErrorText>
                                </Grid>
                                <Grid item xs={12}>
                                    <RegisterErrorText registerError={registerError}></RegisterErrorText>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Register
                                </Button>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default withRouter(Register);