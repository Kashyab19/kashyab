import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-container">
          <h1 className="heading-large">Something broke.</h1>
          <p className="text-body">
            That&apos;s on me. Try refreshing, or head <Link to="/" className="link-external">home</Link>.
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}
