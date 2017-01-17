import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {load} from '../redux/modules/user';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {BottomNavigation,BottomNavigationItem} from 'material-ui/BottomNavigation';
import ActionHome from 'material-ui/svg-icons/action/home';
import GithubIcon from 'material-ui/svg-icons/action/pets';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

if(!global.isInjected){
  injectTapEventPlugin();
  global.isInjected = true;
}

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};



@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(load());
  }
}])
@connect((state)=>({users: state.users.result}))
export default class App extends React.Component {

  getListItems(){
    return this.props.users.slice().map((item,index) =><ListItem primaryText={item.name} key={'user_'+index}/>);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Components" iconStyleLeft={{display: 'none',background: 'red'}}
           iconElementRight={<IconButton tooltip="github"><GithubIcon/></IconButton>}/>
          <Drawer open={true}>
            <AppBar title="Material-UI" />
            <span style={{display: 'block', paddingLeft: '16px', paddingTop: '10px'}}>Version:</span>
            <SelectField style={{width: '60%',paddingLeft: '24px'}} id="version">
              <MenuItem primaryText="v0.16.6"/>
              <MenuItem primaryText="v0.16.5" />
              <MenuItem primaryText="v0.16.4" />
              <MenuItem primaryText="v0.16.1" />
              <MenuItem primaryText="v0.16.0" />
            </SelectField>
            <List>
              <Subheader>武将</Subheader>
              {this.getListItems()}
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}