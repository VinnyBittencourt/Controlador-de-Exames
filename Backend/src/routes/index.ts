import { Router } from "express";

import usuariosRouter from "./usuarios.routes";
import sessionsRouters from "./sessions.routes";
// import agendamentosRouter from "./agendamentos.routes";
import funcionariosRouter from "./funcionarios.routes";
import razaoExameRouter from "./razaoexame.routes";

const routes = Router();

routes.use("/usuarios", usuariosRouter);
routes.use("/sessions", sessionsRouters);
routes.use("/funcionarios", funcionariosRouter);
routes.use("/razaoexame", razaoExameRouter);

export default routes;
