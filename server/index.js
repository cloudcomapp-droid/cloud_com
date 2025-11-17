// server (Node/Express): npx nodemon index.js
// client (vite): npm run dev

import express from "express"; // express server
import cors from "cors"; // cross-origin resource sharing
import session from "express-session"; // session middleware
import pool from "./db.js"; // db connection
import { getCampaigns } from "./data_fetching/campaigns.js"; // fetch campaigns from GAds
import { getCustomerName } from "./data_fetching/customerName.js"; // fetch customer name from GAds
import { getAssetGroups } from "./data_fetching/asset_groups.js"; // fetch asset groups from GAds
import { getClientCustomLabels } from "./data_fetching/custom_labels.js"; // fetch custom labels from GAds
import { getShoppingProducts } from "./data_fetching/get_all_products_campaign.js"; // fetch shopping products from GAds
import { getListingGroupProductIds } from "./data_fetching/get_products_asset_group.js"; // fetch product IDs from asset group
import { getProductsCampaignLabels } from "./data_fetching/get_products_label_campaign.js"; // fetch products by custom label
import { fileURLToPath } from "url";
import path from "path";

const app = express();

// MIDDLEWARE //
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5000",
      "https://34.28.14.149:5000",
      "https://34.9.42.12:5000",
    ], // frontend origin
    credentials: true, // allow cookies / sessions
  })
);

app.use(express.json());

// simple session store (for dev)
app.use(
  session({
    secret: "dev-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// ROUTES //
// create a todo
app.post("/create_todo", async (req, res) => {
  try {
    // recover description from request body
    const { description } = req.body;

    // insert todo into db
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *;",
      [description]
    );

    // send back the new todo as json
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/get_all_todos", async (req, res) => {
  try {
    // query db for all todos
    const allTodos = await pool.query("SELECT * FROM todo;");

    // send back all todos as json
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get some todos
app.get("/get_some_todos", async (req, res) => {
  try {
    const { target } = req.body;

    const tarTodos = await pool.query(
      "SELECT * FROM todo WHERE description LIKE $1;",
      [`%${target}%`]
    );

    res.json(tarTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/update_todo/:id", async (req, res) => {
  try {
    // recover id from request params
    const { id } = req.params;

    // recover description from request body
    const { description } = req.body;

    // update todo matching the id
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *;",
      [description, id]
    );

    // send back the updated todo as json
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/delete_todo/:id", async (req, res) => {
  try {
    // recover id from request params
    const { id } = req.params;

    // delete todo matching the id
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *;",
      [id]
    );

    // send back the deleted todo as json
    res.json(deletedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

function sayHello(hey) {
  console.log("Hello");
}

function sayGoodbye(app) {
  console.log("Goodbye");
}

// Don't call anything automatically
export { sayHello, sayGoodbye };

// ############################################################
// Google Ads and Merchant Center data fetching with
// server-side caching per session for page reloads
// ############################################################
// placeholder data (your tableData)
const googleData = [
  {
    campId: 17652420937,
    campName: "Super Campaign",
    prodId: 55384,
    prodShort: "KYOCERA ECOSYS M8...",
    impress: 4635,
    clicks: 31,
    ctr: "1%",
    convs: 1,
    value: "$2,747",
    costs: "$44",
    roas: 62,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17633,
    prodShort: "OKI 45862815 (OKI...",
    impress: 1934,
    clicks: 4,
    ctr: "0%",
    convs: 1,
    value: "$589",
    costs: "$10",
    roas: 58,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 55425,
    prodShort: "KYOCERA ECOSYS P5...",
    impress: 2319,
    clicks: 5,
    ctr: "0%",
    convs: 1,
    value: "$505",
    costs: "$12",
    roas: 42,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 55386,
    prodShort: "KYOCERA ECOSYS M8...",
    impress: 7666,
    clicks: 61,
    ctr: "1%",
    convs: 1,
    value: "$3,177",
    costs: "$86",
    roas: 37,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 52159,
    prodShort: "OKI 47095704 (OKI...",
    impress: 509,
    clicks: 3,
    ctr: "1%",
    convs: 1,
    value: "$633",
    costs: "$19",
    roas: 34,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 53820,
    prodShort: "OKI MC883dnv",
    impress: 20267,
    clicks: 76,
    ctr: "0%",
    convs: 4,
    value: "$6,116",
    costs: "$208",
    roas: 29,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17527,
    prodShort: "OKI 44844408 (OKI...",
    impress: 3148,
    clicks: 2,
    ctr: "0%",
    convs: 0,
    value: "$6",
    costs: "$0",
    roas: 28,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17564,
    prodShort: "OKI 45103716 (OKI...",
    impress: 129067,
    clicks: 174,
    ctr: "0%",
    convs: 1,
    value: "$498",
    costs: "$26",
    roas: 19,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 27090,
    prodShort: "Brother TN-421M",
    impress: 1112,
    clicks: 3,
    ctr: "0%",
    convs: 1,
    value: "$248",
    costs: "$14",
    roas: 18,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17628,
    prodShort: "OKI MC853dnct",
    impress: 31705,
    clicks: 177,
    ctr: "1%",
    convs: 4,
    value: "$5,101",
    costs: "$324",
    roas: 16,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17638,
    prodShort: "OKI 45862839 (OKI...",
    impress: 6094,
    clicks: 6,
    ctr: "0%",
    convs: 1,
    value: "$442",
    costs: "$33",
    roas: 13,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 52172,
    prodShort: "OKI 47074503 (OKI...",
    impress: 971,
    clicks: 3,
    ctr: "0%",
    convs: 1,
    value: "$88",
    costs: "$7",
    roas: 12,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17646,
    prodShort: "Brother BU-320CL",
    impress: 1952,
    clicks: 4,
    ctr: "0%",
    convs: 1,
    value: "$102",
    costs: "$13",
    roas: 8,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 53819,
    prodShort: "OKI MC883dnct",
    impress: 18529,
    clicks: 115,
    ctr: "1%",
    convs: 2,
    value: "$1,726",
    costs: "$248",
    roas: 7,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17540,
    prodShort: "OKI 44846204 (OKI...",
    impress: 19792,
    clicks: 56,
    ctr: "0%",
    convs: 1,
    value: "$1,520",
    costs: "$220",
    roas: 7,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 55378,
    prodShort: "KYOCERA ECOSYS M8...",
    impress: 30144,
    clicks: 251,
    ctr: "1%",
    convs: 1,
    value: "$1,704",
    costs: "$294",
    roas: 6,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 27092,
    prodShort: "Brother TN-423BK",
    impress: 1742,
    clicks: 10,
    ctr: "1%",
    convs: 1,
    value: "$122",
    costs: "$26",
    roas: 5,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 26894,
    prodShort: "Brother DCP-L8410CDW",
    impress: 23656,
    clicks: 100,
    ctr: "0%",
    convs: 2,
    value: "$994",
    costs: "$251",
    roas: 4,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 56481,
    prodShort: "KYOCERA ECOSYS MA...",
    impress: 25095,
    clicks: 130,
    ctr: "1%",
    convs: 1,
    value: "$380",
    costs: "$104",
    roas: 4,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 26895,
    prodShort: "Brother MFC-L8690CDW",
    impress: 38806,
    clicks: 133,
    ctr: "0%",
    convs: 1,
    value: "$576",
    costs: "$176",
    roas: 3,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 57696,
    prodShort: "Kyocera Toner TK-...",
    impress: 559,
    clicks: 4,
    ctr: "1%",
    convs: 1,
    value: "$92",
    costs: "$29",
    roas: 3,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17553,
    prodShort: "OKI 44968301 (OKI...",
    impress: 155263,
    clicks: 136,
    ctr: "0%",
    convs: 1,
    value: "$359",
    costs: "$124",
    roas: 3,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17602,
    prodShort: "OKI 45531503 (OKI...",
    impress: 1082,
    clicks: 9,
    ctr: "1%",
    convs: 1,
    value: "$39",
    costs: "$13",
    roas: 3,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 55359,
    prodShort: "OKI 09006130 (OKI...",
    impress: 49363,
    clicks: 34,
    ctr: "0%",
    convs: 1,
    value: "$176",
    costs: "$64",
    roas: 3,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 27096,
    prodShort: "Brother BU-330CL",
    impress: 2949,
    clicks: 6,
    ctr: "0%",
    convs: 0,
    value: "$63",
    costs: "$24",
    roas: 3,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17745,
    prodShort: "Brother TN-2220",
    impress: 2181,
    clicks: 10,
    ctr: "0%",
    convs: 1,
    value: "$76",
    costs: "$40",
    roas: 2,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17531,
    prodShort: "OKI 44844472 (OKI...",
    impress: 4853,
    clicks: 22,
    ctr: "0%",
    convs: 2,
    value: "$304",
    costs: "$193",
    roas: 2,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 55002,
    prodShort: "Brother TN-243CMYK",
    impress: 34164,
    clicks: 111,
    ctr: "0%",
    convs: 4,
    value: "$908",
    costs: "$736",
    roas: 1,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 27097,
    prodShort: "Brother DR-421CL",
    impress: 11591,
    clicks: 29,
    ctr: "0%",
    convs: 0,
    value: "$63",
    costs: "$56",
    roas: 1,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17618,
    prodShort: "OKI B432dn",
    impress: 25925,
    clicks: 180,
    ctr: "1%",
    convs: 2,
    value: "$186",
    costs: "$164",
    roas: 1,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17486,
    prodShort: "OKI 44315106 (OKI...",
    impress: 5199,
    clicks: 8,
    ctr: "0%",
    convs: 0,
    value: "$3",
    costs: "$4",
    roas: 1,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 25348,
    prodShort: "OKI 46394902 (OKI...",
    impress: 5126,
    clicks: 40,
    ctr: "1%",
    convs: 1,
    value: "$97",
    costs: "$134",
    roas: 1,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 25350,
    prodShort: "OKI 46358502 (OKI...",
    impress: 14879,
    clicks: 47,
    ctr: "0%",
    convs: 1,
    value: "$63",
    costs: "$118",
    roas: 1,
  },
  {
    campId: 17652420937,
    campName: "PMax: 7.00 Smart Shopping",
    prodId: 17743,
    prodShort: "Brother TN-2010",
    impress: 19842,
    clicks: 229,
    ctr: "1%",
    convs: 2,
    value: "$158",
    costs: "$297",
    roas: 1,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 52166,
    prodShort: "OKI 46861306 (OKI...",
    impress: 5554,
    clicks: 3,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 58164,
    prodShort: "Kyocera Toner TK-...",
    impress: 161,
    clicks: 1,
    ctr: "1%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 17528,
    prodShort: "OKI 44844469 (OKI...",
    impress: 4954,
    clicks: 3,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 55008,
    prodShort: "Brother WT-223CL",
    impress: 1588,
    clicks: 2,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$6",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 60491,
    prodShort: "Kyocera Toner TK-...",
    impress: 7,
    clicks: 1,
    ctr: "14%",
    convs: 0,
    value: "$0",
    costs: "$1",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 55361,
    prodShort: "OKI 09006129 (OKI...",
    impress: 11087,
    clicks: 6,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 27095,
    prodShort: "Brother TN-423Y",
    impress: 4057,
    clicks: 4,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 27157,
    prodShort: "Brother TN-910C",
    impress: 343,
    clicks: 2,
    ctr: "1%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 52163,
    prodShort: "OKI 46861308 (OKI...",
    impress: 10189,
    clicks: 7,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$1",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 58616,
    prodShort: "Brother MFC-L3740CDW",
    impress: 4660,
    clicks: 20,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$39",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 58635,
    prodShort: "Brother TN-248XLC",
    impress: 1001,
    clicks: 3,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 27156,
    prodShort: "Brother TN-910BK",
    impress: 2096,
    clicks: 3,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$3",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 55351,
    prodShort: "OKI C650dn",
    impress: 716,
    clicks: 4,
    ctr: "1%",
    convs: 0,
    value: "$0",
    costs: "$4",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 54995,
    prodShort: "Brother TN-243BK",
    impress: 551,
    clicks: 2,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$10",
    roas: 0,
  },
  {
    campId: 22183673883,
    campName: "02.25 | Alle Produkte - Ohne Toner & Zubehör",
    prodId: 27160,
    prodShort: "Brother TN-426BK",
    impress: 550,
    clicks: 1,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22193950459,
    campName: "02.25 | Übrige Produkte",
    prodId: 60491,
    prodShort: "Kyocera Toner TK-...",
    impress: 47,
    clicks: 1,
    ctr: "2%",
    convs: 0,
    value: "$0",
    costs: "$2",
    roas: 0,
  },
  {
    campId: 22193950459,
    campName: "02.25 | Übrige Produkte",
    prodId: 25391,
    prodShort: "OKI 46438004 (OKI...",
    impress: 136,
    clicks: 0,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22193950459,
    campName: "02.25 | Übrige Produkte",
    prodId: 17348,
    prodShort: "OKI 42869403 (OKI...",
    impress: 776,
    clicks: 8,
    ctr: "1%",
    convs: 0,
    value: "$0",
    costs: "$3",
    roas: 0,
  },
  {
    campId: 22193950459,
    campName: "02.25 | Übrige Produkte",
    prodId: 17581,
    prodShort: "OKI 45396202 (OKI...",
    impress: 1480,
    clicks: 1,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$0",
    roas: 0,
  },
  {
    campId: 22193950459,
    campName: "02.25 | Übrige Produkte",
    prodId: 55361,
    prodShort: "OKI 09006129 (OKI...",
    impress: 157,
    clicks: 1,
    ctr: "1%",
    convs: 0,
    value: "$0",
    costs: "$2",
    roas: 0,
  },
  {
    campId: 22193950459,
    campName: "02.25 | Übrige Produkte",
    prodId: 55493,
    prodShort: "Kyocera Toner TK-...",
    impress: 22526,
    clicks: 19,
    ctr: "0%",
    convs: 0,
    value: "$0",
    costs: "$1",
    roas: 0,
  },
];

// endpoint to get google data with caching
app.get("/google-data", async (req, res) => {
  // console.log("===========================");
  // console.log("hitting /google-data endpoint");
  const forceFetch = req.query.fetch === "1";

  // console.log("--------------------------");
  // console.log("cachedData_ggl undef?:", req.session.cachedData_ggl == undefined);
  // console.log("forceFetch:", forceFetch);

  let method;
  let respData;
  if (!req.session.cachedData_ggl || forceFetch) {
    // console.log("fetching new data...");
    method = "fetched";
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // make a shallow copy so we don't mutate the original
    // respData = [...googleData];
    respData = googleData.slice();
    if (respData.length > 0) respData[0].campName = "fetchedCamp";
    req.session.cachedData_ggl = googleData;
  } else {
    // console.log("caching data...");
    method = "cached";
    // respData = [...req.session.cachedData_ggl];
    respData = req.session.cachedData_ggl;
    if (respData.length > 0) respData[0].campName = "cachedCamp";
  }

  // console.log(respData);
  // console.log("===========================");
  return res.json({ method, data: respData || [] });
});

app.get("/google-campaigns", async (req, res) => {
  console.log("===========================");
  console.log("hitting /google-campaigns endpoint");
  const forceFetch = req.query.fetch === "1";

  let method;
  let respData;

  if (!req.session.cache_adsCampaigns || forceFetch) {
    console.log("fetching new data...");
    method = "fetched";

    // fetch campaigns from Google Ads
    const campaigns = await getCampaigns();

    // map to simple array with id + name (optional)
    respData = campaigns.map((c) => ({
      id: c.id,
      name: c.name,
    }));

    // cache in session
    req.session.cache_adsCampaigns = respData.slice();

    // marcar el primero como "fetched" solo si querés
    if (respData.length > 0) respData[0].name += " fetched";
  } else {
    console.log("using cached data...");
    method = "cached";
    respData = req.session.cache_adsCampaigns.slice();
    if (respData.length > 0) respData[0].name += " cached";
  }

  console.log("===========================");
  return res.json({ method, data: respData || [] });
});

// // ############################################################

app.get("/google-customer-name", async (req, res) => {
  console.log("===========================");
  console.log("hitting /google-customer-name endpoint");

  const clientId = req.query.clientId || "4693401961"; // default si no se pasa por query
  const forceFetch = req.query.fetch === "1";

  let method;
  let respData;

  try {
    if (!req.session.cache_customerName || forceFetch) {
      console.log("fetching new data...");
      method = "fetched";

      const clientName = await getCustomerName(clientId);
      respData = clientName || "Unknown";

      // guardamos en sesión
      req.session.cache_customerName = respData;
    } else {
      console.log("caching data...");
      method = "cached";
      respData = req.session.cache_customerName;
    }

    console.log(`Client Name: ${respData}`);
    console.log("===========================");
    return res.json({ method, data: respData });
  } catch (error) {
    console.error("Error fetching customer name:", error.message);
    console.log("===========================");
    return res.status(500).json({ error: error.message });
  }
});

app.get("/google-asset-groups", async (req, res) => {
  console.log("===========================");
  console.log("hitting /google-asset-groups endpoint");

  const clientId = req.query.clientId || "4693401961";
  const campaignId = req.query.campaignId || "17662012260";
  const startDate = req.query.startDate || "2025-01-01";
  const endDate = req.query.endDate || "2025-07-31";
  const forceFetch = req.query.fetch === "1";

  let method;
  let respData;

  try {
    if (!req.session.cache_assetGroups || forceFetch) {
      method = "fetched";
      // Llama al servicio de Google Ads
      const assetGroups = await getAssetGroups(
        clientId,
        campaignId,
      );

      // Aseguramos que devuelva tanto id como name
      respData = assetGroups.map((g) => ({
        id: g.id,
        name: g.name,
        campaign: g.campaign,
      }));

      // Cacheamos la lista completa (id + name)
      req.session.cache_assetGroups = respData.slice();
    } else {
      console.log("caching asset groups...");
      method = "cached";
      respData = req.session.cache_assetGroups.slice();
    }

    return res.json({ method, data: respData });
  } catch (error) {
    console.error("Error fetching asset groups:", error.message);
    console.log("===========================");
    return res.status(500).json({ error: error.message });
  }
});

app.get("/google-custom-labels", async (req, res) => {
  console.log("===========================");
  console.log("hitting /google-custom-labels endpoint");

  const clientId = req.query.clientId || "4693401961";
  const forceFetch = req.query.fetch === "1";

  let method;
  let respData;

  try {
    if (!req.session.cache_customLabels || forceFetch) {
      method = "fetched";
      const labels = await getClientCustomLabels(clientId);
      respData = labels;
      req.session.cache_customLabels = respData.slice();
    } else {
      console.log("using cached custom labels...");
      method = "cached";
      respData = req.session.cache_customLabels.slice();
    }

    return res.json({ method, data: respData });
  } catch (err) {
    console.error("Error fetching custom labels:", err.message);
    return res.status(500).json({ error: "Failed to fetch custom labels" });
  }
});

app.get("/google-shopping-products", async (req, res) => {
  console.log("===========================");
  console.log("hitting /google-shopping-products endpoint");

  const clientId = req.query.clientId || "4693401961";
  const campaignId = req.query.campaignId || "17662012260";
  const startDate = req.query.startDate || "2025-01-01";
  const endDate = req.query.endDate || "2025-07-31";
  const forceFetch = req.query.fetch === "1";

  let method;
  let respData;

  try {
    if (!req.session.cache_shoppingProducts || forceFetch) {
      method = "fetched";
      const products = await getShoppingProducts(
        clientId,
        campaignId,
        startDate,
        endDate
      );
      respData = products;
      req.session.cache_shoppingProducts = respData.slice();
    } else {
      console.log("using cached shopping products...");
      method = "cached";
      respData = req.session.cache_shoppingProducts.slice();
    }

    return res.json({ method, data: respData });
  } catch (error) {
    console.error("Error fetching shopping products:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/google-listing-group-products", async (req, res) => {
  console.log("===========================");
  console.log("hitting /google-listing-group-products endpoint");

  const clientId = req.query.clientId || "4693401961";
  const assetGroupId = req.query.assetGroupId;
  const forceFetch = req.query.fetch === "1";

  if (!assetGroupId) {
    return res.status(400).json({ error: "assetGroupId is required" });
  }

  let method;
  let respData;

  try {
    if (!req.session.cache_listingGroupProducts || forceFetch) {
      method = "fetched";

      const productIds = await getListingGroupProductIds(
        clientId,
        assetGroupId
      );

      respData = productIds;
      req.session.cache_listingGroupProducts = respData.slice();
    } else {
      console.log("using cached listing group products...");
      method = "cached";
      respData = req.session.cache_listingGroupProducts.slice();
    }

    return res.json({ method, data: respData });
  } catch (error) {
    console.error("Error fetching listing group products:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/google-products-campaign-labels", async (req, res) => {
  console.log("===========================");
  console.log("hitting /google-products-campaign-labels endpoint");

  const clientId = req.query.clientId || "4693401961";
  const campID = req.query.campID;
  const indexToFetch = req.query.indexToFetch;
  const selCustLbl = req.query.selCustLbl;
  const forceFetch = req.query.fetch === "1";

  // Validate required params
  if (!campID) {
    return res.status(400).json({ error: "campID is required" });
  }
  if (indexToFetch === undefined) {
    return res.status(400).json({ error: "indexToFetch is required" });
  }
  if (!selCustLbl) {
    return res.status(400).json({ error: "selCustLbl is required" });
  }

  let method;
  let respData;

  try {
    if (!req.session.cache_productsCampaignLabels || forceFetch) {
      method = "fetched";

      const data = await getProductsCampaignLabels(
        clientId,
        campID,
        Number(indexToFetch),
        selCustLbl
      );

      respData = data;
      req.session.cache_productsCampaignLabels = JSON.parse(
        JSON.stringify(respData)
      );
    } else {
      console.log("using cached products-campaign-labels...");
      method = "cached";
      respData = JSON.parse(
        JSON.stringify(req.session.cache_productsCampaignLabels)
      );
    }

    return res.json({ method, data: respData });
  } catch (error) {
    console.error(
      "Error fetching products-campaign-labels:",
      error.message
    );
    return res.status(500).json({ error: error.message });
  }
});


// --------------------------------------------
app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on http://localhost:${process.env.PORT || 5000}`);
});
