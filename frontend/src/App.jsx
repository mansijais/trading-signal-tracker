import { useEffect, useState } from "react";

import api from "./services/api";

import SignalForm from "./components/SignalForm";
import SignalTable from "./components/SignalTable";

function App() {
  const [signals, setSignals] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchSignals = async () => {
    try {
      setLoading(true);

      const response = await api.get("/signals");

      setSignals(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSignal = async (id) => {
    try {
      await api.delete(`/signals/${id}`);

      fetchSignals();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSignals();

    // auto refresh every 15 sec
    const interval = setInterval(() => {
      fetchSignals();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Trading Signal Tracker</h1>

      <SignalForm fetchSignals={fetchSignals} />

      {loading ? (
        // <p>Loading...</p>
        <p>Fetching live prices...</p>
      ) : (
        <SignalTable signals={signals} deleteSignal={deleteSignal} />
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};

export default App;
