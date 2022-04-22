import express from "express";
import knex from "../knexfile.js";
import { attachPaginate } from 'knex-paginate'
const app = express();
attachPaginate()

app.get("/", async (req, res) => {
  try {
    const pokemon = await knex("pokemon").select().paginate({});
    res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).json({ message: `Can't list pokemons: ${error}` });
  }
});

export { app };
