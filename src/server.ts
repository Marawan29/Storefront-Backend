import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routesIndex';
import { port } from './database'


const app: express.Application = express();
const address: string = `localhost:${port}`;


app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});

app.listen(parseInt(port as string), function () {
    console.log(`starting app on: ${address}`)
});

export default app; 