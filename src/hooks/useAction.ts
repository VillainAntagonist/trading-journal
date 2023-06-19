import { useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {allActionCreators} from "../store/allActionCreators";

export const useAction = () => {
    const dispatch = useDispatch<Dispatch>(); // Provide the Dispatch type to useDispatch



    return bindActionCreators(allActionCreators, dispatch);
};
