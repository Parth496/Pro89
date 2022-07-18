import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from 'firebase';
import CustomSidebarMenu from "../screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component{
  constructor(props)
  {
    super(props);
    this.state={light_theme:true};

  }
}

componentDidMount(){
  let theme;
  firebase .database()
  .ref("/users/"+firebase.auth().currentUser.uid)
  .on("value",function(snapShot){
    theme=snapShot.val().current_Theme
  })
  this.setState({light_theme:theme==="light"?true:false})
}
render()
{
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor:'green',
        inactiveTinitColor:this.state.light_theme?"red":"orange",
        itemStyle:{marginVertical:5},
      }}
DrawerContent={(props)=> <CustomSidebarMenu {...props}/>}>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;
