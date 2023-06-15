import React from "react";
import { configureApi } from "../helper/apiHelper";

const { retrieve, create, remove, update } = configureApi("api/v1/books/");

const BookPage = () => {
  return <div>BookPage</div>;
};

export default BookPage;
