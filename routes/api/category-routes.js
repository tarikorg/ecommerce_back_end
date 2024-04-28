const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.json(categories)
  }catch(err){
    console.log(err)
    res.json({message: "ERROR"})
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
   const {id} = req.params

   try{
    const category = await Category.findByPk(id,{
      include: [{model: Product}]
    })
   //if there is no category
    if(!category){
     return res.json({message: 'Category NOT FOUND'})
    }
    //display
    res.json(category)
  
   }catch(err){
    console.log(err)
    res.json({message: "ERROR"})
   }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body

  try{
    //create a new category with the given input through req.body
    const category = await Category.create({
    
      category_name
    })
   //display the new category
    res.json(category)
    console.log('a category has been created: '+category)
  }catch(err){
    console.error(err)
    res.json({message: "ERROR"})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const {id} = req.params

  //newdata
  const newData = req.body

  try{
    const category = await Category.findByPk(id)

    if(!category){
      return res.json({message: "Category not found"})
    }
   //update chosen category with new data
    await category.update(newData)
   //display the updated category
    res.json(category)
  }catch(err){
    console.error(err)
    res.json({message: "ERROR"})
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const {id} = req.params

  try{
    const category = await Category.findByPk(id)

    if(!category){
      return res.json({message: "Category NOT FOUND"})
    }

    await category.destroy()

    res.json({message: "Category is removed"})
  }catch(err){
    console.error(err)
    res.json({message: "ERROR"})
  }
});

module.exports = router;
