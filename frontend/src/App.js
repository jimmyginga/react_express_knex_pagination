import React from "react";
import { api } from "./api";
import { Table } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, MyPaginate } from "./styles";

function App() {
  const [pokemons, setPokemons] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState();

  const getPokemons = async (page) => {
    await api.get(`/pokemon?page=${page}`).then((result) => {
      if (result.status !== 200) return alert("Something went wrong!");
      setTotalPages(result.data.pagination.lastPage)
      return setPokemons(result.data.data);
    });
  };
  const handleClick = (page) => {
    //need to increment one in the current page becouse knex pagination start to 0
    return setCurrentPage(page + 1)
  }
  
  React.useEffect(() => {
    getPokemons(currentPage);
    return () => {};
  }, [currentPage]);

  return (
    <>
      <div className="body">
        <div className="div-table pb-5">
          <Table striped borderless hover responsive className="mb-5">
            <thead>
              <tr>
                <th scope="row">Id</th>
                <th scope="row">identifier</th>
                <th scope="row">height</th>
                <th scope="row">Weight</th>
                <th scope="row">base_experience</th>
                <th scope="row">Order</th>
              </tr>
            </thead>
            <tbody>
              {pokemons.length === 0 ? (
                <tr className="ml-auto mr-auto">
                  <td>No pokemon</td>
                </tr>
              ) : (
                pokemons.map((pokemon) => {
                  return (
                    <tr key={pokemon.id}>
                      <td>{pokemon.id}</td>
                      <td>{pokemon.identifier}</td>
                      <td>{pokemon.height}</td>
                      <td>{pokemon.weight}</td>
                      <td>{pokemon.base_experience}</td>
                      <td>{pokemon.order}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
         <Container>
          <MyPaginate
            className="noselect"
            breakLabel="..."
            nextLabel={">>"}
            pageRangeDisplayed={5}
            onPageChange={(e) => handleClick(e.selected)}
            pageCount={Number(totalPages)}
            previousLabel={"<<"}
          />
        </Container> 
      </div>
    </>
  );
}

export default App;
