import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Axios from "axios";

const Update = () => {
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

  const handleChange = (e, name) => {
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(
        `http://localhost:3000/product/${productId}`,
        product
      );
      const { status, message } = response.data;
      if (status === "success") {
        alert(message);
        history.push("/product");
      } else {
        // alert(message);
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Halaman Update produk</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          size={50}
          id="name"
          value={product.name}
          onChange={(e) => handleChange(e, "name")}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={product.price}
          onChange={(e) => handleChange(e, "price")}
        />
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          name="stock"
          id="stock"
          size={30}
          value={product.stock}
          onChange={(e) => handleChange(e, "stock")}
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={product.status}
          onChange={(e) => handleChange(e, "status")}
        >
          <option value={false}>off</option>
          <option value={true}>on</option>
        </select>
        <div>
          <button onClick={handleSubmit}>Edit</button>
        </div>
      </form>
      <button onClick={() => history.push("/product")}> &laquo; back </button>
    </>
  );
};

export default Update;
