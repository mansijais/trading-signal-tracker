const getTimeRemaining = (expiryTime) => {
  const now = new Date();

  const expiry = new Date(expiryTime);

  const diff = expiry - now;

  if (diff <= 0) {
    return "Expired";
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));

  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};
const getStatusColor = (status) => {
  switch (status) {
    case "TARGET_HIT":
      return "green";

    case "STOPLOSS_HIT":
      return "red";

    case "EXPIRED":
      return "gray";

    default:
      return "blue";
  }
};
const SignalTable = ({ signals, deleteSignal }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.cell}>Time Remaining</th>
          <th style={styles.cell}>Symbol</th>
          <th style={styles.cell}>Direction</th>
          <th style={styles.cell}>Entry</th>
          <th style={styles.cell}>Current</th>
          <th style={styles.cell}>Target</th>
          <th style={styles.cell}>Stop Loss</th>
          <th style={styles.cell}>Status</th>
          <th style={styles.cell}>ROI %</th>
          <th style={styles.cell}>Action</th>
        </tr>
      </thead>

      <tbody>
        {signals.map((signal) => (
          <tr key={signal.id}>
            <td style={styles.cell}>{getTimeRemaining(signal.expiryTime)}</td>
            <td style={styles.cell}>{signal.symbol}</td>

            <td style={styles.cell}>{signal.direction}</td>

            <td style={styles.cell}>{signal.entryPrice}</td>

            <td style={styles.cell}>{signal.currentPrice?.toFixed(2)}</td>

            <td style={styles.cell}>{signal.targetPrice}</td>

            <td style={styles.cell}>{signal.stopLoss}</td>

            <td
              style={{
                ...styles.cell,
                color: getStatusColor(signal.status),
                fontWeight: "bold",
              }}
            >
              {signal.status}
            </td>

            <td style={styles.cell}>{signal.roi?.toFixed(2)}%</td>

            <td style={styles.cell}>
              <button
                onClick={() => deleteSignal(signal.id)}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
  },
};

export default SignalTable;
