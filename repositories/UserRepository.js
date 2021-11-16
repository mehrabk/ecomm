const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./Repository");

const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends Repository {
  // extend create method
  async create(attr) {
    // attr['id'] = this.randomId();
    attr.id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    const buff = await scrypt(attr.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attr,
      password: `${buff.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePassword(saved, supplied) {
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuff = await scrypt(supplied, salt, 64);
    return hashed === hashedSuppliedBuff.toString("hex");
  }
}

module.exports = new UserRepository("users.json");
