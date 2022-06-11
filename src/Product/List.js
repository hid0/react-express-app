import React, { useState, useEffect } from "react";
import Axios from "axios";
// import { useHistory } from "react-router-dom";

const List = () => {
  // declare state
  const [products, setProducts] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    // load data API with Axios
    Axios.get("http://localhost:3000/products")
      .then((response) => {
        const { status, message, data } = response.data;
        if (status === "success") {
          setProducts(data);
        } else {
          // alert(message);
          console.log(message);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        // alert(error);
      });
  }, []);

  return (
    <>
      <h2>Halaman List Produk</h2>
      <a href="/product/create">+ CREATE</a>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>
                    <a href={`/product/single/${product._id}`}>
                      {product.name}
                    </a>
                  </td>
                  <td className="center">{product.price}</td>
                  <td className="center">{product.stock}</td>
                  <td className="center">
                    <a href={`/product/update/${product._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default List;
