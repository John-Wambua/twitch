import React, {useEffect, useRef} from "react";
import {connect} from "react-redux"
import flv from "flv.js"
import {fetchStream} from "../../actions";

const StreamShow=props=>{
    const videoRef = useRef()
    const {id} =props.match.params
    let player;


    const buildPlayer=()=>{
        if (player || !props.stream) return;
        try {
            player = flv.createPlayer({
                type: 'flv',
                url: ` 'http://localhost:8000/live/${id}.flv'`
            })
            player.attachMediaElement(videoRef.current);
            player.load()
        }catch (e) {
            console.log(e)
        }

    }
    useEffect(()=>{
        props.fetchStream(id)
        buildPlayer();

        return ()=>{
            player.destroy();
        }
    },[])


    if (!props.stream) return <div>Loading...</div>
        return (
            <div>
                <video ref={videoRef} style={{ width: '100%'}} controls/>
                <h2>{props.stream.title}</h2>
                <p>{props.stream.description}</p>
            </div>
        )
}
const mapStateToProps=(state,ownProps) =>{
    return {stream: state.streams[ownProps.match.params.id]}
}
const mapStateToDispatch = {fetchStream}

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(StreamShow);