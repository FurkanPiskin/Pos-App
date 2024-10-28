/* eslint-disable react/prop-types */
import { addProduct } from "../../redux/CartSlice";
import { message } from "antd";
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";


const ProductItem = ({ item }) => {
  const cart=useSelector((state)=>state.cart)
  const dispatch=useDispatch();
  const handleClick=()=>{
    dispatch(addProduct({...item,quantity:1}));
    message.success("Ürün Başarıyla Eklendi")
   
  }
  useEffect(()=>{

  },[])
  useEffect(() => {
    // cart değiştiğinde cartItems uzunluğunu yazdır
    console.log(cart.cartItems.length);
  }, [cart]);
  return (
    
    <div onClick={handleClick} className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
      <div className="product-img ">
        <img className="h-28 object-cover w-full border-b" src={item.img} alt="1" />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}</span>
      </div>
    </div>
   
  );
};

export default ProductItem;
