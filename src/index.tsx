import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { WebsiteLayout } from "./components/layout/WebsiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { ConfiguratorPage } from "./pages/ConfiguratorPage";
import { CreatePage } from "./pages/CreatePage";
import { HomePage } from "./pages/HomePage";
import { LookbookPage } from "./pages/LookbookPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const router = createHashRouter([
    {
        path: "/",
        element: <WebsiteLayout />,
        children: [
            {
                index: true,
                element: (
                    <HomePage />
                ),
            },
            {
                path: "create",
                element: (
                    <CreatePage />
                ),
            },
            {
                path: "configurator",
                element: (
                    <ConfiguratorPage />
                ),
            },
            {
                path: "about",
                element: (
                    <AboutPage />
                ),
            },
            {
                path: "showcase",
                element: (
                    <LookbookPage />
                ),
            },
            {
                path: "*",
                element: <NotFoundPage />,
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
