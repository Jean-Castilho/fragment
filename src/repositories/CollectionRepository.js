import { ObjectId } from 'mongodb';

class CollectionRepository {
  constructor(db, collectionName) {
    this.db = db;
    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);
  }

  async initialize() {
    const collectionExists = await this.db
      .listCollections({ name: this.collectionName }, { nameOnly: true })
      .hasNext();

    if (!collectionExists) {
      await this.db.createCollection(this.collectionName);
    }
  }

  async create(document) {
    const result = await this.collection.insertOne(document);
    console.log(result);
    return result.insertedId;
  }

  async find(query = {}) {
    return await this.collection.find(query).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, updates) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return result.modifiedCount;
  }

  async delete(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
}

export default CollectionRepository;
