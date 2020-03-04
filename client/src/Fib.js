import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: '',
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const response = await axios.get('api/values/current');
        const values = typeof response.data === 'object' ? response.data : {};

        this.setState({ values });
    }

    async fetchIndexes() {
        const response = await axios.get('api/values/all');
        const seenIndexes = Array.isArray(response.data) ? response.data : [];

        this.setState({ seenIndexes });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { index } = this.state;

        await axios.post('/api/values', { index });
        this.setState({ index: '' });
    };

    render() {
        const { seenIndexes, values, index } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input value={index} onChange={event => this.setState({ index: event.target.value })} />
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen:</h3>
                {seenIndexes.map(({ number }) => number).join(', ')}
                <h3>Calculated Values:</h3>
                {Object.keys(values).map(key => (
                    <div key={key}>For index {key} I calculated {values[key]}</div>
                ))}
            </div>
        );
    }
}
