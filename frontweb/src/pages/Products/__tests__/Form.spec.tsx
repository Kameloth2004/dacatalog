import { render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import { Router, useParams } from "react-router-dom";
import history from 'util/history';
import userEvent from "@testing-library/user-event";
import { productResponse, server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from "react-toastify";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('Product form creat tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    });

    test('Should show toast and redirected when submit form correctly', async () => {

        render(
            <Router history={history}>
                <Form />
                <ToastContainer />
            </Router>

        );

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");
        const submitButton = screen.getByRole('button', { name: /salvar/i });

        await waitFor(async () => {
            await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

        })

        userEvent.type(nameInput, "Computador");
        userEvent.type(priceInput, "5000.12");
        userEvent.type(imgUrlInput, "http://google.com/images/arrow.jpg");
        userEvent.type(descriptionInput, "Computador muito bom");

        await userEvent.click(submitButton);

        await waitFor(() => {
            const toastElement = screen.getByText("Produto cadastrado com sucesso");
            expect(toastElement).toBeInTheDocument();
        })

        expect(history.location.pathname).toEqual("/admin/products");

    });

    test('Should show 5 validations messages when clicking submit', async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>

        );

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText("Campo obrigatorio");
            expect(messages).toHaveLength(5);
        });

    });

    test('Should clear validation messages when filling out the form correctly', async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>

        );

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText("Campo obrigatorio");
            expect(messages).toHaveLength(5);
        });

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");


        await waitFor(async () => {
            await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

        })

        userEvent.type(nameInput, "Computador");
        userEvent.type(priceInput, "5000.12");
        userEvent.type(imgUrlInput, "http://google.com/images/arrow.jpg");
        userEvent.type(descriptionInput, "Computador muito bom");

        await waitFor(() => {
            const messages = screen.queryAllByText("Campo obrigatorio");
            expect(messages).toHaveLength(0);
        });

    });

})

describe('Product form editing tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: '2'
        })
    });

    test('Should show toast and redirected when submit form correctly', async () => {

        render(
            <Router history={history}>
                <Form />
                <ToastContainer />
            </Router>

        );


        await waitFor(() => {
            const nameInput = screen.getByTestId("name");
            const priceInput = screen.getByTestId("price");
            const imgUrlInput = screen.getByTestId("imgUrl");
            const descriptionInput = screen.getByTestId("description");

            const formElement = screen.getByTestId("form");
           
            expect(nameInput).toHaveValue(productResponse.name);
            expect(priceInput).toHaveValue(String(productResponse.price));
            expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
            expect(descriptionInput).toHaveValue(productResponse.description);

            const ids = productResponse.categories.map(x => String(x.id));
            expect(formElement).toHaveFormValues({categories: ids});
        })
        

        const submitButton = screen.getByRole('button', { name: /salvar/i });

       userEvent.click(submitButton);

        await waitFor(() => {
            const toastElement = screen.getByText("Produto cadastrado com sucesso");
            expect(toastElement).toBeInTheDocument();
        })

        expect(history.location.pathname).toEqual("/admin/products");

    });

});