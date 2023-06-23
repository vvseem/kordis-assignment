import SpreadSheet from "./components/SpreadSheet";
import useGetSpreadsheet from "./components/SpreadSheet/useGetSpreadsheet";
import Layout from "./components/Layout";

const App = () => {
  const { loading, value } = useGetSpreadsheet();

  if (loading) return <p>Loading</p>;

  return (
    <Layout>
      <SpreadSheet value={value} />
    </Layout>
  );
};

export default App;
