import { Button,message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart,increase,decrease,clearAllCarts } from "../../redux/CartSlice";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";



const CartTotals = () => {
  const { cartItems,tax, total } = useSelector((state) => state.cart);
  
  const navigate=useNavigate();
  const dispatch = useDispatch();
  //console.log("Price", price);
 // console.log(cartItems)

  useEffect(()=>{
     
    if(cartItems.length===0)
      localStorage.setItem("total",0);
  },[cartItems.length])
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cartItems.length >0 ?
          cartItems.map((item, index) => (
          <li key={index} className="cart-item flex justify-between">
            <div className="flex items-center">
              <img
                onClick={() => dispatch(deleteCart(item))}
                src={item.img}
                alt=""
                className="w-16 h-16 object-cover cursor-pointer"
              />
              <div className="flex flex-col ml-2">
                <b>{item.title}</b>
                <span>
                  {item.price} x {item.quantity}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                 onClick={()=>dispatch(increase(item))}
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
              />
              <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
              <Button
                onClick={()=>{
                  if(item.quantity===1){
                    if(window.confirm("Ürün Silinsin Mi?")){
                      dispatch(decrease(item))
                      message.success("Ürün başarıyla silindi")
                    }
                  }
                  else{
                    dispatch(decrease(item))
                    message.success("Ürün miktarı azaltıldı")
                  }
                  
                }}
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
              />
            </div>
          </li>
        )):"Sepette hiç ürün yok"}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{total}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-red-700">+{(total * tax) / 100}₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {total+(total*tax)/100}
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button onClick={()=>navigate("/cart")}  type="primary" size="large" className="w-full">
            Sipariş Oluştur
          </Button>
          <Button
          onClick={()=>{
            if(window.confirm("Tüm Ürünler Silinsin mi?")){
              dispatch(clearAllCarts())
              message.success("Sepet Temizlendi")
            }
          }}
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
            disabled={cartItems.length>0 ? false:true}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
