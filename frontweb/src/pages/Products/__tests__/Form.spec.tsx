import { render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import { Router, useParams } from "react-router-dom";
import history from 'util/history';
import userEvent from "@testing-library/user-event";
import { server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from "react-toastify";


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('Product form creat tests', () =>{

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
           const submitButton = screen.getByRole('button', {name: /salvar/i});

           await waitFor( async () => {
            await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);
            
           })        


           userEvent.type(nameInput,"Computador");
           userEvent.type(priceInput,"5000.12");
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
            
         
           const submitButton = screen.getByRole('button', {name: /salvar/i});

           userEvent.click(submitButton);

           await waitFor(() => {
            const messages = screen.getAllByText("Campo obrigatorio");
            expect(messages).toHaveLength(5);
           });

                


           
           
           
        });
   

    

})

