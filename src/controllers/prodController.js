import { prodsService } from '../services/prodService.js'

async function getProducts(req, res) {
    try {
        //const id = req.params.id ? Number(req.params.id) : null;
        const response = await prodsService.getProducts(req.params.id);
        res.status(200).json(response)
    } catch (e) {
        console.log(e);
        res.status(404).send('The product with Id: ' + req.params.id + ' does not exists')
    }
}

async function addProduct(req, res) {
    const response = await prodsService.addProduct(req.body);
    res.status(201).json(response)
}

async function modProduct(req, res) {
    try {
        //const id = req.params.id ? Number(req.params.id) : null;
        const response = await prodsService.modifProd(req.params.id, req.body);
        res.status(200).json(response)
    } catch (e) {
        console.log(e);
        res.status(404).send('The product with Id: ' + req.params.id + ' does not exists')
    }
}

async function delProduct(req, res) {
    try {
        //const id = req.params.id ? Number(req.params.id) : null;
        await prodsService.delProd(req.params.id);
        res.status(201).send('The product with Id: ' + req.params.id + ' was deleted successfully')
    } catch (e) {
        console.log(e);
        res.status(404).send('The product with Id: ' + req.params.id + ' does not exists')
    }
}

export const prodsController = {
    getProducts,
    addProduct,
    modProduct,
    delProduct,
};