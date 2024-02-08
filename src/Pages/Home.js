import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../Images/Logo/QuickPick.png';

const Home = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8081/items");
            setProducts(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }
    };

    const handleOrderProducts = () => {
        navigate("/checkout");
    };

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8081/categories");
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }
    };

    const handleUpdateStock = () => {
        navigate("/checkin");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-color">
                <div className="container">


                    <div className="collapse navbar-collapse" id="navbarNav">
                        <Link className="navbar-brand border border-white" to="/">
                            <img src={logo} alt="Logo" width="150" />
                        </Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5 mt-5" >
                            {categories &&
                                categories.map((category) => (
                                    <li className="nav-item" key={category.id}>
                                        <Link to={`categories/${category.id}`} className="nav-link text-white">
                                            <h3 className="p-2">{category.name}</h3>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                        <div className="d-flex">
                            <div className="p-2">
                                <button className="btn btn-success" onClick={handleOrderProducts}>
                                    New Order
                                </button>

                            </div>
                            <div className="p-2">
                                <button className="btn btn-warning" onClick={handleUpdateStock}>
                                    Update Stock
                                </button>

                            </div>
                            <div className="p-2">
                                <button className="btn btn-secondary me-2" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1 className="mt-5">Home</h1>

                <div className="row mt-3">
                    {products &&
                        products.map((product) => (
                            <div key={product.id} className="col-md-3 mb-3">
                                <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={product.image} className="card-img-top mb-3" alt={product.name} />
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">Price: {product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Home;
