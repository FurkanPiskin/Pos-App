/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";


import Add from "./Add";
import Edit from "./Edit";

function Categories({ categories, setCategories, setFiltered }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState("Tümü");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://localhost:7211/api/Product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      if (title === "Tümü") {
        setFiltered(products);
      } else {
        const filtered = () => {
          const data = products.filter((item) => item.category === title);
          setFiltered(data);
        };
        filtered();
      }
    }
  }, [title, products,setFiltered]);

  const getTitle = (item) => {
    setTitle(item);
  };

  //console.log(products);
  //console.log(categories)

  return (
    <ul className="flex md:flex-col gap-4 text-">
      {categories.map((item,index) => (
        <li
          onClick={() => {
            getTitle(item.title);

            // küçük bir gecikmeyle filtered'ı çağırıyoruz
          }}
          key={item.categoryId}
          className={`${
            item.title === title ? "bg-pink-700" : "bg-green-700"
          } px-6 py-10 text-center text-white cursor-pointer`}
        >
          <span>{item.title}</span>
        </li>
      ))}
      <li
        className="bg-purple-800 px-6 py-10 text-center hover:opacity-90 text-white cursor-pointer
      hover:bg-pink-700 transition-all min-w-[145px] flex items-center justify-center
      "
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined />
      </li>
      <li
        className="bg-orange-800 px-6 py-10 text-center hover:opacity-90 text-white cursor-pointer
      hover:bg-pink-700 transition-all min-w-[145px] flex items-center justify-center
      "
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        setCategories={setCategories}
        categories={categories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
}

export default Categories;
