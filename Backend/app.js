import express from "express";
import { marked } from "marked";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

//* We need Fix our CORS policy to allow requests from our frontend
//* Like this

// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//     })
// );

app.use(bodyParser.json());

const PORT = 8888;

//* We can write our controller in a separate file and import it here
//* But this is a simple application so I am writing here

app.post("/convert", (req, res) => {
    const { markdown } = req.body;
    if (!markdown) return res.status(400).json({ error: "No markdown provided" });

    const html = marked(markdown);
    res.json({ html });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
