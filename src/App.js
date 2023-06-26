import { searchNFTs } from "./utils";
import { Button, Layout, Input, List, message } from "antd";
import { useState } from "react";
import "./App.css";
import NftCard from "./components/NftCards";

const { Header, Content } = Layout;

function App() {
  const handleSearch = async () => {
    if (searchText === "") {
      return;
    }
    setLoading(true);
    try {
      const data = await searchNFTs(searchText);
      setNfts(data.result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "white",
          }}
        >
          NFTBrowser
        </div>
      </Header>
      <Content
        style={{ height: "calc(100% -64px)", padding: 20, overflowY: "auto" }}
      >
        <Input.Group compact>
          <Input
            style={{
              width: 300,
            }}
            placeholder="Enter NFT name to search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Input.Group>
        <br />
        <List
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={nfts}
          renderItem={(nft) => (
            <NftCard nft={nft} />
            // <List.Item key={nft.token_id}>
            //   <Card title={JSON.parse(nft.metadata).name} />
            // </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}

export default App;
