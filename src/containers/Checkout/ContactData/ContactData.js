import React , {useState} from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import {useHistory } from 'react-router-dom'
function ContactData (props)  { 

const [state , setState] =  useState(  {

    name : {
        elementType : 'input' ,
        elementConfig : {
            type : 'text' , 
            placeholder : 'Your Name'
        } ,
        value : ''
    } , 
    street :  {
        elementType : 'input' ,
        elementConfig : {
            type : 'text' , 
            placeholder : 'Street'
        } ,
        value : ''
    } ,  
    zipCode :  {
        elementType : 'input' ,
        elementConfig : {
            type : 'text' , 
            placeholder : 'Zip Code'
        } ,
        value : ''
    },
    email :  {
        elementType : 'input' ,
        elementConfig : {
            type : 'email' , 
            placeholder : 'Your Email'
        } ,
        value : ''
    } ,
    deliveryMethod : {
        elementType : 'select' ,
        elementConfig : {
            options : [
                {value : 'fastest', displayValue : 'Fastest'} ,
                {value : 'cheapest', displayValue : 'Cheapest'} 
            ] 
            
        } ,
        value : ''
    }

}

);

const onChangemethodhandler = (event,identifier) => {

   const updatedForm = {

    ...state
   } ;

   const updatedFormElement = {

    ...updatedForm[identifier]
   } ;
   updatedFormElement.value = event.target.value ;
   updatedForm[identifier] = updatedFormElement;
   setState(updatedForm);

}

let history = useHistory();
const [loading, setLoading] = useState(false);

const orderHandler = (event)=>
{
    event.preventDefault();

        setLoading(true);
        const formData = {} ;
        for (let key in state) {
            formData[key] = state[key].value;
        }
     const order = {
    ingredients : props.ingredients ,
    price : props.price ,
    orderData : formData 
    } 

      axios.post('/orders.json' , order)
      .then( response => 
setLoading(false),
history.push('/') 


      )
      .catch(error=> setLoading(false) ,
     

      );
      
}
const formElementArray = [];

for (let key in state) {
formElementArray.push( {
    id : key ,
    config : state[key],

});

}

 let form = ( <form onSubmit={orderHandler}>
 {formElementArray.map(formElement => (
     <Input 
      key={formElement.id}
      elementType = {formElement.config.elementType}
      elementConfig={formElement.config.elementConfig} 
      value ={formElement.config.value } 
      changed={(event) => onChangemethodhandler(event,formElement.id)}
      />
 ))}
    <Button btnType="Success" clicked = {orderHandler}>ORDER</Button>
</form>
);
  if (loading) {
      form = (<Spinner/>);
  }

return (
<div className={classes.ContactData}>

    <h4> Enter your contact Data </h4>
       
    {form}
</div>
);

}

export default ContactData