import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socketService, SOCKET_EMIT_ADD_TYPING, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_STOP_TYPING, SOCKET_EVENT_ADD_MSG, SOCKET_EVENT_ADD_TYPING, SOCKET_EVENT_STOP_TYPING } from "../services/socket.service";

export function ToyChat({ toyId, history, setIsChatOpen }) {
    const [msgs, setMsgs] = useState(history) 
    const [typingUsers, setTypingUsers] = useState([])
    const user = useSelector((storeState) => storeState.userModule.user)
    const [msg, setMsg] = useState(createEmptyMsg())
    const timeout = useRef(null)

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        socketService.on(SOCKET_EVENT_ADD_TYPING, addTypingUser)
        socketService.on(SOCKET_EVENT_STOP_TYPING, removeTypingUser)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_ADD_TYPING, addTypingUser)
            socketService.off(SOCKET_EVENT_STOP_TYPING, removeTypingUser)
            if(timeout.current) clearTimeout(timeout)
        }
    }, [])

    function addMsg(newMsg) {
        setMsgs((prevMsgs) => [...prevMsgs, newMsg])
    }

    function addTypingUser(name) {
        setTypingUsers((prevTypingUsers) => [...prevTypingUsers, name])
    }

    function removeTypingUser(name) {
        setTypingUsers((prevTypingUsers) => prevTypingUsers.filter(typingUser => typingUser !== name))
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setMsg(prevMsg => ({ ...prevMsg, [field]: value }))

        if(!timeout.current) socketService.emit(SOCKET_EMIT_ADD_TYPING, user.fullname)
        if(timeout.current) clearTimeout(timeout)
        timeout.current = setTimeout(() => {
            socketService.emit(SOCKET_EMIT_STOP_TYPING, user.fullname)
            timeout.current = null
        }, 2000);
    } 

    function createEmptyMsg() {
        return {
            txt: '',
            user
        }
    }

    function onSubmit(ev) {
        ev.preventDefault()
        socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
        socketService.emit(SOCKET_EMIT_STOP_TYPING, user.fullname)
        clearTimeout(timeout.current)
        timeout.current = null
        addMsg(msg)
        setMsg(createEmptyMsg())
    }

    return (
        <section className="toy-chat">
            <span onClick={() => setIsChatOpen(false)}>X</span>
            <ul className="clean-list">
            {
                msgs.map((msg, idx) => {
                    return (
                        <li key={idx}>
                            <div>{msg.user.fullname}</div>
                            <div>{msg.txt}</div>
                        </li>
                    )
                })
            }
            </ul>
            <form onSubmit={onSubmit}>
                <input
                type="text"
                name="txt"
                value={msg.txt}
                placeholder="message"
                onChange={handleChange}
                />
                <button>save</button>
            </form>
            {typingUsers.length !== 0 && <div>{`${typingUsers[typingUsers.length - 1]} typing...`}</div> } 
        </section>
    )
}