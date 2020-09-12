import React from "react";
import {connect} from "react-redux"
import {createStream} from "../../actions";
import StreamForm from "./StreamForm";


const StreamCreate=props=>{
    const {createStream} =props

    const onSubmit = (formValues)=>{
        createStream(formValues)
    }

    return(
        <div>
            <h3>Create a Stream</h3>
            <StreamForm onFormSubmit={onSubmit}/>
        </div>
    )
}

const mapDispatchToProps ={createStream}

export default connect(
    null,
    mapDispatchToProps
)(StreamCreate);