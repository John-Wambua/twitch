import React, {useEffect} from "react";
import {connect} from "react-redux";

import {fetchStreams} from "../../actions";

const StreamList=({fetchStreams, streams})=>{

    useEffect(()=>{
        fetchStreams();
    },[fetchStreams])

    const renderList = () =>{

    }

    return(

        <div>
            StreamsList
        </div>
    )
}

const mapStateToProps=state=>{
    return {
        streams: Object.values(state.streams) //insert values in an object into an array
    }
}
const mapDispatchToProps = {fetchStreams}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamList);