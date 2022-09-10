import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProductService } from './ProductService';
// import './DataTableDemo.css';

export const DataTableEditDemo = () => {
    const [products3, setProducts3] = useState(null);
    const [editingRows, setEditingRows] = useState({});
    const toast = useRef(null);

    const statuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];

    const dataTableFuncMap = {
        'products3': setProducts3,
    };

    const productService = new ProductService();

    useEffect(() => {
        fetchProductData('products3');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProductData = (productStateKey) => {
        productService.getProductsSmall()
            .then(data => dataTableFuncMap[`${productStateKey}`](data));
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'INSTOCK':
                return 'In Stock';

            case 'LOWSTOCK':
                return 'Low Stock';

            case 'OUTOFSTOCK':
                return 'Out of Stock';

            default:
                return 'NA';
        }
    }

    const onRowEditComplete2 = (e) => {
        let _products3 = [...products3];
        let { newData, index } = e;

        _products3[index] = newData;

        setProducts3(_products3);
    }

    const onRowEditChange = (e) => {
        setEditingRows(e.data);
    }

    const setActiveRowIndex = (index) => {
        let _editingRows = { ...editingRows, ...{ [`${products3[index].id}`]: true } };
        setEditingRows(_editingRows);
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const statusEditor = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
                }} />
        );
    }

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />
    }

    const statusBodyTemplate = (rowData) => {
        return getStatusLabel(rowData.inventoryStatus);
    }

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    }

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
            <div className="card">
                <h5>Programmatic</h5>
                <div className="pt-2 pb-4">
                    <Button onClick={() => setActiveRowIndex(0)} className="p-button-text" label="Activate 1st" />
                    <Button onClick={() => setActiveRowIndex(2)} className="p-button-text" label="Activate 3rd" />
                    <Button onClick={() => setActiveRowIndex(4)} className="p-button-text" label="Activate 5th" />
                </div>

                <div className="p-fluid">
                    <DataTable value={products3} editMode="row" dataKey="id" editingRows={editingRows} onRowEditChange={onRowEditChange} onRowEditComplete={onRowEditComplete2} responsiveLayout="scroll">
                        <Column field="code" header="Code" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="price" header="Price" body={priceBodyTemplate} editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<DataTableEditDemo />, rootElement);