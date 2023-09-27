
// import cors from "cors";
// import dotenv from "dotenv";

// import userRouter from '../routes/userRoutes'
// import router from "./swagger.config.const.js"
// import bookRouter from "../routes/bookRoutes.js"
// import authorRouter from "../routes/authorRoutes.js"
// import customerRouter from "../routes/customerRoutes.js"
// import orderRouter from "../routes/orderRoutes.js"
// import orderitemRouter from "../routes/orderitemRoutes.js"
// import authorbookRouter from "../routes/authorbookRoutes.js"
// import Utils from "../utils/decodeToken"
// import authMiddleware from "../middlware/auth"

// // const cors = require('cors');

// import express, { Application } from "express";
// import helmet from "helmet";


// const ExpressConfig = (): Application => {
//     dotenv.config();
//     const app = express();
//     app.use(helmet());
//     app.use(cors({ origin: "*", allowedHeaders: "*" }));
//     app.use(express.json());

//     app.use('/api-docs/', router);
//     app.use('/', userRouter);
//     app.use('/books/', Utils.authenticateJWT, authMiddleware.authenticateUser, bookRouter);
//     app.use('/authors/', Utils.authenticateJWT, authMiddleware.authenticateUser, authorRouter);
//     app.use('/customers/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, customerRouter);
//     app.use('/orders/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, orderRouter);
//     app.use('/orderitems/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, orderitemRouter);
//     app.use('/authorbooks/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, authorbookRouter);


//     return app;
// };
// export default ExpressConfig;

import express, { Application } from "express";
import swaggerRouter from "./swagger.config.const.js";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

const ExpressConfig = (): Application => {
    dotenv.config();
    const app = express();
    app.use(helmet());
    app.use(cors({ origin: "*", allowedHeaders: "*" }));
    app.use(express.json());


    app.use("/api-docs", swaggerRouter);

    return app;
};
export default ExpressConfig;

