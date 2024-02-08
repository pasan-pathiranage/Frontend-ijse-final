import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [items, setItems] = useState(null);
  const [orderitems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchItem, setSearchItem] = useState('');
  const [discount, setDiscount] = useState(0);
  const [nettotal, setNettotal] = useState(0);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setDiscount((total / 100) * 20)
  }, [total]);

  useEffect(() => {
    setNettotal(total - discount);
  }, [total, discount]);

  const navigate = useNavigate();

  const getItems = async () => {

    const response = await axios.get('http://localhost:8081/items');
    setItems(response.data);

  };
  const createOrder = async () => {

    const itemIds = orderitems.map(obj => obj.id);
    const itemqts = orderitems.map(obj => obj.quantity);

    const data = {
      items: itemIds,
      quantities: itemqts
    };

    const response = await axios.post('http://localhost:8081/orders', data)
    if (response.status === 201) {
      setOrderItems([]);
      setTotal(0);
      setDiscount(0);
      getItems();
    } else {
      //show error message
    }
  }


  const getSearchItem = (event) => {
    setSearchItem(event.target.value);
  }

  const filterItems = () => {
    let filter = searchItem.toLowerCase();

    if (!searchItem) {
      return items;
    }
    else {
      return items.filter(item =>
        item.name.toLowerCase().includes(filter)
      );
    }
  };

  const handleHome = () => {
    navigate("/")
  }
  const handleUpdatestock = () => {
    navigate("/checkin")
  }



  return (
    <div className='container-fluid mt-4'>
      <nav class="navbar bg-body-tertiary">
        <form class="container-fluid justify-content-end">
          <button className="btn btn-success me-2" type="button" onClick={handleHome}>Home</button>
          <button class="btn btn-warning me-2" onClick={handleUpdatestock}>Update Stock</button>

        </form>
      </nav>
      <h1 className='text-center mb-4'>Checking Out</h1>

      <div className='input-group mb-3 container '>
        <input
          type='text'
          className='form-control'
          placeholder='Search products by name'
          onChange={getSearchItem}
        />

      </div>

      <div className='row'>
        <div className='col-md-6'>
          <h2>Products List</h2>
          {items && filterItems().map((item) => (
            <div className='card mb-3'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-10'>
                    <h5 className='card-title'>
                      {item.name} - {item.price.toFixed(2)} LKR
                    </h5>
                    <p className='card-text'>Stock: {item.stock.qty}</p>

                    <button
                      className='btn btn-sm btn-success'
                      onClick={() => {
                        setOrderItems([...orderitems, { ...item, quantity: 1 }]);

                        let currentTotal = total;
                        currentTotal = currentTotal + item.price;
                        setTotal(currentTotal);
                      }}
                    >
                      Add to Order
                    </button>
                  </div>
                  <div className='col-md-2'>
                    <img src={item.image} className="card-img-top" style={{ width: "90px" }} />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        <div className='col-md-6'>
          <h2>Your Order</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderitems.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type='number'
                      value={item.quantity}
                      className='form-control'
                      onChange={(event) => {
                        const updatedOrderItems = [...orderitems];
                        updatedOrderItems[index].quantity = event.target.value;
                        setOrderItems(updatedOrderItems);

                        let updatedTotal = 0;
                        updatedOrderItems.forEach((item) => {
                          updatedTotal += item.quantity * item.price;
                        });
                        setTotal(updatedTotal);

                      }
                      }
                    />
                  </td>
                  <td>{item.price.toFixed(2)} LKR</td>
                </tr>
              ))}

            </tbody>
            <thead>
              <tr>
                <th colSpan={2}>
                  Total:
                </th>
                <th>
                  {total.toFixed(2)} LKR
                </th>
              </tr>
              <tr>
                <th colSpan={2}>
                  Discount:
                </th>
                <th>
                  {discount.toFixed(2)}
                </th>
              </tr>
              <tr>
                <th colSpan={2}>
                  Net Total:
                </th>
                <th>
                  {nettotal.toFixed(2)}
                </th>
              </tr>
            </thead>
          </table>


          <button className="btn btn-secondary" onClick={createOrder}>Complete Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
