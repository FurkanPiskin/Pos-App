/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();
  /*useEffect(() => {
    console.log("Products list updated:", products);
  }, [products]);*/

  const onFinish = async (values) => {
    try {
      
      const formattedValues = {
        
        ProductId: uuidv4(),
        title: values.title,
        Img: values.img,
        Price: Number(values.price), // Price'ı integer olarak gönderin
        Category: values.category, // Eğer category ID'yi string olarak göndermeniz gerekiyorsa
      };

      await axios.post("https://localhost:7211/api/Product", formattedValues, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      message.success("Ürün başarıyla eklendi.");
      form.resetFields();
      setProducts((prevProducts) => [...prevProducts, formattedValues]);
      console.log(products)
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("API Hatası:", error.response.data);
    }
  };


  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün adı giriniz." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[
            { required: true, message: "Ürün Görseli Alanı Boş Geçilemez!" },
          ]}
        >
          <Input placeholder="Ürün görseli giriniz." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[
            { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" },
          ]}
        >
          <Input placeholder="Ürün fiyatı giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori Seç"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Add;
