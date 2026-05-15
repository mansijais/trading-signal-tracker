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
      <h2>Create Signal</h2>

      {error && <p style={styles.error}>{error}</p>}

      {success && <p style={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="symbol"
          placeholder="BTCUSDT"
          value={formData.symbol}
          onChange={handleChange}
          required
        />

        <select
          name="direction"
          value={formData.direction}
          onChange={handleChange}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <input
          type="number"
          name="entryPrice"
          placeholder="Entry Price"
          value={formData.entryPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stopLoss"
          placeholder="Stop Loss"
          value={formData.stopLoss}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="targetPrice"
          placeholder="Target Price"
          value={formData.targetPrice}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="entryTime"
          value={formData.entryTime}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="expiryTime"
          value={formData.expiryTime}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Signal</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    borderRadius: "8px",
  },

  form: {
    display: "grid",
    gap: "10px",
  },

  error: {
    color: "red",
  },

  success: {
    color: "green",
  },
};

export default SignalForm;