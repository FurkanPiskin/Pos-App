/* eslint-disable react/prop-types */
import { Button, Form, Input, message, Modal } from "antd";
import { v4 as uuidv4 } from 'uuid'

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const newCategory = { ...values, categoryId: uuidv4() };
     const response=await fetch("https://localhost:7211/api/Category", {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if(!response.ok){
        throw new Error("Kategori Eklenmedi");
      }
      const updatedCategories = await fetch(
        "https://localhost:7211/api/Category"
      );
      const categoriesData = await updatedCategories.json();
      message.success("Kategori başarıyla eklendi.");
      form.resetFields();
      setCategories(...categoriesData);
      setCategories([
        ...categories,
        {
          categoryId:uuidv4(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori Ekle"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Input />
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
