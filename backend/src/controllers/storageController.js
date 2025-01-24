const storageService = require('../services/storageService');

const listarEstoque = async (req, res) => {
  const { id_item } = req.query;
  console.log("Listando estoque, filtros recebidos:", req.query);

  try {
    const estoque = await storageService.listarEstoque({idItem: id_item ? parseInt(id_item) : undefined,});
    res.json(estoque);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar estoque.' });
  }
};

const buscarEstoquePorID = async (req, res) => {
  const ID = req.params.id;
  try {
    const storage = await storageService.buscarEstoquePorID(ID);
    res.json(storage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar Lote do Estoque.' });
  }
};

const adicionarEstoque = async (req, res) => {
  const dados = req.body;

  try {
    const result = await storageService.adicionarEstoque(dados);
    res.status(201).json({ message: 'Estoque adicionado com sucesso.', storageID: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar estoque.'});
  }
};


const atualizarEstoque = async (req, res) => {
  const ID = req.params.id;
  const dados = req.body;

  
  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }
    //const estoque = await storageService.listarEstoquePorId(ID);
    // if (!categoria) {
    //   return res.status(404).json({ error: 'Categoria não encontrada.' });
    // }
    const result = await storageService.atualizarEstoque(ID, dados);
    res.status(201).json({ message: 'Estoque atualizado com sucesso.'});
  } 
  catch (err)
  {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar estoque.' });
  }
};

const deletarEstoque = async (req, res) => {
  try {
    const storageId = req.params.id;

    if (!storageId || isNaN(storageId)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    const estoque = await storageService.buscarEstoquePorID(storageId);

    if (!estoque) {
      return res.status(404).json({ error: 'Estoque não encontrado.' });
    }

    await storageService.deletarEstoque(storageId);

    res.status(200).json({ message: 'Lote do Estoque deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar lote do estoque:', err.message);
    res.status(500).json({ error: 'Erro interno ao deletar estoque.' });
  }
};


const listarItensEstoque = async (req, res) => {
  console.log("listarItensEstoque foi chamada!");
  const filters = req.query;
  console.log('Filtros recebidos no listarItensEstoque:', filters);
  try {
    const itens = await storageService.listarItensEstoque(filters);
    console.log('Itens retornados:', itens); // Verifica o que foi retornado
    res.json(itens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar itens.' });
  }
};

const listarCategoriasEstoque = async (req, res) => {
  console.log("eNTREI");
  try {
    const categorias = await storageService.listarCategoriasEstoque();
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar categorias.' });
  }
};


const buscarItemEstoquePorID = async (req, res) => {
  console.log("Item buscando ID");
  const ID = req.params.id;

  try {
    const item = await storageService.buscarItemEstoquePorID(ID);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar item.' });
  }
};

const buscarCategoriaEstoquePorID = async (req, res) => {
  const ID = req.params.id;

  try {
    const categoria = await storageService.buscarCategoriaEstoquePorID(ID);
    res.json(categoria);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar categoria.' });
  }
};



const adicionarItemEstoque = async (req, res) => {
  const dados = req.body;

  try {
    const result = await storageService.adicionarItemEstoque(dados);
    res.status(201).json({ message: 'Item adicionado com sucesso.', itemID: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar item.'});
  }
};

const atualizarItemEstoque = async (req, res) => {
  const ID = req.params.id;
  const dados = req.body;

  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }
    const item = await storageService.buscarItemEstoquePorID(ID);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado.' });
    }
    const result = await storageService.atualizarItemEstoque(ID, dados);
    res.status(201).json({ message: 'Item atualizado com sucesso.'});
  } 
  catch (err)
  {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar item.' });
  }
};

const deletarItemEstoque = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!itemId || isNaN(itemId)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    const item = await storageService.buscarItemEstoquePorID(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado.' });
    }

    await storageService.deletarItemEstoque(itemId);

    res.status(200).json({ message: 'Item deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar item:', err.message);
    res.status(500).json({ error: 'Erro interno ao deletar item.' });
  }
};



const adicionarCategoriaEstoque= async (req, res) => {
  const dados = req.body;

  try {
    const result = await storageService.adicionarCategoriaEstoque(dados);
    res.status(201).json({ message: 'Categoria adicionada com sucesso.', categoryID: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar categoria.'});
  }
};

const atualizarCategoriaEstoque = async (req, res) => {
  const ID = req.params.id;
  const dados = req.body;

  
  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }
    //const categoria = await storageService.listarCategoriaPorId(ID);
    // if (!categoria) {
    //   return res.status(404).json({ error: 'Categoria não encontrada.' });
    // }
    const result = await storageService.atualizarCategoriaEstoque(ID, dados);
    res.status(201).json({ message: 'Categoria atualizada com sucesso.'});
  } 
  catch (err)
  {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar categoria.' });
  }
};

const deletarCategoriaEstoque = async (req, res) => {
  try {
    const categoriaId = req.params.id;

    if (!categoriaId || isNaN(categoriaId)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    const categoria = await storageService.buscarCategoriaEstoquePorID(categoriaId);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    const itens = await storageService.listarItensEstoque({ id_categoria: categoriaId });
    if (itens.length > 0) {
      return res.status(400).json({
        error: 'Não é possível deletar a categoria, pois há itens associados a ela.',
      });
    }

    await storageService.deletarCategoriaEstoque(categoriaId);

    res.status(200).json({ message: 'Categoria deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar categoria:', err.message);
    res.status(500).json({ error: 'Erro interno ao deletar categoria.' });
  }
};


module.exports = {listarEstoque, buscarEstoquePorID, adicionarEstoque, atualizarEstoque, deletarEstoque, listarItensEstoque, buscarItemEstoquePorID, adicionarItemEstoque, atualizarItemEstoque, deletarItemEstoque, listarCategoriasEstoque,buscarCategoriaEstoquePorID, adicionarCategoriaEstoque, atualizarCategoriaEstoque, deletarCategoriaEstoque};