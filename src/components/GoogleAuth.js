import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import {signIn,signOut} from "../actions";


const GoogleAuth =({isSignedIn,signIn, signOut})=>{

    let GoogleAuth2;

    const renderAuthButton = () =>{
        if (isSignedIn===null) return null
        else if (isSignedIn) return (
            <div>
                <button onClick={()=>window.gapi.auth2.getAuthInstance().signOut()} className={"ui red google button"}>
                 <i className={"google icon"}/>
                 SignOut
                </button>
            </div>
        )
        else return <div>
                <button onClick={()=>window.gapi.auth2.getAuthInstance().signIn()} className={"ui red google button"}>
                    <i className={"google icon"}/>
                    Sign In with Google
                </button>
            </div>
    }

    const onAuthChange = (isSignedIn)=>{
        if (isSignedIn)  signIn(GoogleAuth2.currentUser.get().getId());
        else signOut();
    }


    useEffect(()=>{
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '742193109256-22l1f6o7sjt1hrv8lrab9tm9dml6vbt8.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                GoogleAuth2 = window.gapi.auth2.getAuthInstance();

                onAuthChange(GoogleAuth2.isSignedIn.get())
                GoogleAuth2.isSignedIn.listen(onAuthChange)
            })
        })
    },[])


    return(
        <div>{renderAuthButton()}</div>
    )
}

const mapStateToProps = (state)=>{
    return {isSignedIn: state.auth.isSignedIn}
}
const mapDispatchToProps = {signIn,signOut}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleAuth);