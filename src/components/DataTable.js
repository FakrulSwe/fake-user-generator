import React from 'react';
import { Table } from 'react-bootstrap';

const DataTable = ({ data }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Random Identifier</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {data.map((record) => (
                    <tr key={record.id}>
                        <td>{record.index}</td>
                        <td>{record.id}</td>
                        <td>{record.name}</td>
                        <td>{record.address}</td>
                        <td>{record.phone}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DataTable;
