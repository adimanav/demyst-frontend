import Table from 'react-bootstrap/Table';

function Sheet({sheet}) {

    const renderBody = () => {
        const rows = []
        sheet.forEach(element => {
            rows.push(
            <tr>
                <td>{element.year}</td>
                <td>{element.month}</td>
                <td>{element.profitOrLoss}</td>
            </tr>);
        });
        return <tbody>{rows}</tbody>
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Profit or Loss</th>
                </tr>
            </thead>
            {renderBody()}
        </Table>
    );
}

export default Sheet;