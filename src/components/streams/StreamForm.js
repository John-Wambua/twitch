import React from "react";
import {Field, reduxForm } from "redux-form";



const renderInput = ({input,label,type,meta:{touched, error}})=>{
    const className = `field ${error&&touched&&'error'}`
    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type}/>

            {touched&&((error&& <span className={"ui error message"}>
                <div className={"header"}>{error}</div>
            </span>))}
        </div>
    )
}

const validate = formValues=>{
    const errors = {};
    if (!formValues.title){
        errors.title = 'Title is required';
    }
    if (!formValues.description){
        errors.description = 'Description is required';
    }
    return errors;
}



const StreamForm=props=>{
    const {handleSubmit,onFormSubmit} =props

    const onSubmit = (formValues)=>{
        onFormSubmit(formValues)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={"ui form error"}>
            <Field name={"title"} component={renderInput} type={"text"} label={"Enter Title"}/>
            <Field name={"description"} component={renderInput} type={"text"} label={"Enter Description"}/>

            <button type={"submit"} className={"ui button primary"}>Submit</button>
        </form>
    )
}


export default (reduxForm({
    form: 'streamForm',
    validate
})(StreamForm));