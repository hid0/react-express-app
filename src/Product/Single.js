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

  const handleDelete = async (id) => {
    if (window.confirm("Yaquin mau hapus?")) {
      try {
        const response = await Axios.delete(
          "http://localhost:3000/product/" + id
        );
        const { message } = response.data;
        alert(message);
        history.push("/product");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2>Halaman Single Produk</h2>
      {product && (
        <>
          <div>Name:{product.name}</div>
          <div>Price:{product.price}</div>
          <div>Stock:{product.stock}</div>
          <div>Status:{product.status ? "on" : "off"}</div>
          <button onClick={() => handleDelete(product._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </>
      )}
      <div>
        <button onClick={() => history.push("/product")}>&laquo; back</button>
      </div>
    </>
  );
};

export default Single;
