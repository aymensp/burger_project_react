import React ,  { useEffect, useState} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'

function Orders () {

const [orders, setOrders] = useState([]);
const [loading, setloading] = useState(true);

    useEffect(() => {
        axios
          .get('/orders.json')
          .then(response => {
              const fetchOrders = [];
              for (let key in response.data) {
                  fetchOrders.push({...response.data[key] , id :key});


              }
            setloading(false);
            setOrders(fetchOrders);
            console.log(orders);

          })
          .catch(error =>        setloading(false)
          )

      
      },[])
   
return (

<div>
    {orders.map(order => (<Order key = {order.id} 
    ingredients = {order.ingredients}
    price = {+order.price}
    />))}
</div>
);

}

export default Orders
