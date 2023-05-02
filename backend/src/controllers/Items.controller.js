import ItemsDAO from '../dao/itemsDAO.js'

export default class ItemsController {

  // GET all items
  static async apiGetItems(req, res, next) {
    const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}          // for the search
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.category) {
      filters.category = req.query.category
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { itemsList, totalNumItems } = await ItemsDAO.getItems({
      filters,
      page,
      itemsPerPage
    })

    let response = {
      items: itemsList,
      page: page,
      filters: filters,
      entries_per_page: itemsPerPage,
      total_items: totalNumItems
    }
    res.json(response)
  }

  // GET a item by id
  static async apiGetItemById(req, res, next) {
    try {
      let id = req.params.id || {}
      let item = await ItemsDAO.getItemByID(id)
      if (!item) {
        res.status(404).json({ error: 'Not found' })
        return
      }
      res.json(item)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  // GET a item's cuisines
  static async apiGetItemCuisines(req, res, next) {
    try {
      let cuisines = await ItemsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  // GET a item's categories
  static async apiGetItemCategories(req, res, next) {
    try {
      let categories = await ItemsDAO.getCategories()
      res.json(categories)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}
