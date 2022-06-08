import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";

const Single = () => {
  const history = useHistory();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 1,
    status: true,
  });
  useEffect(() => {
    Axios.get(`http://localhost:3000/product/${productId}`)
      .then((response) => {
        const { status, message, data } = response.data;
        if (status === "success") {
          setProduct(data);
        } else {
          console.log(message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  return (
    <>
      <h2>Halaman Single Produk</h2>
      {product && (
        <>
          <div>Name:{product.name}</div>
          <div>Price:{product.price}</div>
          <div>Stock:{product.stock}</div>
          <div>Status:{product.status ? "on" : "off"}</div>
        </>
      )}
      <button onClick={() => history.push("/product")}>&laquo; back</button>
    </>
  );
};

export default Single;
