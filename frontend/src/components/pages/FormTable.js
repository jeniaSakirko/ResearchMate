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

import {getAllParticipantForms, agreeOnForm} from '../api/participant'
import {getUserType} from "../common/UserContext";
import {approveOnForm, getAllResearchForms} from "../api/research";

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
    const [isParticipant, setIsParticipant] = useState(true);
    const [acceptedStatus, setAcceptedStatus] = useState('');


    useEffect(() => {
        reloadForms();
    }, []);

    const reloadForms = () => {
        setLoading(true)
        getUserType().then(userType => {
            if (userType && userType.toLowerCase() === "researcher") {
                return getAllResearchForms(1).then(data => {
                    setFormsList(data);
                    setLoading(false);
                    setIsParticipant(false);
                })
            } else if (userType && userType.toLowerCase() === "participant") {
                return getAllParticipantForms().then(data => {
                    setFormsList(data);
                    setLoading(false);
                    setIsParticipant(true);
                });
            }
        });


    };

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
        if (isParticipant) {
            return agreeOnForm(formRow.id).then(() => {
                setDisplayForm(false)
                return reloadForms();
            });
        } else {
            return approveOnForm(formRow.research.id, formRow.user.id, formRow.id).then(() => {
                setDisplayForm(false)
                return reloadForms();
            });
        }
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
                <Button label="Done" icon="pi pi-check" onClick={() => onHide()} autoFocus/>
            </div>
        );
    }

    const showDialog = (rowData, newItem) => {
        setFormRow(rowData);
        setIsNewForm(newItem);
        setDisplayForm(true);
    }

    const actionBodyTemplate = (rowData) => {
        if (isParticipant) {
            let newItem = false;
            let icon = "pi pi-eye"
            let className = "p-button-success"
            if (rowData.status === "New") {
                newItem = true;
                icon = "pi pi-check-square"
                className = ""
            }
            return <Button type="button" onClick={() => showDialog(rowData, newItem)} icon={icon}
                           className={className}></Button>;
        } else {
            let isDone = true;
            let icon = "pi pi-eye"
            let className = "p-button-success"
            if (rowData.status === "Under Review") {
                isDone = false;
                icon = "pi pi-check-square"
                className = ""
            }
            return <Button type="button" onClick={() => showDialog(rowData, !isDone)} icon={icon}
                           className={className}></Button>
        }
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

    const renderParticipantTable = () => {
        return (
            <DataTable value={formsList} paginator className="p-datatable-form-participant" header={header}
                       rows={10}
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                       rowsPerPageOptions={[10, 25, 50]} dataKey="id" rowHover filters={filters}
                       filterDisplay="menu"
                       loading={loading} responsiveLayout="scroll"
                       globalFilterFields={['name', 'research.name', 'status']}
                       emptyMessage="No forms found."
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="name" header="Form Name" sortable style={{minWidth: '14rem'}}/>
                <Column field="research.name" header="Research Name" sortable style={{minWidth: '14rem'}}/>
                <Column field="status" header="Status" sortable filterMenuStyle={{width: '14rem'}}
                        style={{minWidth: '10rem'}} body={statusBodyTemplate} filter
                        filterElement={statusFilterTemplate}/>
                <Column headerStyle={{width: '4rem', textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', overflow: 'visible'}} body={actionBodyTemplate}/>
            </DataTable>
        )
    }

    const renderResearchTable = () => {
        return (
            <DataTable value={formsList} paginator className="p-datatable-form-researcher" header={header}
                       rows={10}
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                       rowsPerPageOptions={[10, 25, 50]} dataKey="id" rowHover filters={filters}
                       filterDisplay="menu"
                       loading={loading} responsiveLayout="scroll"
                       globalFilterFields={['base_user.user.first_name', 'base_user.user.last_name', 'base_user.user.email', 'base_user.phone_number']}
                       emptyMessage="No forms found."
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="user.base_user.user.first_name" header="First Name" sortable
                        style={{minWidth: '14rem'}}/>
                <Column field="user.base_user.user.last_name" header="Last Name" sortable
                        style={{minWidth: '14rem'}}/>
                <Column field="user.base_user.user.email" header="Email" sortable style={{minWidth: '14rem'}}/>
                <Column field="user.base_user.phone_number" header="Phone" sortable dataType="numeric"
                        style={{minWidth: '8rem'}}/>
                <Column field="name" header="Form Name" sortable style={{minWidth: '14rem'}}/>
                <Column field="research.name" header="Research Name" sortable style={{minWidth: '14rem'}}/>
                <Column field="status" header="Status" sortable filterMenuStyle={{width: '14rem'}}
                        style={{minWidth: '10rem'}} body={statusBodyTemplate} filter
                        filterElement={statusFilterTemplate}/>

                <Column headerStyle={{width: '4rem', textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', overflow: 'visible'}} body={actionBodyTemplate}/>
            </DataTable>
        )
    }

    const formsTable = isParticipant ? renderParticipantTable() : renderResearchTable();
    // const formsTable = renderParticipantTable();


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
                {formsTable}
            </div>
        </div>
    );
}
