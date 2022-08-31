import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import React, {useState, useEffect} from 'react';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Dialog} from 'primereact/dialog';

import {getAllForms} from '../api/participant'
import {getUserToken} from "../common/UserContext";

export const FormTable = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const [isNewForm, setIsNewForm] = useState(false);
    const [formRow, setFormRow] = useState(false);

    const [formsList, setFormsList] = useState(null);
    const [filters, setFilters] = useState({
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'name': {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        'research.name': {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},

    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const statuses = ['new', 'underreview', 'done'];

    useEffect(() => {
        getUserToken().then(token => {
            getAllForms(1, token).then(data => {
                setFormsList(data);
                setLoading(false)
            })
        });
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Forms</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </span>
            </div>
        )
    }

    const onHide = () => {
        setDisplayForm(false);
    }

    const acceptForm = () => {
        console.log("Accepted");
        setDisplayForm(false);
    }

    const renderFooter = () => {
        if (isNewForm) {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text"/>
                    <Button label="Accept" icon="pi pi-check" onClick={() => acceptForm()} autoFocus/>
                </div>
            );
        }
        return (
            <div>
                <Button label="Done" icon="pi pi-check" onClick={() => acceptForm()} autoFocus/>
            </div>
        );
    }

    const showFullDialog = (rowData, newItem) => {
        setFormRow(rowData);
        setIsNewForm(newItem);
        setDisplayForm(true);
    }


    const actionBodyTemplate = (rowData) => {
        let newItem = false;
        let icon = "pi pi-eye"
        let className = "p-button-success"
        if (rowData.status === "New") {
            newItem = true;
            icon = "pi pi-check-square"
            className = ""
        }
        return <Button type="button" onClick={() => showFullDialog(rowData, newItem)} icon={icon}
                       className={className}></Button>;
    }

    const statusBodyTemplate = (rowData) => {
        return <span
            className={`form-badge status-${rowData.status.toLowerCase().replace(/ /g, "")}`}>{rowData.status}</span>;
    }

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses}
                         onChange={(e) => options.filterCallback(e.value, options.index)}
                         itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter"
                         showClear/>;
    }

    const statusItemTemplate = (option) => {
        return <span className={`form-badge status-${option.toLowerCase().replace(/ /g, "")}`}>{option}</span>;
    }

    const header = renderHeader();

    return (
        <div className="datatable-base">
            <div className="card">
                <Dialog header={formRow.name} visible={displayForm} style={{width: '50vw'}} footer={renderFooter()}
                        onHide={() => onHide()}>
                    <iframe
                        style={{width: '100%', minHeight: '540px'}}
                        width="100%"
                        src={formRow.url}
                    />
                </Dialog>
                <DataTable value={formsList} paginator className="p-datatable-customers" header={header} rows={10}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           rowsPerPageOptions={[10, 25, 50]}
                           dataKey="id" rowHover
                           filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                           globalFilterFields={['name', 'research.name', 'status']}
                           emptyMessage="No participants found."
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="name" header="Form Name" sortable style={{minWidth: '14rem'}}/>
                    <Column field="research.name" header="Research Name" sortable style={{minWidth: '14rem'}}/>
                    <Column field="status" header="Status" sortable filterMenuStyle={{width: '14rem'}}
                            style={{minWidth: '10rem'}} body={statusBodyTemplate} filter
                            filterElement={statusFilterTemplate}/>
                    <Column headerStyle={{width: '4rem', textAlign: 'center'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible'}} body={actionBodyTemplate}/>
                </DataTable>
            </div>
        </div>
    );
}
