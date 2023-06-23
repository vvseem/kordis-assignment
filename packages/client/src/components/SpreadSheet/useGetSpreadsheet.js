import { useAsync } from "react-use";

const SPREADSHEET_URI = "http://localhost:4001/api/getData";

const useGetSpreadsheet = () => {
  return useAsync(async () => {
    const response = await fetch(SPREADSHEET_URI);
    const data = await response.json();

    return data;
  }, []);
};

export default useGetSpreadsheet;
