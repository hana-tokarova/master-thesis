import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { CollectionType, JewelryType } from "./components/Collections";
import { Configurator } from "./components/Configurator";
import { App } from "./pages/App";
import NotFound from "./pages/NotFound";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "create",
                element: (
                    <Configurator
                        collection={CollectionType.Lissajous}
                        jewelry={JewelryType.Ring}
                    />
                ),
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
