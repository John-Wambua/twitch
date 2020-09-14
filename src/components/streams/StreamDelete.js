import React, {useEffect} from "react";
import {connect} from "react-redux"
import Modal from "../Modal";
import history from "../../history";
import {fetchStream,deleteStream} from "../../actions";
import {Link} from "react-router-dom";

const StreamDelete=props=>{
    const {id} = props.match.params
    useEffect(()=>{
        props.fetchStream(id)
    },[])


    const  renderActions=() =>{
        return (
        <>
            <button onClick={()=>props.deleteStream(id)}  className={"ui button negative"}>Delete</button>
            <Link to={'/'} className={"ui button"}>Cancel</Link>
        </>
    )}
    const renderContent=()=>{
        if (!props.stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete this stream: ${props.stream.title}?`
    }

    return(
        <Modal
            title={"Delete Stream"}
            content={renderContent()}
            actions={renderActions()}
            onDismiss={()=>history.push('/')}
        />
    )
}

const mapStateToProps=(state,ownProps)=>{
    return {stream: state.streams[ownProps.match.params.id]}
}
const mapStateToDispatch={fetchStream,deleteStream}

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(StreamDelete);