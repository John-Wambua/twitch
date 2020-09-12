import React, {useEffect} from "react";
import {fetchStream,updateStream} from "../../actions";
import {connect} from "react-redux"
import StreamForm from "./StreamForm";
import _ from 'lodash'

const StreamEdit=(props)=>{
    useEffect(()=>{
         props.fetchStream(props.match.params.id)

    },[])
    console.log(props)

    if (!props.stream) return <div>Loading...</div>

    const onSubmit=formValues=>{
        props.updateStream(props.match.params.id,formValues)
        // console.log(formValues)
    }
    return (
        <div>
            <h3>Edit a Stream</h3>
            <StreamForm
                initialValues={_.pick(props.stream,['title','description'])}
                onFormSubmit={onSubmit}
            />
        </div>
    )
}
const mapStateToProps = (state,ownProps)=>{

    return { stream: state.streams[ownProps.match.params.id] }
}

const mapDispatchToProps={fetchStream,updateStream}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamEdit);