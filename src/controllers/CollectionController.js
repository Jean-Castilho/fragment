class CollectionController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res) {
    try {
      const document = JSON.parse(req.body);
      console.log(document);
      const id = await this.service.createDocument(document);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ id }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  async getAll(req, res) {
    try {
      const documents = await this.service.getAllDocuments();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(documents));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  async getById(req, res, id) {
    try {
      const document = await this.service.getDocumentById(id);
      if (document) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(document));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Documento não encontrado' }));
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  async update(req, res, id) {
    try {
      const updates = JSON.parse(req.body);
      const modifiedCount = await this.service.updateDocument(id, updates);
      if (modifiedCount > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Documento atualizado com sucesso' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Documento não encontrado ou nenhuma alteração realizada' }));
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }

  async delete(req, res, id) {
    try {
      const deletedCount = await this.service.deleteDocument(id);
      if (deletedCount > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Documento excluído com sucesso' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Documento não encontrado' }));
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    }
  }
}

export default CollectionController;
