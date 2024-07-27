import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductForHeaderAsync,
} from "./HomeSlice.js";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  // dispatch(fetchAllProductsAsync());
  const data = useSelector((state) => state.product.products);
  const currentStatus = useSelector((state) => state.product.status);
  const HeroImage = useSelector((state) => state?.product?.headerImage);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState([]);

  function unixToDDMMYYYY(unixTime) {
    const date = new Date(unixTime * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    dispatch(fetchProductForHeaderAsync());
  }, [dispatch]);

  useEffect(() => {
    setProducts(data);
    setStatus(currentStatus);
    // console.log(status);
  }, [data, currentStatus]);

  if (status === "loading") {
    return <>Loading...</>;
  }

  return (
    <>
      <header className="header">
        <div className="logo"> Wellness Retreats</div>
      </header>
      <section className="hero">
        <div className="Hero_Container">
          <img className="Hero_Image" src={HeroImage} alt="HeroImage" />
          <h1>Discover Your Inner Peace</h1>
          <p>
            Join us for a series of weleness designed to help you find
            tranquility and rejuvenation{" "}
          </p>
        </div>
      </section>
      <div className="search-filter">
        <div className="filter">
          <select
            name="date"
            id=""
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
            }}
          >
            <option>Filter by Date</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
          <select name="" id="">
            <option>Filter by Type</option>
            <option value="yoga">yoga</option>
            <option value="Wellness">Wellness</option>
            <option value="Ayurveda">Ayurveda</option>
          </select>
        </div>
        <div className="search">
          <input type="text" placeholder="Search Filter By Id" />
        </div>
      </div>
      <div className="cards">
        {products?.map((product, index) => (
          <Link key={index} to={`/${product.id}`}>
            <div className="card">
              <span>
                <img src={product.image} alt="" />
              </span>
              <h2 className="card_head">{product.title}</h2>
              <div className="card_text">{product.description}</div>
              <div className="card_text">
                Date: {unixToDDMMYYYY(product.date)}
              </div>
              <div className="card_text">$ {product.price}</div>
            </div>
          </Link>
        ))}
      </div>
      {/* {products?.map((item) => console.log(item.type))} */}
    </>
  );
};

export default Home;
