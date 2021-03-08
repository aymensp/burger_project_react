import React , { useState } from 'react' ;
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.module.css' ;
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

    const [showSideDrawer , setShowSideDrawer] = useState(true)
const sideDrawerClosedHandler = ()=>{
setShowSideDrawer(false); 
}


return(
<Auxiliary>
    <ToolBar clicked = {()=>setShowSideDrawer(!showSideDrawer)}/>
    <SideDrawer open={showSideDrawer} closed ={sideDrawerClosedHandler}/>
        <main className={classes.Content} >
     {props.children}
        </main>
    </Auxiliary>
    );
} ;

export default Layout ;