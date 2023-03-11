import InputFrom from "./Component/InputFrom";
import Layout from "./Component/Layout";
import TopCard from "./Component/TopCard";
import TransactionList from "./Component/Transaction/TransactionList";

function App() {
  return (
    <Layout>
      <TopCard />

      <InputFrom />

      <TransactionList />
    </Layout>
  );
}

export default App;
