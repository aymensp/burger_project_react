import React , {useState,useEffect} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {useHistory ,Route, useLocation, matchPath, useRouteMatch} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
function Checkout  ()  {

    let history = useHistory();
    let location = useLocation();
    const [ingredients , setIngredients] = useState(  {
        salad : 0 ,
        bacon : 0 ,
        cheese: 0 ,
        meat: 0
    }
    )
         const [price, setPrice] = useState(0);
    useEffect(() => {
        
        const query = new URLSearchParams(location.search);

        const ingredientss = {};
        let price = 0 ;

        for (let param of query.entries()) {
            if (param[0] === 'price')
            {
                price = param[1];

            }
            else {
                ingredientss[param[0]] = +param[1];
            }
            
        }
        setIngredients(ingredientss);
     setPrice(price);
    }, [])
   const checkoutCancel = ()=> {
history.goBack();

    }
 const checkoutConfirm = ()=> {
        history.replace('/checkout/contact-data');
    }
    let match = useRouteMatch();
    return(

       <div>
           <CheckoutSummary  ingredients = {ingredients}
           onCheckoutCancelled={checkoutCancel}
           onCheckoutConfirmed={checkoutConfirm}  
           />
           <Route
            path={match.path + '/contact-data'} 
           render={(props)=>(<ContactData ingredients={ingredients} price={price} {...props}/>)}/> 
       </div>

        );
}





export default Checkout