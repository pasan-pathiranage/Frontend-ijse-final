import { eventWrapper } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Checkin = () => {
  const params = useParams();

  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState(null);

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(0);
  const [categoryId, setCategoryId] = useState(null);



  useEffect(() => {
    getCategories();
    getProductByid();
  }, [])

  const navigate = useNavigate();

  const getProductByid = async () => {
    const response = await axios.get(`http://localhost:8081/items/${params.id}`)
    setItem(response.data);
  }


  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/categories");
      setCategories(response.data);
    } catch (error) {
      // if(error.response.status === 401){
      //     navigate("/login");
      // }
    }

  }

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleImage = (event) => {
    setImage(event.target.value)
  }

  const handlePrice = (event) => {
    setPrice(event.target.value);
  }

  const handleQty = (event) => {
    setQty(event.target.value);
  }

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      "name": name,
      "image": image,
      "price": price,
      "stock_qty": qty,
      "categoryId": categoryId
    }

    const response = await axios.put(`http://localhost:8081/items/${params.id}`, data);

    if (response.status === 200) {
      getProductByid();
      setName(null);
      setPrice(null);
      setQty(0);
      setCategoryId(null)

    }

  }
  const handleLogout = () => {
    // localStorage.removeItem("token");
    // navigate("/login");
  }


  return (

    <div className="container">
      <div className="container">
        <nav class="navbar bg-body-tertiary">
          <form class="container-fluid justify-content-end">
            <button class="btn btn-warning me-2" type="button" onClick={handleLogout}>Logout</button>
          </form>
        </nav>
      </div>

      <div className="container">
        {item && (
          <div className="row">
            <div className="col-md-5 mb-5">
              <h2>Product Details</h2>
              <div class="card" style={{ width: '288px' }}>
                <img src={item.image} class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title"> Item Name : {item.name}</h5>
                  <p class="card-text"> item Price : {item.price}</p>
                  <p class="card-text"> item Stock : {item.stock.qty}</p>
                  <p class="card-text"> item Category : {item.category.name}</p>
                </div>
              </div>


            </div>
            <div className="col-md-6 mb-5">
              <div>
                <h1>Update Product</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Item Name</label>
                  <input type="text" className="form-control" onChange={handleName} value={name} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Item Image</label>
                  <input type="text" className="form-control" onChange={handleImage} value={image} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Item Price</label>
                  <input type="text" className="form-control" onChange={handlePrice} value={price} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Item Qty</label>
                  <input type="text" className="form-control" onChange={handleQty} value={qty} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" onChange={handleCategory} required>
                    <option value="">Please Select</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-secondary">Update Product</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>



  )
}

export default Checkin;