import React, { useState } from 'react';
import logo from './assets/lettuce.svg';
import PropTypes from 'prop-types';
import { Input, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import './App.css';

const styles = {
  root: {
    background: '#202124',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 34,
    padding: '0 30px',
    marginTop:20,
    fontFamily:'quicksand'
  },
};

function App(props) {
  const [isFoodFactsOpen, setFoodFactsOpen] = useState(false)
  const [userFoodValue, setUserFoodValue] = useState('')
  const [foodResults, setFoodResults] = useState([])

  function getFoodFacts(){
    setFoodFactsOpen(true)

    return fetch('https://trackapi.nutritionix.com/v2/search/instant?query=' + userFoodValue, {
      method: "GET",
      headers: {
        'x-app-id': 'c9034a39',
        'x-app-key': '64d328bb4e36762198550465fdadf57e',
      }
  })
  .then((response) => response.json())
  .then((responseJson) => {
      setFoodResults(responseJson.branded)
  })
  }

  function closeFoodFacts(){
    setFoodFactsOpen(false)
  }

  const { classes, children, className, ...other } = props;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          lettuce.io
        </p>

        <Typography style={{color:'white', fontFamily:'quicksand'}}>search for a food here</Typography>
        <Input onChange={(e) => setUserFoodValue(e.target.value)} style={{color:'white', fontFamily:'quicksand'}}></Input>

        <Button className={clsx(classes.root, className)} {...other} onClick={() => getFoodFacts()}>
          {children || 'go'}
        </Button>


      {userFoodValue !== '' ?
              <Dialog
                open={isFoodFactsOpen}
                onClose={() => closeFoodFacts()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='sm'
                fullWidth={true}>
                <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>Results for {userFoodValue}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {foodResults.map((item, key) => {
                        console.log(item)
                        return (
                            <Typography key={key}>Food Name: {item.food_name}</Typography>
                        )
                    })}
                    </DialogContentText>
                </DialogContent>
              </Dialog>
          :null
      }
              
      </header>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(App);
