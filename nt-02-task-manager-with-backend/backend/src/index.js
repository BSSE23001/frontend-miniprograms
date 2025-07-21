import express from 'express'
import routesTasks from '../routes/routeTasks.js'
import cors from 'cors'

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/tasks', routesTasks);

app.use('/', (req, res) => {
    res.status(200).send(`
        <h1>Go to /api/tasks to see some functionality</h1>
        `)
})

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));