import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(23),
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
}));

function Login(props) {
    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const LoginErrorText = (props) => {
        if (props.loginError === '') {
            return (<div></div>);
        } else {
            return (
                <Alert severity="error">{props.loginError}</Alert>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        AuthService.login({
            username: email,
            password: password
        }).then(data => {
            const { isAuthenticated, user } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                console.log(authContext.isAuthenticated)
                props.history.push('/department');
            }
            else {
                setLoginError("Email/Password Incorrect");
            }
        });
    }

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    return (
        <div className="form-page">
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
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
                                    <LoginErrorText loginError={loginError}></LoginErrorText>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
                            <Grid item >
                                <Box pt={1}>
                                    <Link to="/register" className="register-option">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Box>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default withRouter(Login);