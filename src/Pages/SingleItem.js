import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleItem = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/items/${params.id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div className="container mt-5">
      {product && (
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <img src={product.image} className="img-thumbnail border border-dark" style={{ width: "80%" }} alt={product.name} />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h1 className="card-title">{product.name}</h1>
                <div className="mt-5">
                  <h2><span style={{ color: '#00ff80' }}>{product.price.toFixed(2)} LKR</span></h2>
                  <h4>Stock: <span style={{ color: '#df2020' }}>{product.stock.qty}</span></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
