const fs = require("fs");
const crypto = require("crypto");

class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a Repository Requires a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    const contents = await fs.promises.readFile(this.filename, { encoding: "utf8" });
    const data = JSON.parse(contents);
    return data;
  }

  async writeAll(records) {
    fs.writeFileSync(this.filename, JSON.stringify(records, null, 2));
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async create(attr) {
    attr.id = this.randomId();
    const records = await this.getAll();
    records.push(attr);
    await this.writeAll(records);
    return attr;
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, user) {
    console.log(user);
    const records = await this.getAll();
    if (records.some((item) => item.id === id)) {
      const result = records.map((item) => (item.id !== id ? item : user));
      await this.writeAll(result);
    } else {
      throw new Error("user not found");
    }
  }
  async updateRecord(id, attr) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error("User Not Found!!!!");
    }
    Object.assign(record, attr);
    await this.writeAll(records);
  }
  async getOneBy(filters) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
    // return "Not Found";
  }
}
module.exports = Repository;
