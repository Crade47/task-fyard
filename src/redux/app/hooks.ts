import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";


type DispatchFunc = () => AppDispatch;
//Default Dispatch does not know about Thunk or other middlewares, using AppDispatch type to fix that.
export const useAppDispatch: DispatchFunc = useDispatch
//Saves the need to type (state: RootState) in every useSelector use
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector