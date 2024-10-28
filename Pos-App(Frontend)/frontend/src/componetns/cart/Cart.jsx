/* eslint-disable react/prop-types */
import { Card,Button } from "antd"

const Cart = ({showModal}) => {
  return (
      <Card className="w-72 mt-4"  >
      <div className="flex justify-between">
      <span>Ara Toplam</span>
      <span>540.00Tl</span>
      </div>
      <div className="flex justify-between my-2">
      <span>KDV Toplam %8</span>
      <span className="text-red-600">+43.92</span>
      </div>
      <div className="flex justify-between">
      <b>Toplam</b>
      <b>540.00Tl</b>
      </div>
      <Button onClick={()=>showModal(true)} type="primary" size="large" className="mt-4 w-full">Sipariş OLuştur</Button>
    </Card>
    
  )
}

export default Cart
