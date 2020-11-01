import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Container, Paper, Link, Box, Button }from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';
import { setUser, setClockIn, setClockOut, resetState } from './store/actions'
import dayjs from 'dayjs';
import clsx from 'clsx';
import { api }  from './api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    color: "#777777",    
  },
  container: {
    paddingTop: "70px"
  },
  nameGrid: {

  },
  firstName: {
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "22px",
    lineHeight: "36px"
  },
  lastName: {
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "24px"    
  },
  clockGrid: {
    paddingTop: "40px"
  },
  clockText: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "26px"
  },
  clockTime: {
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "24px",
    lineHeight: "24px"
  },
  buttonGrid: {
    paddingTop: "30px"

  },
  button: {
    backgroundColor: "#00CA7F",
    textTransform: "none",  
    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    height: "47px"
  },
  buttonText: {
    color: '#ffffff',
    lineHeight: "24px",
    fontSize: "16px",
    fontWeight: "700"
  },
  buttonLoading: {
    backgroundColor: "#aaaaaa",
    textTransform: "none",  
    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    height: "47px"
  },
  errorMessageGrid: {
    paddingTop: "8px"
  },
  errorMessageGridHide: {
    display: "none"
  },
  errorMessage: {
    color: '#ff4d4f',
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px"
  }

}));  

function App(props) {
  const classes = useStyles();  
  var buttonTextOptions = { clock_in: "Clock in", clock_out: "Clock out", loading: "Loading..." };  
  var errorMsgText = "An error occurred. Please try again.";
  const [buttonOptions, setButtonOptions] = useState({ style: classes.button, text: buttonTextOptions.clock_in});
  const [userDetails, setUserDetails] = useState({ user_id: 1, username: null, firstname: null, lastname: null}); // hardcode user_id to 1
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {        
    api.user.get_user(userDetails.user_id)
    .then((response) => {
      console.log(response);
      setUserDetails({user_id: response.data.user_id, username: response.data.username, firstname: response.data.firstname, lastname: response.data.lastname})
      props.setUser(1); 
    })
    .catch((error) => {
      console.log("error getting user details");
    })

    return () => {
      // clean up

    };
  },[]);

  const getClockDisplay = (d) => {
    var text = "-";
    if(d != null && d instanceof Date) {
      dayjs(d);
      text = dayjs(d).format('h:mm A');
    }

    return text;
  }

  const clockAttendance = async () => {
    var d = new Date();    
    if(props.clock_in === null) {
      try {
        setButtonOptions({style: classes.buttonLoading, text: buttonTextOptions.loading});
        var response = await api.clock.clock_in(props.user_id, d);   
        console.log(response);
        console.log(response.data);
        setButtonOptions({style: classes.button, text: buttonTextOptions.clock_out});
        props.setClockIn(d);              
      }
      catch (error) {
        setButtonOptions({style: classes.button, text: buttonTextOptions.clock_in});
        setErrorMsg(errorMsgText);
      }
    }
    else if(props.clock_out === null) {      
      try {
        setButtonOptions({style: classes.buttonLoading, text: buttonTextOptions.loading});        
        var response = await api.clock.clock_out(props.user_id, d);
        console.log(response);
        console.log(response.data);        
        setButtonOptions({style: classes.button, text: buttonTextOptions.clock_in});
        props.setClockOut(d);
      }
      catch (error) {        
        setButtonOptions({style: classes.button, text: buttonTextOptions.clock_out});
        setErrorMsg(errorMsgText);
      }      
    }
    else {
      setErrorMsg(errorMsgText);
    }
  }
  

  var html = (
    <div className={classes.root}>
      <CssBaseline />
        <Container maxWidth="xs" className={classes.container}>          
          <Grid container className={classes.nameGrid}>
            <Grid item xs={12}>
              <Box component="span" className={classes.firstName}>{userDetails.firstname}</Box>
            </Grid>
            <Grid item xs={12}>
              <Box component="span" className={classes.lastName}>{userDetails.lastname}</Box>
            </Grid>          
          </Grid>
          <Grid container className={classes.clockGrid}>
            <Grid item xs={6}>
              <Grid container direction="column" className={classes.clockIn}>
                <Grid item xs={12}><Box component="span" className={classes.clockText}>Clock in</Box></Grid>
                <Grid item xs={12}><Box component="span" className={classes.clockTime}>{getClockDisplay(props.clock_in)}</Box></Grid>
              </Grid>              
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" className={classes.clockOut}>
                <Grid item xs={12}><Box component="span" className={classes.clockText}>Clock out</Box></Grid>
                <Grid item xs={12}><Box component="span" className={classes.clockTime}>{getClockDisplay(props.clock_out)}</Box></Grid>
              </Grid>              
            </Grid>          
          </Grid>          
          <Grid container direction="column" alignItems="stretch" className={classes.buttonGrid}>
            <Grid item xs={12}>
              <Button variant="contained" onClick={clockAttendance} fullWidth className={buttonOptions.style}><Box component="span" className={classes.buttonText}>{buttonOptions.text}</Box></Button>              
            </Grid>            
          </Grid>                   
          <Grid container className={clsx(classes.errorMessageGrid, errorMsg===null && classes.errorMessageGridHide)}>
            <Grid item xs={12}>
              <Box component="span" className={classes.errorMessage}>An error occured. Please try again.</Box>
            </Grid>
          </Grid>                   
        </Container>
    </div>
  )

    return html;

}

// map redux store state to component props
const mapStateToProps = state => ({  
  user_id: state.user_id,
  clock_in: state.clock_in,
  clock_out: state.clock_out,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
   // action reference 
   setUser, 
   setClockIn,
   setClockOut,
   resetState      
}, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(App);
