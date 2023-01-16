import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG } from "../services/socket.service";
import { toyService } from "../services/toy.service";

export function ToyChat({ currToy }) {
    const [toy, setToy] = useState(currToy)
    const [isTyping, setIsTyping] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)
    const [msg, setMsg] = useState(createEmptyMsg())

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toy._id)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    function addMsg(newMsg) {
        setToy(prevToy => {
            prevToy.msgs.push(newMsg)
            return {...prevToy}
        })
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setMsg(prevMsg => ({ ...prevMsg, [field]: value }))
    } 

    function createEmptyMsg() {
        return {
            txt: '',
            user
        }
    }

    function onSubmit(ev) {
        ev.preventDefault()
        toyService.addMsg(toy._id, msg)
        socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
        addMsg(msg)
        setMsg(createEmptyMsg())
    }

    return (
        <section className="toy-chat">
            <ul className="clean-list">
            {
                toy.msgs.map((msg, idx) => {
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
            {isTyping && <div>typing</div>}
        </section>
    )
}