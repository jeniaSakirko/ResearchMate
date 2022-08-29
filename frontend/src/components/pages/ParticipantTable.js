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
import '../css/DataTable.css';

import {getAll} from '../api/participant'
import {getUserToken} from "../common/UserContext";

export const ParticipantTable = () => {
    const [Participants, setParticipants] = useState(null);
    const [filters, setFilters] = useState({
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'base_user.user.first_name': {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        'base_user.user.last_name': {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        'base_user.user.email': {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        'base_user.phone_number': {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]
        },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getUserToken().then(token => {
            getAll(token).then(data => {
            setParticipants(data);
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
                <h5 className="m-0">Customers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </span>
            </div>
        )
    }

    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-cog"></Button>;
    }

    const header = renderHeader();

    return (
        <div className="datatable-base">
            <div className="card">
                <DataTable value={Participants} paginator className="p-datatable-customers" header={header} rows={10}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           rowsPerPageOptions={[10, 25, 50]}
                           dataKey="id" rowHover
                           filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                           globalFilterFields={['base_user.user.first_name', 'base_user.user.last_name', 'base_user.user.email', 'base_user.phone_number']}
                           emptyMessage="No participants found."
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="base_user.user.first_name" header="First Name" sortable style={{minWidth: '14rem'}}/>
                    <Column field="base_user.user.last_name" header="Last Name" sortable style={{minWidth: '14rem'}}/>
                    <Column field="base_user.user.email" header="Email" sortable style={{minWidth: '14rem'}}/>
                    <Column field="base_user.phone_number" header="Phone" sortable dataType="numeric"
                            style={{minWidth: '8rem'}}/>
                    <Column headerStyle={{width: '4rem', textAlign: 'center'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible'}} body={actionBodyTemplate}/>
                </DataTable>
            </div>
        </div>
    );
}
