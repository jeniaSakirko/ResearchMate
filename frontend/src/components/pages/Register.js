import React, {useState} from 'react';
import {Form, Field} from 'react-final-form';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {Checkbox} from 'primereact/checkbox';
import {Dialog} from 'primereact/dialog';
import {Divider} from 'primereact/divider';
import {classNames} from 'primereact/utils';
import {register} from "../api/participant";


import '../css/FormDemo.css';

//username, password, email, firstName, lastName, phone
export const Register = () => {

    const [showMessage, setShowMessage] = useState(false);
    const [showMessage1, setShowMessage1] = useState(false);
    const [formData, setFormData] = useState({});
    const [errorData, seterrorData] = useState({});

    const validate = (data) => {
        let errors = {};

        if (!data.username) {
            errors.username = 'user name is required.';
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }
        if (!data.firstName) {
            errors.firstName = 'first Name is required.';
        }
        if (!data.lastName) {
            errors.lastName = 'last Name is required.';
        }
        if (!data.phone) {
            errors.phone = 'phone is required.';
        }

        if (!data.accept) {
            errors.accept = 'You need to agree to the terms and conditions.';
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);

        onRegister(data).then(response => {
            if (response.status == '400') {
                seterrorData(response.data);
                setShowMessage1(true);
            } else {
                setShowMessage(true);
            }

        });

        //form.restart();
    };
    const onRegister = async (data) => {
        return await register(data.username, data.password, data.email, data.firstName, data.lastName, data.phone)
    }

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"
                                                                              autoFocus
                                                                              onClick={() => setShowMessage(false)}/>
    </div>;
    const dialogFooter1 = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"
                                                                               autoFocus
                                                                               onClick={() => setShowMessage1(false)}/>
    </div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider/>
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{lineHeight: '1.5'}}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter}
                    showHeader={false} breakpoints={{'960px': '80vw'}} style={{width: '30vw'}}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{fontSize: '5rem', color: 'var(--green-500)'}}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{lineHeight: 1.5, textIndent: '1rem'}}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days
                        without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>
            <Dialog visible={showMessage1} onHide={() => setShowMessage1(false)} position="top" footer={dialogFooter1}
                    showHeader={false} breakpoints={{'960px': '80vw'}} style={{width: '30vw'}}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i style={{fontSize: '5rem', color: 'var(--green-500)'}}></i>
                    <h5>oh no something went wrong! </h5>
                    <p style={{lineHeight: 1.5, textIndent: '1rem'}}>
                        <b>{errorData.message}</b>
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <Form onSubmit={onSubmit} initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        firstName: null,
                        lastName: null,
                        phone: null,
                        accept: false
                    }} validate={validate} render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="username" render={({input, meta}) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="username" {...input} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                        <label htmlFor="username"
                                               className={classNames({'p-error': isFormFieldValid(meta)})}>username*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )}/>

                            <Field name="firstName" render={({input, meta}) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="firstName" {...input} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                        <label htmlFor="firstName"
                                               className={classNames({'p-error': isFormFieldValid(meta)})}>firstName*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )}/>
                            <Field name="lastName" render={({input, meta}) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="lastName" {...input} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                        <label htmlFor="lastName"
                                               className={classNames({'p-error': isFormFieldValid(meta)})}>lastName*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )}/>

                            <Field name="phone" render={({input, meta}) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="phone" {...input} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                        <label htmlFor="phone"
                                               className={classNames({'p-error': isFormFieldValid(meta)})}>phone*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )}/>

                            <Field name="email" render={({input, meta}) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope"/>
                                        <InputText id="email" {...input}
                                                   className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                        <label htmlFor="email"
                                               className={classNames({'p-error': isFormFieldValid(meta)})}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )}/>
                            <Field name="password" render={({input, meta}) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask
                                                  className={classNames({'p-invalid': isFormFieldValid(meta)})}
                                                  header={passwordHeader} footer={passwordFooter}/>
                                        <label htmlFor="password"
                                               className={classNames({'p-error': isFormFieldValid(meta)})}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )}/>
                            <Field name="accept" type="checkbox" render={({input, meta}) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input}
                                              className={classNames({'p-invalid': isFormFieldValid(meta)})}/>
                                    <label htmlFor="accept" className={classNames({'p-error': isFormFieldValid(meta)})}>I
                                        agree to the terms and conditions*</label>
                                </div>
                            )}/>
                            <Button type="submit" label="Submit" className="mt-2"/>
                        </form>
                    )}/>
                </div>
            </div>
        </div>
    );
}
                 