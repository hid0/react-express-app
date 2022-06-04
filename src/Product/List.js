import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const List = () => {
  // declare state
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // load data API with Axios
    Axios.get("http://localhost:3000/products")
      .then((response) => {
        const { status, message, data } = response.data;
        if (status === "success") {
          setProducts(data);
        } else {
          alert(message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <>
      <h2>Halaman List Produk</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td className="center">{product.price}</td>
                  <td className="center">{product.stock}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default List;
