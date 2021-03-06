import React, { useState } from 'react';
import logo from './assets/lettuce.svg';
import PropTypes from 'prop-types';
import { Input, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText,
  Card, CardContent, CardActions, CardMedia
} from '@material-ui/core';
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
  const [calorieCount, setCalorieCount] = useState(0)

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
        <p style={{position:'absolute', top:50, right:150, fontSize:20}}>Caloric Total: {calorieCount}</p>
        <Button size="small" style={{fontFamily:'quicksand', position:'absolute', top:100, right:150, color:'white'}} onClick={()=>console.log('here')}>view items</Button>

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
                maxWidth='lg'
                fullWidth={true}>
                <DialogContent>
                  <Typography className={classes.pos} style={{fontFamily:'quicksand', fontSize:16}}>
                                Results for "{userFoodValue}":
                  </Typography>
                    <DialogContentText style={{display: 'flex', justifyContent:'center', margin:10, flexWrap:'wrap'}}>
                    {foodResults.map((item, key) => {
                      console.log(item)
                      let calories = item.nf_calories
                        return (
                          <Card style={{width:345, margin: 20}}>
                          <CardContent>
                            <Typography variant="h5" component="h2" style={{fontFamily:'quicksand'}}>
                             {item.brand_name_item_name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" style={{fontFamily:'quicksand'}}>
                              Calories: {item.nf_calories}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" style={{fontFamily:'quicksand'}}>
                              Serving Size: {item.serving_qty}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" style={{fontFamily:'quicksand'}} onClick={() => {setCalorieCount(calorieCount + calories); closeFoodFacts(); }}>add</Button>
                          </CardActions>
                        </Card>
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
