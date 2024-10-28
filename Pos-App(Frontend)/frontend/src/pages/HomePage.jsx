import { useEffect, useState } from 'react'
import CartTotals from '../componetns/cart/CartTotals'
import Categories from '../componetns/categories/Categories'
import Header from '../componetns/Header/Header'
import Products from '../componetns/products/Products'
const HomePage = () => {
  const [categories,setCategories]=useState([]);
  const [filtered,setFiltered]=useState([]);
  const [search,setSearch]=useState("");

 
  useEffect(()=>{
    const getCategories=async ()=>{
      try{
      const res=await fetch("https://localhost:7211/api/Category");
      const data= await res.json();
      data && setCategories(data.map((item)=>{
        return {...item,value:item.title}
      }))
      
      }
      catch(error){
        console.log(error);
      }
    }
   getCategories();
  },[])
  //console.log("filtered:",filtered)
  return (
    <div>
      <Header setSearch={setSearch}/>
<div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-20">
<div className="categories  overflow-auto max-h-[calc(100vh-_-120px)] md:pb-72 md:mr-0 -mr-[20px] md:pr-0 pr-10">
  <Categories categories={categories} setCategories={setCategories} setFiltered={setFiltered} />
</div>

 <div  className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-20 min-h-[500px]">
  <Products categories={categories} setCategories={setCategories} filtered={filtered} search={search} />
 </div>
 <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px]">
  <CartTotals/>
 </div>
</div>
    </div>
  )
}

export default HomePage
