const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const mongoose = require('mongoose');
const user = require("./appBack");   //  for data
const userin = require("./userback"); // for user info
const app = express();
const port = 3000;
const session = require('express-session');






//      middle ware

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

//  session bana  

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30 // 30 minutes
    }
}));

//   authentication  
const logger = (req, res, next) => {
    const openRoutes = ['/login', '/register', '/loginuser', '/register/user'];
    if (openRoutes.includes(req.path)) return next();
    if (req.session.user) return next();
    res.redirect('/login');
}

app.use(logger);


app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/register', (req, res) => {
    res.render('register');
})

let username = "";
let umail = "";


app.post('/loginuser', async (req, res) => {
    const { mail, password } = req.body;
    console.log(mail + " " + password);
    let userr = await userin.findOne({ mail, password });
    if (userr) {
        req.session.user = userr;
        username = userr.name;
        console.log(username);

        res.redirect("/");
    }
    else {
        res.render('error');
    }
})

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/register/user', async (req, res) => {
    const { name, password, gender, number, mail } = req.body;
    console.log(name + " " + gender + " " + password + " " + number + " " + mail);
    await userin.insertOne({ name, password, mail, gender, number });
    req.session.user = mail;
    res.redirect('/');
})

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/lost', async (req, res) => {
    const data = await user.find({}).toArray();
    res.render('items', { data })
})
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
})
app.get('/found', (req, res) => {
    res.render('found');
})
app.get('/reportlost', (req, res) => {
    res.render('reportlost');
})

app.get('/reportfound', (req, res) => {
    res.render('reportfound');
})

// abhi 
app.get('/profile', async (req, res) => {
    const data = await userin.find({ name: username }).toArray();
    let udata = await user.find({ umail: req.session.user.mail }).toArray();
    res.render('profile', { data, umail, udata });
})



app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteResult = await user.deleteOne({
            _id: new mongoose.Types.ObjectId(id)
        });
        console.log(deleteResult)
        if (!deleteResult || deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "post not found" });
        }
        res.status(200).json({ message: "post deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "invalid ID or server error" })
    }
});



app.get('/signOut', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});





app.post('/upload', async (req, res) => {


    const { name, item, location, date, des } = req.body;
    umail = req.session.user.mail;
    const image = req.files.image;
    const uploadPath = "/uploads/" + image.name;
    const serverPath = __dirname + "/uploads/" + image.name;
    await user.insertOne({
        name,
        item,
        location,
        date,
        des,
        photoUrl: uploadPath,
        umail: umail

    })
    console.log(image.name);
    image.mv(serverPath, (err) => {
        if (err) {
            res.status(200).send("error");
        }
        else {
            res.redirect('/?mess=done');
        }
    })
})
app.listen(port, () => console.log('Server started on http://localhost:3000'));




//    session bana

// app.use(session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: true
// }));


//     login post

// app.post('/reportLost', (req, res) => {
//     res.render("login")
// const { name, password } = req.body;

// if (name === 'name' && password === '1234') {
//     req.session.user = name;
//     res.redirect('/');
// }
// else {
//     res.send("invalid user ");
// }
// })



//   authentication
// const logger = (req, res, next) => {
//     if (req.session.user) {
//         next();
//     }
//     else {
//         res.redirect('/login');
//     }
// }
// app.use(logger);