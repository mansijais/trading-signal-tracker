const SignalTable = ({ signals, deleteSignal }) => {
  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Direction</th>
          <th>Entry</th>
          <th>Current</th>
          <th>Target</th>
          <th>Stop Loss</th>
          <th>Status</th>
          <th>ROI %</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {signals.map((signal) => (
          <tr key={signal.id}>
            <td>{signal.symbol}</td>

            <td>{signal.direction}</td>

            <td>{signal.entryPrice}</td>

            <td>{signal.currentPrice}</td>

            <td>{signal.targetPrice}</td>

            <td>{signal.stopLoss}</td>

            <td>{signal.status}</td>

            <td>{signal.roi}%</td>

            <td>
              <button onClick={() => deleteSignal(signal.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SignalTable;