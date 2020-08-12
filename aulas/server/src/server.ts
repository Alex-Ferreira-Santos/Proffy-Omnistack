import express from 'express';
import routes from './routes';
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json());

//GET: Buscar ou listar uma informação
//POST: Criar alguma nova informação
//PUT: Atualizar uma informação existente
//DELETE: Deletar uma informação existente

//Corpo (Request Body): Dados para criação ou atualização de um registo
//Route Params: Identificar qual recurso eu quero atualizar ou deletar
//Query Params: Paginação, filtros, ordenação

app.use(routes);
//localhost:3333
app.listen(3333);
