import express from "express";
import cors from 'cors'
import knex from "../knexfile.js";
import { attachPaginate } from 'knex-paginate'

const app = express();
app.use(cors())
attachPaginate()

app.get("/pokemon", async (req, res) => {
  try {
    const { page } = req.query
    const pokemon = await knex("pokemon").select().paginate({currentPage: page, isLengthAware: true,});
    res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).json({ message: `Can't list pokemons: ${error}` });
  }
});

export { app };
