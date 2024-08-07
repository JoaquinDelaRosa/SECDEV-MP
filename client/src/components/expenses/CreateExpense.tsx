import { useState } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestExpense } from './RequestExpense';

export const CreateExpense = (props : {observer : Function}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addExpense).post(data)
        .then((response) => {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <div>
            <ModalWrapper front={"Create Expense"} isVisible={isVisible} setIsVisible={setIsVisible}>
                <RequestExpense setResponse={setData}/>
            </ModalWrapper> 
        </div>
        
    );
}