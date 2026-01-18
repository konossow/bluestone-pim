'use client';

import React, {FunctionComponent} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { updateProduct } from '../productsSlice';
import { Button, Card, Form, Input, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const Product: FunctionComponent = () => {
    const { name } = useParams<{name: string}>();
    const product = useAppSelector(state => state.products).find(p => p.name === name);
    const dispatch = useAppDispatch();
    
    if (!product) {
        return <>Product with name {name} not found!</>;
    }
    
      return ( 
        <Form
          name="basic"
          initialValues={product}
          title={product.name}
          labelCol={{ span: 8 }}
          style={{ maxWidth: 600 }}
          onFinish={update => dispatch(updateProduct({...product, ...update}))}
        >
          <Card 
            title={<Typography.Title level={4}>{product.name}</Typography.Title>}
            actions={[      
              <Link href={`/products`}>Back to products</Link>,  
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            ]}
          >
              <Form.Item
                label="Number"
                name="number"
                rules={[{ required: true, message: 'Please input product number!' }]}
              >
                <Input value={product.number}/>
              </Form.Item>
          
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input product description!' }]}
              >
                <TextArea rows={4} value={product.description}/>
              </Form.Item>
          </Card>
        </Form>
      )
}
export default Product;