import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { Paginator } from 'primereact/paginator';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';

export default function ExportDemo() {
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const dt = useRef(null);

    const cols = [
        { field: 'UserId', header: 'UserId' },
        { field: 'FirstName', header: 'FirstName' },
        { field: 'Age', header: 'Age' },
        { field: 'Mobile', header: 'Mobile' },
        { field: 'Email', header: 'Email' },
        { field: 'UserName', header: 'UserName' },
        { field: 'Status', header: 'Status' }
    ];

    useEffect(() => {
        loadProducts();
    }, [first, rows]);

    const loadProducts = async () => {
        const res = await axios.get(`http://localhost:3000/users`);
        setProducts(res.data);
   
    };

    const renderHeader = () => {
        return (
            <div className="table-header">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" className="p-inputtext-sm" />
                </IconField>
                <div>   
                    <Button type="button" icon="pi pi-file-pdf" severity="primery" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
                </div>
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        const statusLabel = rowData.Status === 1 ? 'Active' : 'Inactive';
        const statusStyle = {
            backgroundColor: rowData.Status === 1 ? '#d4edda' : '#f8d7da', // Green for active, Red for inactive
            color: rowData.Status === 1 ? '#155724' : '#721c24',
            padding: '5px',
            borderRadius: '5px',
            textAlign: 'center'
        };
        return <span style={statusStyle}>{statusLabel}</span>;
    };

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.FirstName }));
    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, products);
                doc.save('products.pdf');
            });
        });
    };
    const header = renderHeader();

    return (
        <div className="card">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <DataTable
                ref={dt}
                value={products}
                header={header}
                globalFilter={globalFilter}
                paginator={true}
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                rowsPerPageOptions={[10]}
                onPage={(e) => setFirst(e.first) && setRows(e.rows)}
                tableStyle={{ minWidth: '50rem' }}
            >
                {cols.map((col, index) => (
                    <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                    
                        filterPlaceholder={`Search by ${col.header}`}
                        body={col.field === 'Status' ? statusBodyTemplate : null} // Apply the template to the Status column
                    />
                ))}
            </DataTable>
        </div>
    );
}
