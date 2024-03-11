const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    product: doc.product,
                    quantity: doc.quantity,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_create_order = (req, res, next) => {  
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order create success',
            createdOrder: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


exports.orders_get_order = (req, res, next) => { 
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Orders get by id',
        id: id
    });
}  

exports.orders_delete_order = (req, res, next) => { 
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Orders delete by id',
        id: id
    });
}   