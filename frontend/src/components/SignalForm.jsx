import { useState } from "react";
import api from "../services/api";

const SignalForm = ({ fetchSignals }) => {
  const [formData, setFormData] = useState({
    symbol: "",
    direction: "BUY",
    entryPrice: "",
    stopLoss: "",
    targetPrice: "",
    entryTime: "",
    expiryTime: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await api.post("/signals", formData);

      setSuccess("Signal created successfully");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      fetchSignals();

      setFormData({
        symbol: "",
        direction: "BUY",
        entryPrice: "",
        stopLoss: "",
        targetPrice: "",
        entryTime: "",
        expiryTime: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px" }}>Create Signal</h2>

      {error && <p style={styles.error}>{error}</p>}

      {success && <p style={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="symbol"
          placeholder="BTCUSDT"
          style={{ padding: "10px" }}
          value={formData.symbol}
          onChange={handleChange}
          required
        />

        <select
          name="direction"
          value={formData.direction}
          onChange={handleChange}
          style={{ padding: "10px" }}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <input
          type="number"
          name="entryPrice"
          style={{ padding: "10px" }}
          placeholder="Entry Price"
          value={formData.entryPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stopLoss"
          style={{ padding: "10px" }}
          placeholder="Stop Loss"
          value={formData.stopLoss}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="targetPrice"
          style={{ padding: "10px" }}
          placeholder="Target Price"
          value={formData.targetPrice}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="entryTime"
          style={{ padding: "10px" }}
          value={formData.entryTime}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="expiryTime"
          style={{ padding: "10px" }}
          value={formData.expiryTime}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Create Signal
        </button>
      </form>
    </div>
  );
};

// const styles = {
//   container: {
//     padding: "20px",
//     border: "1px solid #ccc",
//     marginBottom: "20px",
//     borderRadius: "8px",
//   },

//   form: {
//     display: "grid",
//     gap: "10px",
//   },

//   error: {
//     color: "red",
//   },

//   success: {
//     color: "green",
//   },
// };
const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ddd",
    marginBottom: "30px",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
  },

  form: {
    display: "grid",
    gap: "12px",
  },

  error: {
    color: "red",
  },

  success: {
    color: "green",
  },
};
export default SignalForm;
