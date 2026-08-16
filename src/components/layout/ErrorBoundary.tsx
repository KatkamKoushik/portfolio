"use client";

import React, { Component, ReactNode } from "react";
import CanvasFallback from "./CanvasFallback";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("WebGL Error Boundary Caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <CanvasFallback />;
    }

    return this.props.children;
  }
}
