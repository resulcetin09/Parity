import "./lib/browser-globals";
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/big-shoulders-display/700";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/big-shoulders-display/900";
import "@fontsource/hanken-grotesk/400";
import "@fontsource/hanken-grotesk/600";
import "@fontsource/hanken-grotesk/700";
import "./styles.css";
import App from "./App";

class ErrorBoundary extends React.Component<React.PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="narrow">
          <h1 className="display" style={{ fontSize: 56 }}>
            The lights went out.
          </h1>
          <p className="lede">Reload the page to clear private data held in memory and start again. Nothing was submitted without your wallet's approval.</p>
          <a className="btn btn-plate" href={window.location.pathname}>
            Reload Parity
          </a>
        </main>
      );
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
