import React, { useState } from "react";
import { Axios } from "axios";
import { useHistory } from "react-router-dom";

const Create = () => {
  const history = useHistory();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 1,
    status: true,
  });

  const handleChange = (e, name) => {
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        "http://localhost:3000/product",
        product
      );
      const { status, message } = response.data;
      if (status === "success") {
        console.log(message);
        history.push("/product");
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log("network error");
    }
  };
  return (
    <>
      <h2>Halaman form create produk</h2>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            size={50}
            onChange={(e) => handleChange(e, "name")}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={(e) => handleChange(e, "price")}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={product.stock}
            size={30}
            onChange={(e) => handleChange(e, "stock")}
          />
        </div>
        <div>
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
        </div>
        <div>
          <button onClick={handleSubmit}>submit</button>
        </div>
      </form>

      <button onClick={() => history.push("/product")}> &laquo; back </button>
    </>
  );
};

export default Create;
