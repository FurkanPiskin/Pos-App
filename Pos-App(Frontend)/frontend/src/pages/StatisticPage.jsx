/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../componetns/Header/Header";
import User from "../../public/images/user.png";
import StatisticCard from "../componetns/statistic_card/StatisticCard";
import { Area, Pie } from "@ant-design/plots";
import { useEffect,useState } from "react";

const StatisticPage = () => {
  const [data, setData] = useState([]);
 
  const [currentUser,setCurrentUser]=useState({});
 


  useEffect(() => {

     setCurrentUser(JSON.parse(localStorage.getItem("currentUser2")));
    console.log(currentUser.userName);
    asyncFetch();
  }, []);


  const asyncFetch = () => {
    fetch(
      "https://localhost:7211/api/Bill"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  console.log(data)

  const totalAmount=()=>{
    const amount=data.reduce((total,item)=>item.totalAmount+total,0);
    return amount.toFixed(2);
  }
  const totalProduct=()=>{
 const totalProduct=data.reduce((total,item)=>{
  const itemTotal=item.cartItems.reduce((sum,cartItem)=>sum+cartItem.quantity,0)
  return total+itemTotal;
 },0)
 return totalProduct
  }



  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "outer", // Dışarıda göster
      content: (dataItem) => dataItem.customerName,
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };
  
  
  return (
    <div className="overflow-auto max-h-screen pb-20 ">
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
        <div>
          <h2>
            Hoş geldin{" "}
            <span className="font-bold text-xl text-green-700">{currentUser.userName}</span>
          </h2>
        </div>
        <div className="statistic-cards border grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-3">
          
          <StatisticCard image={User} cardName="Toplam Musteri" cardInfo={data?.length}/>
          <StatisticCard image={User} cardName="Toplam Kazanç" cardInfo={totalAmount()}/>
          <StatisticCard image={User} cardName="Toplam Satış" cardInfo={data?.length}/>
          <StatisticCard image={User} cardName="Toplam Ürün" cardInfo={totalProduct()}/>
         
        </div>
        <div className="flex justify-between gap-10 lg:flex-row flex-col items-center ">
            <div className="lg:w-1/2  lg:h-full  h-72">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 lg:h-full  h-72">
              <Pie {...config2} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default StatisticPage;
