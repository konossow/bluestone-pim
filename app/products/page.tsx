'use client';

import React, {FunctionComponent} from 'react';
import { useAppSelector } from '../store/store';
import { Card, List, Image, Flex, Typography } from 'antd';
import Link from 'next/link';

const Products: FunctionComponent = () => {
    const products = useAppSelector(state => state.products);
  
    return (
        <List
            dataSource={products}
            grid={{xs: 2, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4, gutter: 8}}
            renderItem={(product) => (
                <List.Item key={product.name}>
                    <Card
                        hoverable
                        styles={{ body: { padding: 0, overflow: 'hidden' } }} 
                        title={<Link href={`/products/${product.name}`}>{product.number}</Link>}
                        cover={product.images.length ? (
                                <Image.PreviewGroup items={product.images.map(img => ({src: img.url, alt: img.name}))}>
                                    <Image key={0} src={product.images[0].url} alt={product.images[0].name}/>
                                </Image.PreviewGroup>
                            ) : null
                        }
                    >
                        <Flex>
                            <Flex vertical style={{ padding: 16 }}>
                                <Typography.Text type="secondary">
                                    {product.description}
                                </Typography.Text>
                            </Flex>
                        </Flex>
                    </Card>
                </List.Item>
            )}
        />
    )
}
export default Products;