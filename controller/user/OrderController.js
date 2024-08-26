
const { orders, payments, orderDetails, carts, products, users } = require("../../model");
const axios = require('axios');
const payment = require("../../model/payment");
exports.crateOrder = async (req, res) => {
    const userId = req.user.id
    const { phoneNumber, shippingAddress, totalAmount, orderStatus, paymentDetails, items } = req.body;
    if (!phoneNumber || !shippingAddress || !totalAmount || !orderStatus || !paymentDetails) {
        return res.status(400).json({
            message: "Please provide all fields"
        })
    }

    const paymentData = await payments.create({
        paymentMethod: paymentDetails.paymentMethod,
    })
    var orderdata = await orders.create({
        phoneNumber,
        shippingAddress,
        totalAmount,
        userId,
        paymentId: paymentData.id
    })
    for (var i = 0; i < items.length; i++) {
        await orderDetails.create({
            quantity: items[i].quantity,
            productId: items[i].productId,
            orderId: orderdata.id
        })
        await carts.destroy({ where: { productId: items[i].productId } })
        console.log("deleted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    if (paymentDetails.paymentMethod == "khalti") {
        console.log(orderdata.id)
        var data = {
            return_url: "http://localhost:5173/",
            website_url: "http://localhost:3000/",
            amount: totalAmount * 100,
            purchase_order_id: orderdata.id,
            purchase_order_name: 'order_name' + orderdata.id,
            customer_info: {
                name: "Ram Bahadur",
                email: "test@khalti.com",
                phone: phoneNumber
            }
        }
        const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", data, {
            headers: {
                'Authorization': "Key b87a211834824f14a20a48fcf3451653"
            }
        })
        // console.log(response)
        paymentData.pidx = response.data.pidx
        paymentData.save()
        res.status(200).json({
            message: "Payment successfull",
            payment_url: response.data.payment_url
        })
    } else {
        res.status(200).json({
            message: "Order placed successfully"
        })
    }
}

exports.verifyTransaction = async (req, res) => {
    const { pidx } = req.body
    const userId = req.user?.id
    if (!pidx) {
        return res.status(400).json({
            message: "Please provide pidx"
        })
    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", { pidx }, {
        headers: {
            'Authorization': "Key b87a211834824f14a20a48fcf3451653"
        }
    })
    if (response.data.status == "Completed") {
        await payments.update({ paymentStatus: 'paid' }, {
            where: {
                pidx: pidx
            }
        })
        res.status(200).json({
            message: "Payment verified successfully"
        })
    } else {
        res.status(200).json({
            message: "Payment not verified"
        })
    }
}

exports.getAllOrder = async (req, res) => {
    const order = await orders.findAll({
        include: [
            {
                model: users
            }, {
                model: payments
            }
        ]
    })
    if (order.length > 0) {
        res.status(200).json({
            message: "Orders fetch successfully",
            data: order
        })
    } else {
        return res.status(400).json({
            message: "Any orders don't available yes",
            data: order
        })

    }
}

exports.getOrders = async (req, res) => {
    const userId = req.user.id

    const Orders = await orders.findAll({
        where: {
            userId: userId
        },
        include: {
            model: payments
        }
    })

    res.status(200).json({
        message: "Order fetched successfully",
        data: Orders
    })
}
exports.getOrdersDetails = async (req, res) => {
    const { orderId } = req.params
    console.log(req.params)
    const Details = await orderDetails.findAll({
        where: {
            orderId
        },
        include: [
            {
                model: products
            },
            {
                model: orders,
                include: [
                    {
                        model: users
                    }
                ]
            }
        ]
    })
    res.status(200).json({
        message: "OrderDetails fetched successfully",
        data: Details
    })
}
exports.cancleOrder = async (req, res) => {
    const { orderId } = req.params
    const { orderStatus } = req.body
    const id = orderId
    const orderData = await orders.findByPk(id)
    console.log(orderData.orderStatus != "ontheway")
    if (orderData.orderStatus != "ontheway") {
        await orders.update({ orderStatus: orderStatus }, {
            where: {
                id: orderId
            }
        })
        const Details = await orderDetails.findAll({
            where: {
                orderId
            },
            include: [
                {
                    model: products
                },
                {
                    model: orders,
                    include: [
                        {
                            model: users
                        }
                    ]
                }
            ]
        })
        res.status(200).json({
            message: "Order cancelled successfully",
            data: Details
        })
    } else {
        res.status(400).json({
            message: "Order is ontheway you can't cancel yet",
            data: []
        })
    }
}
exports.changeOrderStatus = async (req, res) => {
    const { orderId } = req.params
    const { orderStatus } = req.body
    console.log("status is:= ", req.body)
    const id = orderId
    const orderData = await orders.findByPk(id)
    if (orderData) {
        await orders.update({ orderStatus: orderStatus }, {
            where: {
                id: orderId
            }
        })
        const order = await orders.findAll({
            include: [
                {
                    model: users
                }, {
                    model: payments
                }
            ]
        })
        res.status(200).json({
            message: "Order status updated successfully",
            data: order
        })
    } else {
        res.status(400).json({
            message: "Order not found",
            data: []
        })
    }
}
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params
    console.log(req.params)
    const order = orders.findByPk(orderId)
    if (order) {
        const response = await orders.destroy({
            where: {
                id: orderId
            }
        })
        res.status(200).json({
            message: "Order deleted successfully",
            data: response
        })
    } else {
        res.status(400).json({
            message: "Order not fount with that id",
            data: []
        })
    }
}
