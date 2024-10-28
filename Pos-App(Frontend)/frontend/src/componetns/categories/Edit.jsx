/* eslint-disable react/prop-types */
import { Button, Form, Input, message, Modal, Table } from "antd";
import { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = async (values) => {
    try {
      const response = await fetch(`https://localhost:7211/api/Category/${editingRow.categoryId}`, {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow.categoryId }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (!response.ok) {
        throw new Error("Kategori Güncellenmedi");
      }
      message.success("Kategori başarıyla güncellendi.");
      setCategories(
        categories.map((item) => {
          if (item.categoryId === editingRow.categoryId) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
      setEditingRow({}); // Kaydettikten sonra düzenleme durumunu sıfırla
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        const response = await fetch(`https://localhost:7211/api/Category/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Kategori silinemedi.");
        }
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item.categoryId !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record.categoryId === editingRow.categoryId) {
          return (
            <Form.Item className="mb-0" name="title" initialValue={record.title}>
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record.categoryId)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"categoryId"}
        />
      </Form>
    </Modal>
  );
};
export default Edit
