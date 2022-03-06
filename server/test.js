const { expect } = require('chai');
let request = require('supertest');
const app = require('.');

const getProducts = async () => {
  return await request(app)
    .get('/products');
}

const getProdDetail = async (id) => {
  return await request(app)
    .get(`/products/${id}`);
}

const getProdStyles = async (id) => {
  return await request(app)
    .get(`/products/${id}/styles`);
}

describe ('Products API', () => {

  after(() => {
    app.close();
  })

  describe('/products', () => {
    it('getProducts returns 200 response code', async () => {
      const res = await getProducts();
      expect(res.status).to.eql(200);
    })
    it('getProducts only returns 5 products', async () => {
      const res = await getProducts();
      expect(res.body.length).to.eql(5);
    })
    it('getProducts returns an array of objects', async () => {
      const res = await getProducts();
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.an('object');
    })
  })

  describe('/products/productId', () => {
    it('getProdDetail returns 200 response code', async () => {
      const res = await getProdDetail(1);
      expect(res.status).to.eql(200);
    })
    it('getProdDetail returns back the same id requested', async () => {
      const res = await getProdDetail(1);
      expect(res.body.id).to.eql(1);
    })
    it('getProdDetail returns back features of the product', async () => {
      const res = await getProdDetail(1);
      expect(res.body.features).to.exist;
      expect(res.body.features.length).to.eql(2);
    })
  })

  describe('/products/productId/styles', () => {
    it('getProdStyles returns 200 response code', async () => {
      const res = await getProdStyles(1);
      expect(res.status).to.eql(200);
    })
    it('getProdStyles returns accurate photos and skus', async () => {
      const res = await getProdStyles(1);
      expect(res.body.results[0].photos.length).to.eql(6);
      expect(Object.keys(res.body.results[0].skus).length).to.eql(6);
    })
    it('getProdStyles returns the product_id as Number (not string)', async () => {
      const res = await getProdStyles(1);
      expect(res.body.product_id).to.eql(1);
    })
    it('getProdStyles returns correct amount of styles', async () => {
      const res = await getProdStyles(1);
      expect(res.body.results.length).to.eql(6);
    })
  })

})
