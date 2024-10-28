/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import Add from "./Add";
import { v4 as uuidv4 } from 'uuid'

import { useNavigate } from "react-router-dom";


const Products = ({ categories, setCategories, filtered, search }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [id,setid]=useState();
  const [isAddModallOpen, setIsAddModalOpen] = useState(false);
  //console.log("length:",products.length)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://localhost:7211/api/Product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    getProducts();
  }, [products]);
 // console.log("products::",products)

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))


        .map((item,index) => (
          
          <ProductItem key={index} item={item} />
        ))}
      <div
        onClick={() => setIsAddModalOpen(true)}
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px] "
      >
        <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div
        onClick={() => navigate("/products")}
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
      >
        <EditOutlined className="text-white md:text-2xl" />
      </div>
      <Add
        isAddModalOpen={isAddModallOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
