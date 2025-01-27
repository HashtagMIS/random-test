import { useState } from "react";
import "../App.css";

function ApiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(5);

  const fetchHealthCheck = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3000/api/health");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDelayedResponse = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000/api/test/${seconds}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-container">
      <h1>API Test Page</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Health Check</h2>
        <button
          className="api-button"
          onClick={fetchHealthCheck}
          disabled={loading}
        >
          Check Health Status
        </button>
      </div>

      <div>
        <h2>Delayed Response Test</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Delay (seconds):
            <input
              type="number"
              value={seconds}
              onChange={(e) =>
                setSeconds(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <button
          className="api-button"
          onClick={fetchDelayedResponse}
          disabled={loading}
        >
          {loading
            ? `Waiting for ${seconds} seconds...`
            : "Test Delayed Response"}
        </button>
      </div>

      {error && (
        <div className="api-result" style={{ color: "red", marginTop: "2rem" }}>
          Error: {error}
        </div>
      )}

      {data && (
        <div className="api-result" style={{ marginTop: "2rem" }}>
          {JSON.stringify(data, null, 2)}
        </div>
      )}
    </div>
  );
}

export default ApiPage;
