import { Router } from "express";

import ExamesController from "../app/controllers/ExamesController";

const agendamentosRouter = Router();

agendamentosRouter.post("/", async (req, res) => {
    try {
        const {
            funcionario_id,
            razaoExame_id,
            tipoExame_id,
            data,
            vencimento,
        } = req.body;
        const examesController = new ExamesController();
        const exame = await examesController.store({
            funcionario_id,
            razaoExame_id,
            tipoExame_id,
            data,
            vencimento,
        });

        return res.status(200).json(exame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default agendamentosRouter;
