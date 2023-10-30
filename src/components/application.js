import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Sheet from './sheet'

function Application() {
    const [name, setName] = useState('')
    const [year, setYear] = useState(2023)
    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState('xero')
    const [sheet, setSheet] = useState(null)
    const [status, setStatus] = useState('')

    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }

    const yearChangeHandler = (event) => {
        setYear(event.target.value)
    }

    const amountChangeHandler = (event) => {
        setAmount(event.target.value)
    }

    const providerChangeHandler = (event) => {
        setProvider(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        if (null == sheet) {
            const url = process.env.REACT_APP_BACKEND + 'accounting/fetch_balance_sheet';
            fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    year: year,
                    provider: provider          
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSheet(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
        } else {
            if (status === '') {
                const url = process.env.REACT_APP_BACKEND + 'decision';
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        year: year,
                        sheet: sheet,
                        amount: amount          
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.status) {
                        setStatus('Approved');
                    } else {
                        setStatus('Not Approved');
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
            }
        }
    }

    const renderSheet = () => {
        if (sheet)
            return <Sheet sheet={sheet} />;
        return null;
    }

    const renderStatus = () => {
        if (status !== '') {
            return (
                <Form.Group className="mb-3">
                    <Form.Text>{status}</Form.Text>
                </Form.Group>
            );
        }
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" value={name} onChange={nameChangeHandler} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="year">
                <Form.Label>Year Established</Form.Label>
                <Form.Control type="number" value={year} onChange={yearChangeHandler} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control type="number" value={amount} onChange={amountChangeHandler} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="provider">
                <Form.Label>Provider</Form.Label>
                <Form.Select aria-label="Provider" value={provider} onChange={providerChangeHandler}>
                    <option value="xero">Xero</option>
                    <option value="myob">MYOB</option>
                </Form.Select>
            </Form.Group>
            {renderSheet()}
            <Button variant="primary" type="submit">
                Submit
            </Button>
            {renderStatus()}
        </Form>
    );
}

export default Application;