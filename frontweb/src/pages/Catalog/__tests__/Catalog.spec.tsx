import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "..";
import { Router } from "react-router-dom";
import history from 'util/history';


test("Should render catalog with products", async () => {
    const text = "Catálogo de Produtos";

    render(
        <Router history={history}>
            <Catalog />
        </Router>

    );
    
    expect(screen.getByText(text)).toBeInTheDocument();
    
    await waitFor (() => {
        expect(screen.getByText("Smart TV")).toBeInTheDocument();
    });
    
   
    
});