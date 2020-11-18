import { Router } from "express";

import usuariosRouter from "./usuarios.routes";
import sessionsRouters from "./sessions.routes";
// import agendamentosRouter from "./agendamentos.routes";
import funcionariosRouter from "./funcionarios.routes";
import razaoExameRouter from "./razaoexame.routes";
import tipoExameRouter from "./tipoexame.routes";

const routes = Router();

routes.use("/usuarios", usuariosRouter);
routes.use("/sessions", sessionsRouters);
routes.use("/funcionarios", funcionariosRouter);
routes.use("/razaoexame", razaoExameRouter);
routes.use("/tipoexame", tipoExameRouter);

export default routes;
