import React, { useState ,useEffect} from 'react';
import Auxiliary from '../../hoc/Auxiliary' ;
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import { useHistory } from "react-router-dom";

import Spinner from '../../components/UI/Spinner/Spinner';
const INGREDIENT_PRICES ={
    salad : 0.5 ,
    bacon : 0.4 ,
    cheese: 1.3 ,
    meat: 0.7

}
function BurgerBuilder() {
    let history = useHistory();
    

    const [ingredients , setIngredients] = useState(  null
    )
    useEffect(() => {
        axios
          .get('/ingredients.json')
          .then(response => {
            setIngredients(response.data)
          
          })
          .catch(error => console.log(error))

      
      },[])
   

    const [totalPrice ,setTotalPrice] = useState(4)
    const [purchasable ,setPurshasable] = useState(false)
    const [purchasing ,setPurchasing] = useState(false)
    const [loading ] = useState(false)
    const  updatePurchaseState =  (ingredients) => {
        const ingredientss = {
            ...ingredients
        };
        const sum = Object.keys(ingredientss).map(igkey => {
            return ingredientss[igkey];
        }).reduce((sum , el)=>{
                   return sum + el ;
        },0) ;
        setPurshasable( sum  > 0);
    }
    const purchaseContinueHandler = () => {

const querryParam = [];
for (let i in ingredients) {
    querryParam.push(encodeURIComponent(i)+ '=' + encodeURIComponent(ingredients[i]));
}
querryParam.push('price=' +totalPrice);
const querryString = querryParam.join('&');
history.push({pathname:'/checkout',
search: '?' + querryString
});

      }
    const addIngredientHandler = (type) => {
const oldCount = ingredients[type];
const updatedCount = oldCount + 1;
const updatedIngredients = {
    ...ingredients
} ;
    updatedIngredients[type] = updatedCount;
    const priceAdition = INGREDIENT_PRICES[type] ;
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAdition ;

    setTotalPrice( newPrice);
    setIngredients( updatedIngredients   );

    updatePurchaseState(updatedIngredients);
    }
    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];

        if(oldCount <= 0 ){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients
        } ;
            updatedIngredients[type] = updatedCount;
            const priceAdition = INGREDIENT_PRICES[type] ;
            const oldPrice = totalPrice;
            const newPrice = oldPrice - priceAdition ;
        
            setTotalPrice( newPrice);
            setIngredients( updatedIngredients   );
            updatePurchaseState(updatedIngredients);
           
            }
        
        
            const disableInfo = {
                ...ingredients
            } ;
            for (let key in disableInfo) {
                disableInfo[key] = disableInfo[key] <= 0 
            }
            let orderSummary = null
           


            let burger = <Spinner/>
            if (ingredients)
            {

             burger = (
            <Auxiliary>
             <Burger ingredients= {ingredients}/> 
            <BuildControls 
            ingredientsAdded ={addIngredientHandler} 
            ingredientsRemoved = {removeIngredientHandler}
            disabled={disableInfo}
            purchasable = {purchasable} 
            ordered = {()=>setPurchasing(true)}
            price = {totalPrice}   />
            </Auxiliary>
            )
           ; 
           orderSummary =   <OrderSummary ingredients = {ingredients} 
           price = {totalPrice}
           purchaseCanceled={()=>setPurchasing(false)}
           purchaseContinue={purchaseContinueHandler}
           /> ;
        }
        
        if (loading) {
            orderSummary = <Spinner/>

            }
    return (

<Auxiliary>
<Modal show={purchasing} modalClosed={()=>setPurchasing(false)}> 
  {orderSummary}
</Modal>
 {burger}
</Auxiliary>
      
    );

};

export default BurgerBuilder ;