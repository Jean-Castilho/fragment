import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.uri = process.env.DATABASE_URL;
    this.client = new MongoClient(this.uri);
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(); // Conecta ao banco de dados especificado na URI ou ao 'test' por padrão
      console.log('Conectado ao MongoDB Atlas');
      return this.db;
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB Atlas:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Desconectado do MongoDB Atlas');
    } catch (error) {
      console.error('Erro ao desconectar do MongoDB Atlas:', error);
      throw error;
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('Banco de dados não conectado. Chame connect() primeiro.');
    }
    return this.db;
  }
}

export default Database;
