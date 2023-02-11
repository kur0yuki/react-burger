import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "../App/App";

export default function CustomRouter(){
    return (
          <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
          </BrowserRouter>
    )
}
