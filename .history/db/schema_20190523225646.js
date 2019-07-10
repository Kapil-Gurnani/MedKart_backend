let mongoose = require('mongoose');
const uri = `mongodb+srv://kapil:${encodeURIComponent("kapiltest")}@testcluster-bzfg4.mongodb.net/test?retryWrites=true`;

mongoose.connect(uri);

let usersSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: {
        type: Number,
        min: 6,
        maxLength: 6
    },
    phone: {
        type: Number,
        min: 10,
        maxLength: 10
    },
    email: {
        type: String,
        unique: true
    },
    verify_email:{
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        min: 8
    },
    total: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "user"
    },
    v_gstno: String,
    v_panno: String
});

let productsSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    description: String,
    price: Number,
    category: String,
    imageLink: String,
    size: String,
    vendor: String
});

let ordersSchema = new mongoose.Schema({
    p_id: String,
    u_id: String,
    quantity: Number,
    price: Number,
    coupon: String
});

let cartSchema = new mongoose.Schema({
    u_id: String,
    p_id: String,
    quantity: Number,
    totalCost: Number
});

let siteSchema = new mongoose.Schema({
    visits: Number
});

let discountSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    percentage: Number,
    valid: {
        type: Boolean,
        default: true
    },
    minimum_cart: {
        type: Number,
        default: 0
    },
    max: Number
});

let pagesSchema = new mongoose.Schema({
    title: String,
    meta: {
        type: String,
        default: null
    },
    description: String,
    pageName: String
});


let Users = mongoose.model('Users', usersSchema);
let Products = mongoose.model('Products', productsSchema);
let Orders = mongoose.model('Orders', ordersSchema);
let Cart = mongoose.model('Cart', cartSchema);
let Site = mongoose.model('Site', siteSchema);
let Discount = mongoose.model('Discount', discountSchema);
let Pages = mongoose.model('Pages', pagesSchema);

let db = mongoose.connection;

module.exports = {
    Users,
    Products,
    Orders,
    Cart,
    Site,
    Discount,
    Pages,
    db
}