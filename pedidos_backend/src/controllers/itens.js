const itens = require("../../dados/itens.json")
const produtos = require("../../dados/produtos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(itens[itens.length - 1].id) + 1
    dados.subtotal = dados.preco * dados.quantidade
    itens.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    itens.forEach((item) =>{
        item.subtotal = item.preco * item.quantidade
        item.produto = produtos.find((p) => p.id == item.produto_id)
    })
    res.json(itens)
}

const alterar = (req, res) => {
    const id = req.params.id
    const dados = req.body
    const chaves = Object.keys(dados)
    const item = itens.find((i) => i.id == id)

    if(!item){
        return res.status(404).json("Id não encontrado")
    }

    chaves.forEach((chave) => {
        item[chave] = dados[chave]
    })

    item.subtotal = item.preco * item.quantidade
    res.json(item)
}

const excluir  = (req, res) => {
    const id = req.params.id
    const indice = itens.findIndex((i) => i.id == id)

    if(indice == -1){
        return res.status(404).json("Id não encontrado")
    }

    itens.splice(indice, 1)
    res.json("Item excluído com sucesso")
}

module.exports = {
    criar, listar, alterar, excluir
}