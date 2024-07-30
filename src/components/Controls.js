import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const Controls = ({ region, regions, setRegion, errorCount, setErrorCount, seed, setSeed, generateRandomSeed }) => {
    const handleSliderChange = (e) => {
        setErrorCount(Number(e.target.value));
    };

    const handleNumberChange = (e) => {
        setErrorCount(Math.min(Number(e.target.value), 1000));
    };

    return (
        <Form className="controls mb-4">
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="formRegion">
                        <Form.Label>Region</Form.Label>
                        <Form.Control as="select" value={region} onChange={(e) => setRegion(e.target.value)}>
                            {regions.map((reg) => (
                                <option key={reg} value={reg}>{reg}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formErrorCount">
                        <Form.Label>Errors per record</Form.Label>
                        <Form.Control type="range" min="0" max="10" value={errorCount} onChange={handleSliderChange} />
                        <Form.Control type="number" min="0" max="1000" value={errorCount} onChange={handleNumberChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formSeed">
                        <Form.Label>Seed</Form.Label>
                        <Form.Control type="number" value={seed} onChange={(e) => setSeed(Number(e.target.value))} />
                        <Button className="mt-2" onClick={generateRandomSeed}>Random</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default Controls;
