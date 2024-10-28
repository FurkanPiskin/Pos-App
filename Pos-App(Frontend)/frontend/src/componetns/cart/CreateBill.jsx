/* eslint-disable react/prop-types */
import { Button, Card, Input, message, Modal, Select } from "antd";

import Form from "antd/es/form/Form";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";



const CreateBill = ({ isModalOpen, setIsModalOpen}) => {
  const cart = useSelector((state) => state.cart);
  

  const navigate = useNavigate();


  const onFinish = async (values) => {
    // Body verisini hazırlayın
  
    

    
    const requestBody = {
      ...values,
      billId: uuidv4(), // Benzersiz bir ID oluştur
      subTotal: cart.total, // Ara toplam
      tax: parseFloat(((cart.total * cart.tax) / 100).toFixed(2)), // KDV
      // Toplam miktarı double olarak hesaplayıp yuvarlıyoruz
      totalAmount: parseFloat(
        (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
      ), // Genel Toplam
      cartItems: cart.cartItems,//Sepet ögleeri
    /*  createdAt: date.toLocaleString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })  */
       createdAt:new Date()

    };

    console.log("Gönderilen veri:", requestBody);
    // Gönderilecek veriyi konsola yazdır

    try {
      const res = await fetch("https://localhost:7211/api/Bill", {
        method: "POST",
        body: JSON.stringify(requestBody), // Veriyi JSON formatında gönder
        headers: { "Content-Type": "application/json; charset=UTF-8" }, // Header ayarları
      });

      if (res.ok) {
        message.success("Fatura başarıyla oluşturuldu.");
        navigate("/bills");
        // İsteğe bağlı olarak yönlendirme veya başka işlemler yapılabilir
      } else {
        const errorData = await res.json(); // Hata mesajını okuyun
        console.error("Hata mesajı:", errorData); // Hata mesajını konsola yazdır
        message.error("Bir şeyler yanlış gitti: " + errorData.message); // Kullanıcıya hata mesajını göster
      }
    } catch (error) {
      console.error("Network Error:", error); // Ağ hatası varsa konsola yazdır
      message.error("Bir şeyler yanlış gitti."); // Kullanıcıya genel bir hata mesajı göster
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name="customerName"
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Bir Müşteri Adı Yazınız" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="phoneNumber"
          label="Tel No"
        >
          <Input placeholder="Bir Tel No Yazınız" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          rules={[{ required: true }]}
          name="paymentMode"
        >
          <Select placeholder="Bir Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Genel Toplam</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
