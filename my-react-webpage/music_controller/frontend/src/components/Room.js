// this will house the room , once inside the room , this is what we see
// we are going to implimenet a functional component 
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';



export default function Room(){
    const{roomCode} = useParams();
    const[state, setState] = useState({
        votes_to_skip: 4,
        guest_can_pause: false,
        isHost: false,
    });

    useEffect( () =>{
        getRoomDetails();
    },[]);

    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode)
        .then(response => response.json())
        .then(data => {
            setState({
                votes_to_skip: data.votes_to_skip,
                guest_can_pause: data.guest_can_pause,
                isHost: data.is_host
            });
        })
        .catch(error => {
            console.log("Error fetching room details:", error);
        });
    }

    return(
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {state.votes_to_skip}</p>
            <p>Guest Can Pause: {String(state.guest_can_pause)}</p>
            <p>Host: {String(state.isHost)}</p>
        </div>
    );

}









