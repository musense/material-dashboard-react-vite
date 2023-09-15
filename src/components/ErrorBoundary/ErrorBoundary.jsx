import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error or perform other actions here
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can customize the error message or UI that gets displayed
            return <div>Something went wrong. Please try again later.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
