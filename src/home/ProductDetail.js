import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductByIdAsync } from "./HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [params.id, useDispatch]);
  const product = useSelector((state) => state.product.selectedProduct);
  const produc = useSelector((state) =>
    console.log(state.product.selectedProduct)
  );

  function unixToDDMMYYYY(unixTime) {
    const date = new Date(unixTime * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="product_detail_page">
      {product && (
        <div className="Card">
            {/* object-fit */}
          <img src={product.image}></img>
          <div className="container">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{unixToDDMMYYYY(product.date)}</p>
            <p>{product.location}</p>
            <p>$ {product.price}</p>
          </div>
        </div>
      )}
      <Link to={"/"} className="link">
        All Products
      </Link>
    </div>
  );
};

export default ProductDetail;
