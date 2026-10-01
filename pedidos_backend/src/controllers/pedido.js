const pedidos = require("../../dados/pedidos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 //autoIncrement
    pedidos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    res.json(pedidos)
}

const alterar = (req, res) => {
    const id = req.params.id
    const dados = req.body
    const chaves = Object.keys(dados)
    const pedido = pedidos.find(p => p.id == id)

    if(!pedido){
        return res.status(404).json("Id não encontrado")
    }

    chaves.forEach((chave) =>{
        pedido[chave] = dados[chave]
    })
    res.json(pedidos)
}


const excluir = (req, res) => {
    const id = req.params.id
    const indice = pedidos.findIndex(p => p.id == id)
     
    if(indice == -1){
        return res.status(404).json("Id não encontrado")
    }
    pedidos.splice(indice, 1)
    res.json("pedido excluido com sucesso")
}

module.exports = {
    criar, listar, alterar, excluir
}