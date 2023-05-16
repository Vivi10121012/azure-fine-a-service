import React from 'react';
import { DOMHelper } from 'rsuite';
import { Layout } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
const { Meta } = Card;
const { Content } = Layout;

const Homepage = () => {
  const cards = [
    {
      title: 'Cleaning',
      color: '#f0f2f5',
      link: '/cleaning',
      cover: 'https://cache.handy-client-assets.com/taxonomy-service/service_faucets_replacement.jpg',
    },
    {
      title: 'Babysitting',
      color: '#e6f7ff',
      link: '/babysitting',
      cover: 'https://cache.handy-client-assets.com/taxonomy-service/service_faucets_replacement.jpg',
    },
    {
      title: 'Pest Control',
      color: '#fffbe6',
      link: '/pest-control',
      cover: 'https://cache.handy-client-assets.com/taxonomy-service/service_faucets_replacement.jpg',
    },
    {
      title: 'Plumbing',
      color: '#fce4d6',
      link: '/plumbing',
      cover: 'https://cache.handy-client-assets.com/taxonomy-service/service_faucets_replacement.jpg',
    },
    {
      title: 'Electrical Repairs',
      color: '#f9f0f0',
      link: '/electrical-repairs',
      cover: 'https://cache.handy-client-assets.com/taxonomy-service/service_faucets_replacement.jpg',
    },
    {
      title: 'Beauty',
      color: '#fff0f6',
      link: '/beauty',
      cover: 'https://cache.handy-client-assets.com/taxonomy-service/service_faucets_replacement.jpg',
    },
  ];

  const { getHeight, on } = DOMHelper;
  return (
      <Layout>
        <Content style={{ padding: '80px' ,backgroundColor:'#F5F5F5',height:getHeight(window)}}>
          <Row gutter={[25, 40]}>
            {cards.map((card) => (
              <Col span={8} key={card.title}>
                <Link to={card.link}>
                  <Card
                    hoverable
                    style={{
                      backgroundColor: card.color,
                      width: 400,
                      height: 250,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundImage: `url(${card.cover})`,
                      backgroundSize: 'cover',

                    }}>
                    <Meta
                      description={card.title}
                      style={{
                        color: 'balck',
                        fontFamily: 'Arial',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                      }}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
  );
};

export default Homepage;
