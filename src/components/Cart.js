import React, { Component } from 'react';
import { Table } from 'antd';
import { getCart } from './api';

export class Cart extends Component {
    state = {
        cart: [],
    }

    componentDidMount() {
        getCart(

        ).then((res) => {
            console.log(res)
            this.setState({
                cart: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const columns = [{
            title: 'Image',
            dataIndex: 'product.image',
            key: 'image',
            width: '100',
            render: (image) => (
                <img src={image} width="100"/>
            )
          }, {
            title: 'Name',
            dataIndex: 'product.name',
            key: 'name',
          }, {
            title: 'Price',
            dataIndex: 'product.price',
            key: 'price',
          }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
          }];

        return (
            <Table className="cart" columns={columns} dataSource={this.state.cart} />
        )
    }
}