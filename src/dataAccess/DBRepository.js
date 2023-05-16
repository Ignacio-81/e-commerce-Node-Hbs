//Container for DB CRUD

export default class DBRepository {
  constructor(model) {
    this.model = model;
  }

  async findById(id) {
    try {
      //Find object inside the array with the id

      const data = await this.model.find({ _id: id });
      return data[0];
    } catch (err) {
      throw new Error(`Error while getting data with id: ${err}`);
    }
  }
  async findAll() {
    try {
      const data = await this.model.find({});
      return data;
    } catch (err) {
      throw new Error(`Error while reading DataBase: ${err}`);
    }
  }

  async save(data) {
    try {
      const res = await this.model(data).save();
      console.log("New Product Inserted");
      return res._id;
    } catch (err) {
      throw new Error(`Error while writing DataBase: ${err}`);
    }
  }
  async modif(id, data) {
    try {
      const response = await this.model.updateOne({ _id: id }, data);
      if (response.modifiedCount) {
        console.log("respuesta");
        console.log(response);
        return data;
      } else {
        throw new Error(`A problem while updating object: ${response}`);
      }
    } catch (err) {
      throw new Error(`Error while reading DataBase: ${err}`);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.model.deleteOne({ _id: id });
      if (response.deletedCount) {
        console.log("respuesta");
        console.log(response);
      } else {
        throw new Error(`A problem while deleting object: ${response}`);
      }
    } catch (err) {
      throw new Error(`Error while deleting data with id: ${err}`);
    }
  }

  async deleteAll() {
    try {
      await this.model.deleteMany();
      console.log("All products were deleted successfully");
    } catch (err) {
      throw new Error(`Error while deleting all data from table: ${err}`);
    }
  }
}
