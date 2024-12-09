const dbManager = require("../utils/dbManager");

class BaseRepository {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.errMsg = `ERROR (${this.collectionName}-Repo):\n`;
  }
  async createItem(item) {
    try {
      await dbManager.readWrite(this.collectionName, (items) => {
        items.push(item);
        return items; // IMPORTANT
      });
    } catch (error) {
      console.error(this.errMsg, error);
      throw error;
    }
  }

  async updateItemById(id, newData) {
    try {
      await dbManager.readWrite(this.collectionName, (items) => {
        const itemIndex = items.findIndex((item) => item.id === id);
        if (itemIndex === -1) throw new Error("Item not found");
        items[itemIndex] = { ...items[itemIndex], ...newData };
        return items; // IMPORTANT
      });
    } catch (error) {
      console.error(this.errMsg, error);
      throw error;
    }
  }

  async getItemById(id) {
    try {
      const items = await this.getAllItems();
      const item = items.find((item) => item.id === id);
      if (!item) throw new Error(`Cannot get item by id ${id}`);
      return item;
    } catch (error) {
      console.error(this.errMsg, error);
      throw error;
    }
  }

  async getAllItems() {
    try {
      return await dbManager.readOnly(this.collectionName);
    } catch (error) {
      console.error(this.errMsg, error);
      throw error;
    }
  }

  async deleteItemById(id) {
    try {
      await dbManager.readWrite(this.collectionName, (items) => {
        const filtered = items.filter((item) => item.id !== id);
        return filtered; // IMPORTANT
      });
    } catch (error) {
      console.error(this.errMsg, error);
      throw error;
    }
  }

  async clearRepository() {
    try {
      await dbManager.writeOnly(this.collectionName, []);
      console.info("SUCCESS:", `Cleared ${this.collectionName} repository.`);
    } catch (error) {
      console.error(this.errMsg, error);
      throw error;
    }
  }
}

module.exports = BaseRepository;
