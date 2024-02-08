import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkin = () => {

    const [items, setItems] = useState(null);
    const [categories, setCategories] = useState(null);

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryname, setCategoryName] = useState(null);


    useEffect(() => {
        getItems();
        getCategories();
    }, [items])

    const navigate = useNavigate();


    const getItems = async () => {

        try {
            const response = await axios.get("http://localhost:8081/items");
            setItems(response.data);

        } catch (error) {
            // if(error.response.status === 401){
            //     navigate("/login");
            // }
        }

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
        setImage(event.target.value);
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

        const response = await axios.post("http://localhost:8081/items", data);

        if (response.status === 201) {
            setItems([...items, response.data]);
            setName("");
            setPrice("");
            setQty(0);
            setImage("");
            setCategoryId(null)
            window.location.reload();

        }

    }
    const handleHome = () => {
        navigate("/")
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

    const handleCategorySubmit = async (event) => {
        event.preventDefault();

        const data = {
            "name": categoryname
        }

        const response = await axios.post("http://localhost:8081/categories", data);

        if (response.status === 201) {
            setCategoryName(null);
        }
    }
    const handleUpdateProduct = (itemId) => {
        navigate(`/update_products/${itemId}`);
    }

    const handleDeleteProduct = async (itemid) => {
        try {
            await axios.delete(`http://localhost:8081/items/${itemid}`);
            setItems(items.filter(item => item.id !== itemid));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }


    return (
        <div>
            <div className="container">
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid justify-content-end">
                        <button className="btn btn-success me-2" type="button" onClick={handleHome}>Home</button>
                        <button className="btn btn-secondary me-2" type="button" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
                <h1 className="mt-3">Checkin</h1>
            </div>

            <div className="row mt-3">
                <div className="col-md-6 overflow-auto" style={{ height: "740px" }}>
                    <ol>
                        {items && items.map((item) => (
                            <div className='card mb-3'>
                                <div className='card-body'>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <h6>
                                                item id: {item.id}
                                            </h6>
                                            <h5 className='card-title'>
                                                Stock -{item.stock.qty}
                                            </h5>
                                            <h4>
                                                {item.name}
                                            </h4>
                                            <h5 className='card-title'>
                                                {item.price.toFixed(2)} LKR
                                            </h5>
                                            <button
                                                className='btn btn-sm btn-info me-2'
                                                onClick={() => handleUpdateProduct(item.id)}
                                            >
                                                Update Product
                                            </button>
                                            <button
                                                className='btn btn-sm btn-danger'
                                                onClick={() => handleDeleteProduct(item.id)}
                                            >
                                                Delete Product
                                            </button>
                                        </div>
                                        <div className="col-md-2">
                                            <img src={item.image} className="card-img-top" style={{ width: "100px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ol>
                </div>


                <div className='col-md-6'>

                    <div className="col-md-6 mb-5">
                        <div>
                            <h1>Add New Product</h1>
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

                            <button type="submit" className="btn btn-primary">Save Item</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h1>Add New Category</h1>
                        </div>
                        <form onSubmit={handleCategorySubmit}>
                            <div className="mb-3">
                                <label className="form-label">Category Name</label>
                                <input type="text" className="form-control" onChange={handleCategoryName} value={categoryname} required />
                            </div>

                            <button type="submit" className="btn btn-primary">Save Category</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkin;
