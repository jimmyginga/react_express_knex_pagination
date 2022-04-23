import styled  from 'styled-components';
import ReactPaginate from 'react-paginate';

export const Container = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  position: fixed;
  bottom: 0;
  left: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyPaginate = styled(ReactPaginate).attrs({
    // You can redifine classes here, if you want.
    activeClassName: 'active', // default to "disabled"
  })`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0 5rem;
    li a {
      border-radius: 3px;
      margin: 10px;
      padding: 0.1rem 0.5rem;
      border: gray 1px solid;
      cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: #999;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;