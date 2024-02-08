import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {

    const params = useParams();

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);

    const getCategory = async () => {
        const response = await axios.get(`http://localhost:8081/categories/${params.id}`);
        setCategory(response.data);

    }

    const getProductsByCategory = async () => {
        const response = await axios.get(`http://localhost:8081/categories/${params.id}/items`);
        setProducts(response.data);

    }

    useEffect(() => {
        getCategory();
        getProductsByCategory();
    }, [])


    return (

        <div className="container ">
            {category &&
                <h1 className="ml-5">{category.name}</h1>
            }

            <ol>
                <div className="row mt-3">
                    {products && products.map((product) => (
                        <div key={product.id} className="col-md-3 mb-3">
                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div className="card">
                                    <div className="card-body" >
                                        <img src={product.image} className="card-img-top mb-3" />
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Price: {product.price}</p>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </ol>
        </div>



    );

}
export default Category;