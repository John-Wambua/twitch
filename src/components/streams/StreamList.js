import React, {useEffect} from "react";
import {connect} from "react-redux";

import {fetchStreams} from "../../actions";
import {Link} from "react-router-dom";

const StreamList=({fetchStreams, streams,currentUserId, isSignedIn})=>{

    useEffect(()=>{
        fetchStreams();

    },[fetchStreams])

    const renderAdmin =(stream)=>{
        if (stream.userId===currentUserId) {
            return(
                <div className={"right floated content"}>

                    <Link to={`/streams/edit/${stream.id}`} className={"ui button primary"}>
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className={"ui button negative"}>
                        DELETE
                    </Link>
                </div>)
        }
    }

    const renderList = () =>{
        return streams.map(stream=>{
            return (
                <div className={"item"} key={stream.id}>
                    {renderAdmin(stream)}
                    <i className={"large middle aligned icon camera"}/>
                    <div className={"content"}>
                        {stream.title}
                        <div className={"description"}>{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    const renderCreate = ()=>{
        if (isSignedIn){
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to={"/streams/new"} className={"ui button primary"}>
                        Create Stream
                    </Link>
                </div>
            )
        }
    }
    return(

        <div>
            <h2>Streams</h2>
            <div className={"ui celled list"}>{renderList()}</div>
            {renderCreate()}
        </div>
    )
}

const mapStateToProps=state=>{
    return {
        streams: Object.values(state.streams), //insert values from an object into an array
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    }
}
const mapDispatchToProps = {fetchStreams}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamList);