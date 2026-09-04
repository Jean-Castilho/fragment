class CollectionService {
  constructor(repository) {
    this.repository = repository;
  }

  async createDocument(document) {
    return await this.repository.create(document);
  }

  async getAllDocuments() {
    return await this.repository.find();
  }

  async getDocumentById(id) {
    return await this.repository.findById(id);
  }

  async updateDocument(id, updates) {
    return await this.repository.update(id, updates);
  }

  async deleteDocument(id) {
    return await this.repository.delete(id);
  }
}

export default CollectionService;
