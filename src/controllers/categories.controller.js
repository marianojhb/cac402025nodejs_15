export const getAllCategories = async (req, res)=> {
    res.status(200);
    res.json(categories);
}

export const getCategoryById = async  (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find( category => category.id === id )
    if (category)
    {
        res.status(200);
        res.json(category);
    } else
    {
        res.status(404);
        res.json({ message: "categoría no encontrada"});
    }
}

export const createCategory = async (req, res) => {
    const category = JSON.parse(req.category);
    categories.push(category);
}

export const deleteCategory = async (req, res) => {
    console.log("intentando!");
    const id = parseInt(req.params.id);
    const index = categories.findIndex(category => category.id === id);
    const nombre = categories.find(category => category.id === id).name;
    if (index != -1) {
        categories.splice(index,1);
        res.status(200);
        res.json({"message": `Categoria ${id} ${nombre} eliminada`});
    }
    else 
    {
        res.status(404);
        res.json({ message: "categoría no encontrada"});
    }
}