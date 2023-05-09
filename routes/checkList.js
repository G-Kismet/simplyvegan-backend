var express = require('express');
var router = express.Router();

const {ChecklistRecipes} = require("../models");

//GET all Checklist recipe
router.get('/', async (req, res) => {
    try{
    const checklistRecipes = await ChecklistRecipes.findAll();
    res.json(checklistRecipes)
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving random fact", error });
    }
});

// GET recipes based on particular condition
router.get('/:condition', async (req, res) => {

    try {
        console.log('trying to show all with an condition')
        console.log(req.params.condition)

        const checklistRecipes = await ChecklistRecipes.findAll({
            where: {
                medicalCondition: {
                    [Op.like]: `%${req.params.condition}%`
                }
            }
        })
        console.log(checklistRecipes)
        res.json(checklistRecipes)
    }

    catch (error) {
        res.status(500).json({ message: "Error retrieving recipes for condition", error });
    }
})

module.exports = router;