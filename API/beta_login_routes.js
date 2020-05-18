const express = require('express');
router = express.Router();

// Verify password

router.post("/", (req,res) => {
    console.log("Beta login attempt");
    res.json({correct: false})
    });

router.post("/betaLogin/:userPWD", (req,res) => {

    console.log("Beta login attempt: ");

    const userPWD = req.params.userPWD
    if(userPWD == "temppwd"){
        res.json({correct: true})
    } else {
        res.json({correct: false});
    }
    });

module.exports = router;
