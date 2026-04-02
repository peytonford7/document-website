const getAll = async (Model) => {
    return await Model.find();
};

const getById = async (Model, id) => {
    return await Model.findById(id);
};

const create = async (Model, data) => {
    const file = new Model(data);
    return await file.save();
};

const updateById = async (Model, id, data) => {
    return await Model.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (Model, id) => {
    return await Model.findByIdAndDelete(id);
};

export { getAll, getById, create, updateById, deleteById };
