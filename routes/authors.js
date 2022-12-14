const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//ALL AUTHORS ROUTE
router.get('/',async (req,res)=>{
    let searchOptions = {}
    if(req.query.name !=  null && req.query.name !== ""){
        searchOptions.name = new RegExp(req.query.name,'i') //adding i means case insensistive
    }
    try{
        console.log(searchOptions);
        const authors = await Author.find(searchOptions);
        console.log(authors);
        res.render('authors/index',{authors:authors,searchOptions:req.query});
    }
    catch{
        res.redirect('/');
    }
})
//NEW AUTHOR ROUTE
router.get('/new',(req,res) => {
    res.render('authors/new',{author: new Author(),errorMessage:null });
})
//CREATE NEW AUTHOR 
router.post('/',async (req,res) => {
    const author = new Author({
        name:req.body.name
    })
    try{ 
        const newAuthor = await author.save();
        res.redirect('/authors')  
    }
    catch{
        res.render('authors/new',{
                        author:author,
                        errorMessage:"Error creating an Author"
                    })
    }
    // author.save((err,newAuhtor) =>{
    //     if(err){
    //         res.render('authors/new',{
    //             author:author,
    //             errorMessage:"Error creating an Author"
    //         })
    //     }
    //     else{
    //         res.redirect('/authors')
    //     }
    // })
    // res.send(req.body.name);
})
module.exports = router;       