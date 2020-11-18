import { Router } from "express";
import { getRepository } from "typeorm";

import TipoExameController from "../app/controllers/TipoExameController";
import RazaoExames from "../app/models/RazaoExame";
import ensureAthen from "../middlewares/ensureAuthenticated";

const tipoRouter = Router();

tipoRouter.post("/", ensureAthen, async (req, res) => {
    try {
        const { nome, validade } = req.body;
        const tipoController = new TipoExameController();
        const Razao = await tipoController.store({
            nome,
            validade,
        });

        return res.status(200).json(Razao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

tipoRouter.get("/", ensureAthen, async (req, res) => {
    const razaoRepo = getRepository(RazaoExames);
    const Razoes = await razaoRepo.find();
    console.log(req.user);

    return res.status(200).json(Razoes);
});

tipoRouter.put("/:id", ensureAthen, async (req, res) => {
    const { razao } = req.body;
    const razaoRepo = getRepository(RazaoExames);
    const { id } = req.params;
    const raz = await razaoRepo.findOne(id);

    const Razao = razaoRepo.create({
        razao,
    });
    const respo = await razaoRepo.save({ ...raz, ...Razao });

    return res.status(200).json(respo);
});

tipoRouter.delete("/:id", ensureAthen, async (req, res) => {
    const razaoRepo = getRepository(RazaoExames);
    const { id } = req.params;
    await razaoRepo.delete(id);
    return res.status(200).send();
});

export default tipoRouter;
