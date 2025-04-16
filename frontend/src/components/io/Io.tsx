import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { useAppDispatch } from "../../redux/hooks";
import Like from "../../models/like/Like";
import { addLike, addVacation, removeLike, removeVacation, updateVacation } from "../../redux/vacationsSlice";
import SocketMessages from "socket-enums-vacations-shaihey"
import Vacation from "../../models/vacation/Vacation";

interface SocketContextInterface {
    xClientId: string;
}

export const SocketContext = createContext<SocketContextInterface>({
    xClientId: ''
});

function Io({ children }: PropsWithChildren): JSX.Element {

    const [ xClientId ] = useState<string>(v4())
    const value = { xClientId }

    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL);

        socket.onAny((eventName, payload) => {
            if (payload.from !== xClientId) {
                switch (eventName) {
                    case SocketMessages.NEW_LIKE:
                        // eslint-disable-next-line no-case-declarations
                        const newLikePayload = payload.data as Like
                        dispatch(addLike(newLikePayload))
                    break;
                    case SocketMessages.REMOVE_LIKE:
                        // eslint-disable-next-line no-case-declarations
                        const { vacationId, likerId } = payload.data as { vacationId: string, likerId: string }
                        dispatch(removeLike({vacationId, userId: likerId}))
                    break;
                    case SocketMessages.ADD_VACATION:
                        // eslint-disable-next-line no-case-declarations
                        const newVacation = payload.data as Vacation
                        dispatch(addVacation(newVacation))
                    break;
                    case SocketMessages.REMOVE_VACATION:
                        // eslint-disable-next-line no-case-declarations
                        const vacationRemoved = payload.data as {id: string}
                        dispatch(removeVacation(vacationRemoved))
                    break;
                    case SocketMessages.UPDATE_VACATION:
                        // eslint-disable-next-line no-case-declarations
                        const updatedVacation = payload.data as Vacation
                        dispatch(updateVacation(updatedVacation))
                    break;
                }
            }
        })

        return () => {
            socket.disconnect();
        }

    }, [])

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}

export default Io;