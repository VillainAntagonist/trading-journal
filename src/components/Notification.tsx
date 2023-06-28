import {FC, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootState} from "../store";
import {useAction} from "../hooks/useAction";

const Notification: FC = () => {
    const {message, type} = useSelector((state: RootState) => state.notification);

    const {displayToast} = useAction()

    useEffect(() => {
        if (message) {
            toast[type](message, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,


            });
            displayToast({message: '', type: 'success'})
        }
    }, [message, type]);
        return null
};

export default Notification;
