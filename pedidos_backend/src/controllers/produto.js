const produtos = require("../../dados/produtos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(produtos[produtos.length - 1].id) + 1
    produtos.push(dados)
    res.staus(201).json(dados)
}

const listar = (req, res) => {
    res.json(produtos)
}

const alterar = (req, res) => {
    const id = req.params.id
    const dados = req.body
    const chaves = Object.keys(dados)
    const produto = produtos.find((p) => p.id == id)

    if(!produto){
        return res.status(404).json("id não encontrado")
    }

    chaves.forEach((chave) => {
        produto[chave] = dados[chave]
    })
    res.json(produto)
}

const excluir  = (req, res) => {
    const id = req.paramn.id
    const indice = produtos.findIndex((p) => p.id == id)

    if(!indice == -1){
        return res.status(404).json("Id não encontrado")
    }

    produtos.splice(indice, 1)
    res.json("Produto excluido com sucesso")
}

module.exports = {
    criar, listar, alterar, excluir
}