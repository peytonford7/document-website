import { model } from "mongoose";

const getAll = async (Model) => {
  return await Model.find();
};

const getById = async (Model, id) => {
  return await Model.findOne(id);
};

const create = async (Model, data) => {
  const document = new Model(data);
  return await document.save();
};

const updateById = async (Model, id, data) => {
  return await Model.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (Model, id) => {
  return await Model.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, updateById, deleteById };
