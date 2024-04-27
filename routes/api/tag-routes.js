const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
 try{
  const tags = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  })

  res.json(tags)
 }catch(err){
  console.log(err)
 }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const id = req.params.id

  try{
    // target the Tag by id
    const tag = await Tag.findByPk(id,{
      include: [{ model: Product, through: ProductTag }]
    })

    if(!tag){
      return res.json({message: "Tag not found"})
    }

    res.json(tag)

  }catch(err){
    console.log(err)
    res.json({message: "ERROR"})
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  const {tag_name} = req.body

  try{
    const tag = await Tag.create({
      
      tag_name
    })
    res.json(tag)
    console.log('a tag has been created '+ tag)
  }catch(err){
    console.error(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const {id} = req.params

  //get the new data
   const newData = req.body

   try{
    const tag = await Tag.findByPk(id)

    if(!tag){
      return res.json({message: 'Tag not found'})
    }

    await tag.update(newData)
    //show updated tag
    res.json(tag)
   }catch(err){
    console.error(err)
    res.json()
   }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const {id} = req.params

  try{
    const tag = await Tag.findByPk(id)
    if(!tag){
      return res.json({message: "Tag not found"})
    }
    
    await tag.destroy()

    res.json({message: "TAG REMOVED"})
  }catch(err){
    console.error(err)
      res.json({message: "ERROR"})
    
  }
});

module.exports = router;
