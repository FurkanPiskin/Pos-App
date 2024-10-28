import { Button, Input, Space, Table } from "antd";
import Header from "../componetns/Header/Header.jsx";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const CustomerPage = () => {
  const [billItems, setBillItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("https://localhost:7211/api/Bill");
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  },[]);
  console.log("billItems:",billItems)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps('customerName')
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps('phoneNumber')
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "paymentMode",
      key: "İşlem",
      render:(text)=>{
        return <span>{text.substring}</span>
      }
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Müşterilerim</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x:1000,
            y:300
          }}
          rowKey="billId"
        />
      </div>
    </>
  );
};

export default CustomerPage;
